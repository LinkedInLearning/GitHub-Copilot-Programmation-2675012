// index.test.js
const request = require("supertest");
const app = require("./index");

const blogItems = [];

describe("GET /posts", () => {
  it("should return 200 status code and all blog items", async () => {
    const response = await request(app).get("/posts");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(blogItems);
  });
});

describe("POST /posts/insert", () => {
  it("should add a new blog item and return 200 status code", async () => {
    const newBlogItem = {
      id: 1,
      title: "New Blog Post",
      content: "This is a new blog post",
    };
    const response = await request(app).post("/posts/insert").send(newBlogItem);
    expect(response.status).toBe(200);
    expect(response.body).toContainEqual(newBlogItem);
  });
});
