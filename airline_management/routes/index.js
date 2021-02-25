var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("landingPage/index.ejs", {
    title: "Express",
    layout: false,
    data: req.session.data
  });
});
router.get("/login", function (req, res, next) {
  if(req.session.data!=null){res.redirect('/');}
  var msgs=req.session.msg;
  req.session.msg=null;
  res.render("login", {
    title: "Express",
    layout: false,
    msg:msgs
  });
  
});
router.get("/register", function (req, res, next) {
  if(req.session.data!=null){res.redirect('/');}
  var msgs=req.session.msg;
  req.session.msg=null;
  res.render("register", {
    title: "Express",
    layout: false,
    msg:msgs
  });
});
// router.get("/", function (req, res, next) {
//   res.render("landingPage/index.ejs", {
//     title: "Express",
//     layout: "layouts/layoutSecond.ejs",
//   });
// });

module.exports = router;
