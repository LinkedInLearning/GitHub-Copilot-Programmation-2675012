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

const app = express();
app.use(cors());
const port = 8080;

const blogItems = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
