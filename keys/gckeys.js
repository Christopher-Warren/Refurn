if (process.env.NODE_ENV === "production") {
  module.exports = require("./gcprod");
} else {
  module.exports = require("./gcdev.json");
}
