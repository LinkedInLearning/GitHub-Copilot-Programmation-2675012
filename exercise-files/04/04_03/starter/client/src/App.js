import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, startLoading] = useState(false);

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

  const generatePost = () => {
    startLoading(true);
    fetch("http://localhost:8080/posts/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: title }),
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
    <div className="container">
      <h1>Blog Posts</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          value={title}
          placeholder="add a title .."
          onChange={(event) => setTitle(event.target.value)}
        />{" "}
        <br />
        <textarea
          className="form-control"
          value={content}
          placeholder="content.."
          onChange={(event) => setContent(event.target.value)}
        />{" "}
        <br />
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-info mx-1"
          title="Generate with AI"
          onClick={generatePost}
        >
          Generate
        </button>
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
