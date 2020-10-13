const mongoose = require("mongoose");
const Listing = mongoose.model("listings");
const bodyParser = require("body-parser").json();

module.exports = (app) => {
  app.post("/api/submit", bodyParser, (req, res) => {
    const newListing = new Listing({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      furnitureType: req.body.furnitureType,
      condition: req.body.condition,
      color: req.body.color,
      detailText: req.body.detailText,
      askingPrice: req.body.askingPrice,
      imageURL: req.body.imageURL,
    });
    newListing.save().then((listing) => res.send(listing));
  });
};
