var express = require("express");
const UserModel = require("../models/UserModel");
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

router.get("/", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  array=[]
  email=JSON.parse(JSON.stringify(req.session.data))[0].email;

  UserModel.get_user_data_by_email(email).then((res)=>{   
    res.forEach(row => {
      array.push(row);
    });
    console.log(array);    
  }).catch((err)=>{
    console.log(err); 
  }).finally(()=>{
    console.log("AA");
    res.render("Admin_pages/admindetails", { title: "Admin", layout : "layouts/member_layout", data: array });}
  ); 
});



router.get("/removeadmin", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  console.log(req.query.u_id);
  UserModel.delete_user(req.query.u_id).finally(()=>{
    res.redirect('/admin/');
  });
});

module.exports = router;
