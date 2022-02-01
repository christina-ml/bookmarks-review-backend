const checkName = (req, res, next) => {
    // if you provided a name, name is good. else, name is required.
    // the `next` parameter is to keep running our program, if a name is provided.
   if (req.body.name) {
       console.log("name is ok");
       next();
   } else {
       res.status(400).json({ error: "Name is required" });
   }
};
module.exports = { checkName };