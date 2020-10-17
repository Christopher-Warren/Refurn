module.exports = (req, res, next) => {
  if (req.user._id == "5f84ddd76c5aa621a4448718") {
    console.log("Admin Logged In");
    return next();
  } else if (req.user._id !== "5f84ddd76c5aa621a4448718") {
    res.status(403).send("access forbbiden");
  } else {
    console.log("Attempted Access");
    res.status(401).send("You must be logged in.");
  }
};
