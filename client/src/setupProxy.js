const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api/*", "/auth/*", "/upload", "/users/*"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
