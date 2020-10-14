const mongoose = require("mongoose");
const Listing = mongoose.model("listings");
module.exports = (app) => {
  app.get("/api/listings", async (req, res) => {
    const listing = await Listing.find().map((data) => data);

    res.send(listing);
  });
};
