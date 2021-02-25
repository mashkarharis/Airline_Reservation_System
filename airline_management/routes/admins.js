var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  res.render("bookings", { title: "Admin" });
});
router.get("/members", function (req, res, next) {
  res.render("members", { title: "Admin" });
});
router.get("/flights", function (req, res, next) {
  res.render("flights", { title: "Admin" });
});
router.get("/schedules", function (req, res, next) {
  res.render("schedules", { title: "Admin" });
});
router.get("/routes", function (req, res, next) {
  res.render("routes", { title: "Admin" });
});
// router.get("/", function (req, res, next) {
//   res.render("bookings", { title: "Admin" });
// });
// router.get("/", function (req, res, next) {
//   res.render("bookings", { title: "Admin" });
// });

module.exports = router;
