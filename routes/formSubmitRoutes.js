const mongoose = require("mongoose");
const Listing = mongoose.model("listings");
const bodyParser = require("body-parser").json();
const firebase = require("firebase-admin");
const { response } = require("express");

module.exports = (app) => {
  app.post("/api/submit", bodyParser, async (req, res) => {
    const newListing = new Listing({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      furnitureType: req.body.furnitureType,
      condition: req.body.condition,
      color: req.body.color,
      detailText: req.body.detailText,
      askingPrice: req.body.askingPrice,
      fileName: req.body.fileName,
      imageURL: req.body.imageURL,
      gcFileName: req.body.gcFileName,
      email: req.body.email,
      phone: req.body.phone,
      altPhone: req.body.altPhone,
      userId: req.body.userId,
      approved: req.body.approved,
    });
    const listing = await newListing.save();
    const file = firebase.storage().bucket().file(req.body.gcFileName);
    file.setMetadata(
      {
        metadata: {
          _id: listing._id,
        },
      },
      (err, response) => {
        console.log(response);
      }
    );

    res.send(listing);
  });
};
