// Outputs a random 32 bit. Call cryptStr()
// and it returns a 32 bit string, with numbers,
// and letters.
const cryptStr = require("../services/crypstopher");
const fs = require("fs");
const { dirname } = require("path");
// We need a route to handle deleting
// a listing and it's contents

module.exports = (app) => {
  const DIRNAME = require("path").resolve(__dirname, "..");
  // fs.readdirSync("./").forEach((file) => {
  //   console.log("FILES IN ./: " + file);
  // });
  fs.readdirSync("./client").forEach((file) => {
    console.log("FILES IN ./client: " + file);
  });

  app.post("/upload", (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const file = req.files.file;

    // Parses file name and returns
    // proper file suffix.
    const uniqueStr = cryptStr();
    const urlSuffix = file.name.slice(-4);
    let parsedSuffix = "";
    // e.g. parsedSuffix will be 93jcj3.jpg
    if (urlSuffix.startsWith(".")) {
      parsedSuffix = uniqueStr + urlSuffix;
    } else {
      parsedSuffix = uniqueStr + ".".concat(urlSuffix);
    }
    // console.log(DIRNAME);
    // console.log(__dirname);
    // console.log(`${DIRNAME}/client/public/uploads/${parsedSuffix}`);

    // Moves image file to host's DB
    if (process.env.NODE_ENV === "development") {
      file.mv(`${DIRNAME}/client/public/uploads/${parsedSuffix}`, (err) => {
        console.log("dev");
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        // If upload successfull...

        res.json({
          fileName: file.name,
          filePath: `/uploads/${parsedSuffix}`,
          fileDir: `${req.protocol}://${req.get("host")}${
            req.url
          }s/${parsedSuffix}`,
        });
      });
    } else {
      // todo: check env and return build or public
      file.mv(`${DIRNAME}/client/build/uploads/${parsedSuffix}`, (err) => {
        console.log("build");
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        // If upload successfull...

        res.json({
          fileName: file.name,
          filePath: `/uploads/${parsedSuffix}`,
          fileDir: `${req.protocol}://${req.get("host")}${
            req.url
          }s/${parsedSuffix}`,
        });
      });
    }
  });
};
