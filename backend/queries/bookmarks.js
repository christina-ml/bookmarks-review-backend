const { one } = require("../db/dbConfig.js");
const db = require("../db/dbConfig.js");

/* Getting ALL bookmarks */
const getAllBookmarks = async () => {
    try {
        const allBookmarks = await db.any("SELECT * FROM bookmarks");
        return allBookmarks;
    } catch(err) {
        return err;
    }
}

/* Getting ONE bookmark */
const getBookmark = async (id) => {
    try {
        /*
         ----- About SQL injection:  -----
        id = "1;SELECT * FROM users;"
        if someone were to put this in your database, they would have access to all your users, which is very scary. They could potentially make changes to your database. VERY BAD. "SQL injection. So don't use interpolation in our query (like this: id=${id} )"
        By doing it this way, it's more for security and protecting your database.
        */
        const oneBookmark = await  db.one("SELECT * FROM bookmarks WHERE id=$1", id);
        return oneBookmark;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllBookmarks,
    getBookmark
};