module.exports = function (app) {
  app.use(function (req, res, next) {
      res.setHeader("Sec-Fetch-Site", "none");
      res.setHeader("Allow-Access-Control-Origin", "*");
      next();
  });
};
