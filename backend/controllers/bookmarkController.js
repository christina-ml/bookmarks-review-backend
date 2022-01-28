const express = require("express");
const bookmarks = express.Router();

// INDEX
bookmarks.get("/", (req, res)=>{
    res.json({ status: "ok" });
})

module.exports = bookmarks;