var express = require('express');

const { getAllNIC } = require('../models/UserModel');
var router = express.Router();

/* GET users listing. */
router.get('/getallnic', function (req, res, next) {
  const isAuth = true;
  try {
    if (isAuth) {// Redirect
      console.log("Later We will add redirect for session check");
    }
    getAllNIC().then((data) => {
      res.send(data); //200
    }).catch((err) => {
      res.send(err); //500
    })
  } catch (err) {
    res.send(err)//500
  }
});
module.exports = router;
