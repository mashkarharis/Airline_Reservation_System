var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("landingPage/index.ejs", {
    title: "Express",
    layout: false,
  });
});
router.get("/login", function (req, res, next) {
  res.render("login", {
    title: "Express",
    layout: false,
  });
});
router.get("/register", function (req, res, next) {
  res.render("register", {
    title: "Express",
    layout: false,
  });
});
// router.get("/", function (req, res, next) {
//   res.render("landingPage/index.ejs", {
//     title: "Express",
//     layout: "layouts/layoutSecond.ejs",
//   });
// });

module.exports = router;
