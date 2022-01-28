const express = require("express");
const bookmarks = express.Router();

// import from queries
const { getAllBookmarks } = require("../queries/bookmarks.js");

// INDEX
bookmarks.get("/", async (req, res)=>{
    // res.json({ status: "ok" });
    const allBookmarks = await getAllBookmarks();

    if (allBookmarks[0]) {
        res.status(200).json(allBookmarks);
    } else {
        res.status(500).json({ error: "server error" });
    }
})

module.exports = bookmarks;