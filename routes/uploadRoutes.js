module.exports = (app) => {
  app.post("/upload", (req, res) => {
    const DIRNAME = require("path").resolve(__dirname, "..");

    if (req.files === null) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const file = req.files.file;

    // Working!
    file.mv(`${DIRNAME}/client/public/uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err);

        return res.status(500).send(err);
      }

      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
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
