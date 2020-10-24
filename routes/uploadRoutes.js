const firebase = require("firebase-admin");

module.exports = (app) => {
  const cryptStr = require("../services/crypstopher");

  app.post("/upload", async (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No files uploaded" });
    }
    const file = req.files.file; // last object is name sent from frontend

    const urlSuffix = file.name.slice(-4);
    let parsedSuffix = "";
    if (urlSuffix.startsWith(".")) {
      parsedSuffix = urlSuffix;
    } else {
      parsedSuffix = ".".concat(urlSuffix);
    }

    /**  //Uploads file to Firebase Storage 
      // Creates access point to Bucket*/
    const storage = firebase.storage().bucket();
    await storage
      .upload(file.tempFilePath, {
        gzip: true,
        destination: `users/${req.user._id}/${cryptStr()}${parsedSuffix}`,
      })
      .then((image) => {
        storage.file(image[0].metadata.name).makePublic();
        console.log(image[0].metadata.mediaLink);
        res.json({
          fileName: file.name,
          fileURL: image[0].metadata.mediaLink,
        });
      });
  });
};
