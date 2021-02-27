var express = require("express");
const PlaneModel = require("../models/PlaneModel");
const BookModel = require("../models/BookModel");
const UserModel = require("../models/UserModel");
var router = express.Router();


router.get("/flights", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  res.render("Member_pages/flights", { title: "Member" , layout : "layouts/member_layout"});
});



router.get("/show_me", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  email=JSON.parse(JSON.stringify(req.session.data))[0].email;
  UserModel.get_user_data_by_email(email).then((data)=>{
    console.log(data);
    var msgs=req.session.msg;
    req.session.msg=null;
    res.render("Member_pages/editmyprofile", { title: "Member" , layout : "layouts/member_layout", msg:msgs ,data:data});
  }).catch((err)=>{
    var msgs=err;
    req.session.msg=null;
    res.render("Member_pages/editmyprofile", { title: "Member" , layout : "layouts/member_layout", msg:msgs ,data:[]}); 
  })
  
});



router.get("/airport", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}

  array=[]
  PlaneModel.getAirportData().then((res)=>{   
    res.forEach(row => {
      array.push(row);
    });
    console.log(array);    
  }).catch((err)=>{
  }).finally(()=>{
    console.log("AA");
    res.render("Member_pages/airport", { title: "Member", layout : "layouts/member_layout", data: array });}
  ); 
});




router.get("/planes", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  array=[]
  PlaneModel.getPlaneData().then((res)=>{   
    res.forEach(row => {
      array.push(row);
    });
    console.log(array);    
  }).catch((err)=>{
  }).finally(()=>{
    console.log("AA");
    res.render("Member_pages/planes", { title: "Member", layout : "layouts/member_layout", data: array });}
  ); 
});



router.get("/", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  array=[]
  email=JSON.parse(JSON.stringify(req.session.data))[0].email;

  BookModel.getBookdata(email).then((res)=>{   
    res.forEach(row => {
      array.push(row);
    });
    console.log(array);    
  }).catch((err)=>{
    console.log(err); 
  }).finally(()=>{
    console.log("AA");
    res.render("Member_pages/mybookings", { title: "Member", layout : "layouts/member_layout", data: array });}
  ); 
});



router.get("/removebook", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  console.log(req.query.booking_id);
  BookModel.remove_booking(req.query.booking_id).finally(()=>{
    res.redirect('/member/');
  });
});

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
    res.render("Member_pages/memberdetails", { title: "Member", layout : "layouts/member_layout", data: array });}
  ); 
});



router.get("/removemember", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  console.log(req.query.u_id);
  UserModel.delete_user(req.query.u_id).finally(()=>{
    res.redirect('/member/');
  });
});










// router.get("/", function (req, res, next) {
//   res.render("bookings", { title: "Admin" });
// });
// router.get("/", function (req, res, next) {
//   res.render("bookings", { title: "Admin" });
// });

module.exports = router;
