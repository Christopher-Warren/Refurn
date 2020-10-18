const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const keys = require("./keys/keys");
const passport = require("passport");
const cookieSession = require("cookie-session");

// MongoDB File Upload Dependencies
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const { mongoURI } = require("./keys/keys");

// App Models and Services
require("./models/User");
require("./models/ListingModel");
require("./services/passport");
// Server Initialization
const app = express();
const database = mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const conn = mongoose.connection;
// probably don't need this
conn.on("error", console.error.bind(console, "connection error:"));

let gfs;
conn.once("open", () => {
  console.log("* MongoDB Connection Established *");
  // Initialize Stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});
// Create Storage Engine
const storage = new GridFsStorage({
  db: database,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

// File Upload Route
// upload.single("file") matches the
// name of the submitted <input />

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("/upload pinged");
  res.json({ file: req.file });
});
// This Route returns JSON Data
// ff all of the files
app.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist",
      });
    }

    return res.json(files);
  });
});

// This Route Searches all files
// and returns JSON if there is
// a match
app.get("/files/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      console.log(file);
      return res.status(404).json({
        err: "No file exists",
      });
    }
  });
});

app.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      console.log(file);
      return res.status(404).json({
        err: "No file exists",
      });
    }
    if (
      file.contentType === "image/jpeg" ||
      file.contentType === "image/jpeg"
    ) {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});

// MongoDB File Upload Middlewares
app.use(bodyParser.json());
app.use(methodOverride("_method"));
// App MiddleWare
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
