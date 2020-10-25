const firebase = require("firebase-admin");

module.exports = (app) => {
  const cryptStr = require("../services/crypstopher");

  app.post("/upload", async (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: "No files uploaded" });
    }
    const file = req.files.file; // last object {file} is name sent from frontend
    // Parses the file name and file type
    const urlSuffix = file.name.slice(-4);
    let parsedSuffix = "";
    if (urlSuffix.startsWith(".")) {
      parsedSuffix = urlSuffix;
    } else {
      parsedSuffix = ".".concat(urlSuffix);
    }

    /**  //Uploads file to Firebase Storage 
      
    */
    const storage = firebase.storage().bucket();
    const uploadOptions = {
      gzip: true,
      destination: `users/${req.user._id}/${cryptStr()}${parsedSuffix}`,
    };
    storage.upload(file.tempFilePath, uploadOptions, (err, image, response) => {
      storage.file(image.metadata.name).makePublic((err, response) => {
        console.log(image.name);
        res.json({
          gcFileName: image.name,
          fileName: file.name,
          fileURL: image.metadata.mediaLink,
        });
      });
    });
  });
};
