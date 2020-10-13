// Outputs a random 32 bit. Call cryptStr()
// and it returns a 32 bit string, with numbers,
// and letters.
const cryptStr = require("../services/crypstopher");

// We need a route to handle deleting
// a listing and it's contents

module.exports = (app) => {
  app.post("/upload", (req, res) => {
    const DIRNAME = require("path").resolve(__dirname, "..");

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

    // Moves image file to host's DB
    file.mv(`${DIRNAME}/client/public/uploads/${parsedSuffix}`, (err) => {
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

    // Saves to /db/images/{img}
    // file.mv(`${DIRNAME}/db/images/${file.name}`, (err) => {
    //   console.log(`${DIRNAME}/db/images/`);
    //   if (err) {
    //     console.error(err);

    //     return res.status(500).send(err);
    //   }

    //   res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    // });
  });
};
