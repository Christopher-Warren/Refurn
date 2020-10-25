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
  gcFileName: String,
  fileName: String,
  email: String,
  phone: String,
  altPhone: String,
  userId: String,
  approved: Boolean,
});

mongoose.model("listings", formSchema);
