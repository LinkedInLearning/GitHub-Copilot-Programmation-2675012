import React, { useState, useEffect, useRef, useMemo } from "react";
import Modal from "./Modal";
import "./App.css";

function App() {
  const inputRef = useRef();
  const textareaRef = useRef();
  const [posts, setPosts] = useState([]);
  const [current, setCurrent] = useState({});
  const [post, setPost] = useState({ title: "", content: "" });
  const [isLoading, startLoading] = useState(false);

  const resetForm = () => {
    startLoading(false);
    setPost({});
    inputRef.current.value = "";
    textareaRef.current.value = "";
  };

  const handleChange = (e) =>
    setPost({ ...post, [e.target.name]: e.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    const isNotValid = Object.values(post).some((value) => !value);
    if (isNotValid) {
      return false;
    }

    fetch("http://localhost:8080/posts/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then(setPosts)
      .then(resetForm)
      .catch(console.error);
  };

  const generatePost = () => {
    if (!post.title) {
      return false;
    }
    startLoading(true);
    fetch("http://localhost:8080/posts/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: post.title }),
    })
      .then((response) => response.json())
      .then((data) => data.content)
      .then(setPosts)
      .then(resetForm)
      .catch(console.error);
  };

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <>
      <Modal {...current} />
      <div className="blog-container">
        <h1 className="mt-5">Blogs</h1>
        <h6 className="text-secondary">Powered by AI</h6>
        <hr />

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            name="title"
            className="form-control"
            type="text"
            placeholder="add a title .."
            onChange={handleChange}
          />{" "}
          <br />
          <textarea
            ref={textareaRef}
            name="content"
            className="form-control"
            placeholder="content.."
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <div className="float-end mb-4">
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-warning mx-1"
              title="Generate with AI"
              onClick={generatePost}
            >
              Generate
            </button>
          </div>
        </form>

        <div className="clearfix"></div>
        <hr className="my-0" />
        <br />
        {isLoading && <p className="my-3 text-primary">Loading...</p>}
        {/* use boostrap to create a card */}
        <ul className="scroll">
          {posts?.map((post) => (
            <div className="card mt-3 p-3" key={post.id}>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <small className="card-subtitle mb-2 text-muted">
                  {post.created_at}
                </small>
                <p className="card-text mt-3">{`${post.content.substring(
                  0,
                  100
                )} ...`}</p>

                <button
                  type="button"
                  className="btn btn-outline-warning float-end"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => setCurrent(post)}
                >
                  Read
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
