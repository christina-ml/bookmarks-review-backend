const checkName = (req, res, next) => {
    // if you provided a name, name is good. else, name is required.
    // the `next` parameter is to keep running our program, if a name is provided.
   if (req.body.name) {
       console.log("name is ok");
       next();
   } else {
       res.status(400).json({ error: "Name is required" });
   }
   
   /* validation - check the data type */
   if (typeof req.body.is_favorite === "boolean") {
       next();
   } else {
       res.status(400).json({ error: "is_favorite must be a boolean" });
   }
};
module.exports = { checkName };