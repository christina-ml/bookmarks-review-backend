// Dependencies
const cors = require('cors');
const express = require('express');

// Bookmarks ROUTES
const bookmarkController = require("./controllers/bookmarkController.js");
const reviewsController = require("./controllers/reviewsController.js");

// Configuration
const app = express();

// injecting Middleware
app.use(cors());
app.use(express.json());
// - if your path has `"/bookmarks"` in it, run `bookmarkController`
app.use("/bookmarks", bookmarkController);
app.use("/reviews", reviewsController);

// Routes
app.get("/", (req, res)=>{
    res.send("Welcome to Bookmarks App 2.0");
})

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });

// Export
module.exports = app;