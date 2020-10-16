const mongoose = require("mongoose");
const isAdmin = require("./isAdmin");
const isAuthenticated = require("./isAuthenticated");
const Listing = mongoose.model("listings");
module.exports = (app) => {
  app.get("/api/listings", isAuthenticated, isAdmin, async (req, res) => {
    const listing = await Listing.find().map((data) => data);
    res.send(listing);
  });
};
