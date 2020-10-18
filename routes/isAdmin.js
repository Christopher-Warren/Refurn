module.exports = (req, res, next) => {
  if (req.user._id == "5f8bb02eda6cf40017de82da") {
    console.log("Admin Logged In");
    return next();
  } else if (req.user._id !== "5f8bb02eda6cf40017de82da") {
    res.status(403).send("access forbbiden");
  } else {
    console.log("Attempted Access");
    res.status(401).send("You must be logged in.");
  }
};
