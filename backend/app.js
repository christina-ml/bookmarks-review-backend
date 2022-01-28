// Dependencies
const cors = require('cors');
const express = require('express');

// Bookmarks ROUTES
const bookmarkController = require("./controllers/bookmarkController.js");

// Configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/bookmarks", bookmarkController);

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