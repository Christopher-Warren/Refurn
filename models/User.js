const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleName: String,
  googleId: String,
});

mongoose.model("users", userSchema);
