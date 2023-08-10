import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef();
  const textareaRef = useRef();
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
      .then((data) => {
        setPosts(data);
        setTitle("");
        setContent("");
        inputRef.current.value = "";
        textareaRef.current.value = "";
      })
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
      .then((data) => data.content)
      .then((content) => {
        setPosts([...posts, { title, content }]);
        startLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="blog-container">
      <h1 className="mt-5">Blog Posts</h1>

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className="form-control"
          type="text"
          value={title}
          placeholder="add a title .."
          onChange={(event) => setTitle(event.target.value)}
        />{" "}
        <br />
        <textarea
          ref={textareaRef}
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
      {isLoading && <p className="my-3">Loading...</p>}
      {/* use boostrap to create a card */}
      <ul>
        {posts.map((post) => (
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
