import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = { title, content };
    fetch("http://localhost:8080/posts/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then(setPosts)
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />{" "}
          <br />
        </label>
        <br />
        <label>
          Content:
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />{" "}
          <br />
        </label>{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
