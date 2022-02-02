const express = require("express");
const res = require("express/lib/response");
const bookmarks = express.Router();
// import from queries
const { getAllBookmarks, getBookmark, createBookmark, deleteBookmark, updateBookmark } = require("../queries/bookmarks.js");

// import our validations file, and then inject as middleware into POST
const { checkName } = require("../validations/checkBookmarks.js");

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

// CREATE
/*
    --- optional ---, a way to show validation (if you want...)
    const { name, url, is_favorite, category } = req.body;
    we want to know if these fields exist - validation step
    // if (!name || !url || !is_favorite).... return json response incorrect format

*/
/* Injecting middleware `checkName` into our code, only for this post, if the name is formatted correctly. */
bookmarks.post("/", checkName, async (req, res)=>{
    const { body } = req;
    try {
        const createdBookmark = await createBookmark(body);
        if (createdBookmark.id) {
            res.status(200).json(createdBookmark);
        } else {
            res.status(500).json({ error: "Bookmark creation error" });
        }
    } catch (error) {
        console.log(error);
    }
})

// DELETE
bookmarks.delete("/:id", async(req, res)=>{
    const { id } = req.params;
    // running that delete query & will no longer exist in the database
    // if it exists, we delete it.
    const deletedBookmark = await deleteBookmark(id);
    // if it gives us an id, then it existed in the database.
    if (deletedBookmark.id) {
        res.status(200).json(deletedBookmark);
    } else {
        res.status(404).json({ error: "Bookmark not found" });
    }
})

// UPDATE
/* 
    - body is an object coming from the form itself. body is the shape of our bookmark. 
    - updatedBookmark is coming from the database directly.
    - All the changes should have been applied, and be returned.
*/
bookmarks.put("/:id", async (req, res)=>{
    const { id } = req.params;
    const { body } = req;
    const updatedBookmark = await updateBookmark(id, body);
    if (updatedBookmark.id) {
        res.status(200).json(updatedBookmark);
    } else {
        res.status(404).json({ error: "Bookmark not found" });
    }
})

module.exports = bookmarks;
