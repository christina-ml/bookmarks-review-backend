/* 
    - making a validateURL - Final Validation asks where you need to put these?
    - These need to go into CREATE and UPDATE, because we are adding/modifying the url in those places.
*/
const validateURL = (req, res, next) => {
    if (
        req.body.url.substring(0,7) === "http://" ||
        req.body.url.substring(0,8) === "https://"
    ) {
        return next();
    } else {
        res.status(400).json({ error: "You forgot to start your url with http:// or https://" });
    }
}

module.exports = { validateURL }