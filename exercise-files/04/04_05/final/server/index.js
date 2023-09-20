/**
 * import express
 * create a server with node and express
 * create an instance of express
 * create a array of blog items objects with title and content
 * create a port 8080
 * create a route for the home page
 * create a callback function and listen to the port
 **/

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
const port = 8080;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// I need to parse objects in JSON format
app.use(express.json());

const blogItems = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", (req, res) => {
  res.status(200).json(blogItems);
});

app.post("/posts/insert", (req, res) => {
  blogItems.push({
    id: Number(new Date()),
    ...req.body,
  });
  res.status(200).json(blogItems);
});

app.post("/posts/generate", async (req, res) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful blogger" + req.body.prompt,
      },
    ],
  });
  res.status(200).json(completion.data.choices[0].message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;