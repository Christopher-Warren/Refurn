console.log("[200] APP RUNNING");
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const keys = require("./keys/keys");
const serviceAccount = require("./keys/gckeys");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
// Firebase Dependencies
const firebase = require("firebase-admin");
console.log("[200] DEPS LOADED SUCCESS");
// App Models and Services
require("./models/User");
require("./models/ListingModel");
require("./services/passport");
// Server Initialization
const app = express();
// MongoDB Connection
const database = mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
console.log("[200] STARTING FIREBASE INIT...");
// Firebase Connection
console.log("SERVICE: ", serviceAccount);
console.log("TEST", JSON.parse(serviceAccount));
firebase.initializeApp({
  credential: firebase.credential.cert(JSON.parse(serviceAccount)),
  databaseURL: "https://refurn.firebaseio.com",
  storageBucket: "refurn.appspot.com",
});
console.log("[200] ... GOOD");
// MongoDB File Upload Middlewares
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// Can possibly remove
app.use(bodyParser.json());

// Cookie Middleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/authRoutes")(app);
require("./routes/uploadRoutes")(app);
require("./routes/formSubmitRoutes")(app);
require("./routes/listingRoutes")(app);

// PRODUCTION BUILD CODE
if (process.env.NODE_ENV === "production") {
  // Allows Express to serve production assets.
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
