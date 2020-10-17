const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  firstName: String,
  lastName: String,
  furnitureType: String,
  condition: String,
  color: String,
  detailText: String,
  askingPrice: String,
  imageURL: String,
  email: String,
  phone: String,
  altPhone: String,
});

mongoose.model("listings", formSchema);
