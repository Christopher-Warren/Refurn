const mongoose = require("mongoose");
const isAdmin = require("./isAdmin");
const isAuthenticated = require("./isAuthenticated");
const Listing = mongoose.model("listings");
const bodyParser = require("body-parser").json();
module.exports = (app) => {
  // Returns a list of ALL db items
  // to admin user.
  app.get("/api/listings", isAuthenticated, isAdmin, async (req, res) => {
    const getListing = await Listing.find().map((data) => data);
    res.send(getListing);
  });
  // Returns a list of USER db items
  // and returns to user.
  app.get("/api/listings/:id", async (req, res) => {
    const getUserListing = await Listing.find({ userId: req.params.id });

    res.send(getUserListing);
  });

  // Finds and deletes the document
  // with specified id
  // isAuthenticated, isAdmin,
  app.delete("/api/listings/:id", async (req, res) => {
    //const listing = await Listing.findById(req.body);
    const deleteListing = await Listing.findByIdAndDelete(req.params.id);
    res.send("comeplete");
  });
};
