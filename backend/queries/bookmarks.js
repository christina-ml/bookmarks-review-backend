// const pg = require("pg-promise/typescript/pg-subset");
// const { one } = require("../db/dbConfig.js");
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
/* a combination of `create` bookmark & `get` bookmark */
/* 
    - if we wanted to make `id` as `$1`, name would be `$2`, url `$3`, etc. 
    - `id` is coming from a form, that's why it's NOT `bookmark.id`
    - the order it shows up in the query makes more sense, so that's why we have `name=$1`

const updatedBookmark = await db.one(
    "UPDATE bookmarks SET name=$2, url=$3, category=$4, is_favorite=$5 WHERE id=$1 RETURNING *",
    [id, bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite]
)
*/
const updateBookmark = async (id, bookmark) => {
    try {
        const updatedBookmark = await db.one(
            "UPDATE bookmarks SET name=$1, url=$2, category=$3, is_favorite=$4 WHERE id=$5 RETURNING *",
            [bookmark.name, bookmark.url, bookmark.category, bookmark.is_favorite, id]
        )
        return updatedBookmark;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllBookmarks,
    getBookmark,
    createBookmark,
    deleteBookmark,
    updateBookmark,
};