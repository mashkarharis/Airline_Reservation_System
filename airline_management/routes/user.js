var express = require("express");
const UserModel = require("../models/UserModel");
var router = express.Router();

router.post("/try_login", function (req, res) {
  console.log(req.body);

  var crypto = require('crypto');
  var hash = crypto.createHash('md5').update(req.body.password).digest('hex');

  UserModel.get_user_data(req.body.email, hash).then((result) => {
    var json = JSON.parse(JSON.stringify(result));
    var priv = json[0].privilege;
    if (priv == "Admin") {
      req.session.data = json;
      res.redirect('/admin/');

    } else if (priv == "Member") {
      req.session.data = json;
      res.redirect('/member/');
    } else {
      req.session.data = null;
      req.session.msg = "Log In Failed";
      res.redirect('/login');
    }
    res.end();
  }).catch((err) => {
    req.session.data = null;
    req.session.msg = "Log In Failed"
    res.redirect('/login');
    res.end();
  });

});

router.get("/logout", function (req, res) {
  req.session.data = null;
  res.redirect('/');
});

router.post("/try_register", function (req, res) {
  console.log(req.body);

  var crypto = require('crypto');
  var hash = crypto.createHash('md5').update(req.body.password).digest('hex');

  data = [
    req.body.email,
    req.body.country,
    req.body.nic,
    null,//memtype
    req.body.name,
    req.body.age,
    req.body.address,
    req.body.phone,
    null// picture
  ];
  privilege = [
    req.body.email,
    "Member",
    hash
  ]


  UserModel.register_user(data, privilege).then((result) => {
    req.session.data = null;
    req.session.msg = "Register Success";
    res.redirect('/register');
    res.end();

  }).catch((err) => {
    req.session.data = null;
    req.session.msg = "Register Failed"
    res.redirect('/register');
    res.end();
  });

});

router.post("/try_update", function (req, res) {
  console.log(req.body);

  data = [
    req.body.address,
    req.body.phone,
    req.body.email
  ];


  UserModel.update_user(data).then((result) => {
    req.session.msg = "Update Success";
    res.redirect('/member/show_me');
    res.end();

  }).catch((err) => {
    console.log(err);
    req.session.msg = "Update Failed"
    res.redirect('/member/show_me');
    res.end();
  });

});



module.exports = router;
