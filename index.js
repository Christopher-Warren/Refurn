const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const keys = require("./keys/dev");
const passport = require("passport");
const cookieSession = require("cookie-session");

require("./models/User");
require("./models/ListingModel");
require("./services/passport");
// Server Initialization
const app = express();
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("connected to mongodb");
});

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// File Upload Initialization
app.use(fileUpload());
// Routes
require("./routes/authRoutes")(app);
require("./routes/uploadRoutes")(app);
require("./routes/formSubmitRoutes")(app);
require("./routes/listingRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
