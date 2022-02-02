const { one } = require("../db/dbConfig.js");
const db = require("../db/dbConfig.js");

/* Getting ALL bookmarks */
const getAllBookmarks = async () => {
    try {
        const allBookmarks = await db.any("SELECT * FROM bookmarks");
        return allBookmarks;
    } catch(error) {
        return error;
    }
}

/* Getting ONE bookmark */
/*
 ----- About SQL injection:  -----
id = "1;SELECT * FROM users;"
if someone were to put this in your database, they would have access to all your users, which is very scary. They could potentially make changes to your database. VERY BAD. "SQL injection. So don't use interpolation in our query (like this: id=${id} )"
By doing it this way, it's more for security and protecting your database.
*/
const getBookmark = async (id) => {
    try {
        const oneBookmark = await db.one("SELECT * FROM bookmarks WHERE id=$1", id);
        return oneBookmark;
    } catch (error) {
        return error;
    }
}

// CREATE
const createBookmark = async (bookmark) => {
    try {
        /* The values should match to what's in your `schema.sql` in database */
        const newBookmark = await db.one(
            "INSERT INTO bookmarks (name, url, category, is_favorite) VALUES($1, $2, $3, $4) RETURNING *",
            [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite]
        )
        return newBookmark;
    } catch (error) {
        return error;
    }
}

// DELETE bookmark
const deleteBookmark = async (id) => {
    try {
        const deletedBookmark = await db.one(
            /* sanitized before going in there with `$1`. $1 is expecting an argument after. */
            "DELETE FROM bookmarks WHERE id = $1 RETURNING *",
            id
            );
            return deletedBookmark;
    } catch (error) {
        return error;
    }
}

// UPDATE bookmark

module.exports = {
    getAllBookmarks,
    getBookmark,
    createBookmark,
    deleteBookmark,
};