const express = require("express");
const bookmarks = express.Router();
// import from queries
const { getAllBookmarks, getBookmark, createBookmark } = require("../queries/bookmarks.js");

// INDEX
bookmarks.get("/", async (req, res)=>{
    try {
        // res.json({ status: "ok" });
        const allBookmarks = await getAllBookmarks();
    
        if (allBookmarks[0]) {
            res.status(200).json(allBookmarks);
        } else {
            res.status(500).json({ error: "server error" });
        }
    } catch (err) {
        console.log(err);
    }
})

// SHOW
bookmarks.get("/:id", async (req, res)=>{
    const { id } = req.params;
    try {
        const bookmark = await getBookmark(id);
        // are you a bookmark? - this is an object, not an array. If bookmark, return it.
        if (bookmark.id) {
            res.status(200).json(bookmark);
        } else {
            res.status(500).json({ error: "Bookmark not found!" });
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports = bookmarks;
