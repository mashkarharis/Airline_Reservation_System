var express = require("express");
const AirportModel = require("../models/AirportModel");
const RouteModel = require("../models/RouteModel");
const ScheduleModel = require("../models/ScheduleModel");
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


//-----------------Hashani-------------------------------
//---------------------Book------------------------
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
    res.render("Admin_pages/bookings", { title: "Admin", layout : "layouts/member_layout", data: array });}
  ); 
});

router.get("/removebook", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  console.log(req.query.booking_id);
  BookModel.remove_booking(req.query.booking_id).finally(()=>{
    res.redirect('/admin/');
  });
});

//----------------Class-----------------------

router.post("/addclass", function (req, res) {
  console.log(req.body);

  data = [
    req.body.type,
    req.body.description
  ];

  ClassModel.addClassType(data).then((result) => {
    req.session.data = null;
    req.session.msg = "Class added successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    req.session.data = null;
    req.session.msg = "Class adding Failed"
    res.redirect('/admin');
    res.end();
  });

});


router.post("/updateclass", function (req, res) {
  console.log(req.body);

  data = [
    req.body.type,
    req.body.description
  ];


  ClassModel.updateClassType(data).then((result) => {
    req.session.msg = "Class updated successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    console.log(err);
    req.session.msg = "Class update failed"
    res.redirect('/admin');
    res.end();
  });

});

router.get("/removeclass", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  console.log(class_id);
  ClassModel.deleteClassType(class_id).finally(()=>{
    res.redirect('/admin/');
  });
});

//------------------Membership----------------------
router.post("/addmembership", function (req, res) {
  console.log(req.body);

  
  data = [
    req.body.member_type,
    req.body.description,
    req.body.discount,
    req.body.min_travels_to_archieve 
  ];
  
  MembershipModel.addMembershipType(data).then((result) => {
    req.session.data = null;
    req.session.msg = "Membership added successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    req.session.data = null;
    req.session.msg = "Membership adding Failed"
    res.redirect('/admin');
    res.end();
  });

});


router.post("/updatemembership", function (req, res) {
  console.log(req.body);

  data = [
    req.body.member_type,
    req.body.description,
    req.body.discount,
    req.body.min_travels_to_achieve 
  ];


  MembershipModel.updateMembershipType(data).then((result) => {
    req.session.msg = "Membership updated successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    console.log(err);
    req.session.msg = "Membership update failed"
    res.redirect('/admin');
    res.end();
  });

});
router.get("/removemembership", function (req, res, next) {
  if(req.session.data==null){res.redirect('/');}
  console.log(member_type);
  MembershipModel.deleteMembershipType(member_type).finally(()=>{
    res.redirect('/admin/');
  });
});

//-----------------Rashmi-------------------------------

//airports
router.post("/addAirport",function(req, res){
  console.log(req.body);

  data = [
    req.body.code,
    req.body.park_capacity,
    req.body.latitude,
    req.body.longitude,
    req.body.description
  ];

  AirportModel.addAirportype(data).then((result) => {
    req.session.data = null;
    req.session.msg = "Airport added successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    req.session.data = null;
    req.session.msg = "Airport adding failed"
    res.redirect('/admin')
    res.end();
  });

});

router.post("/updateAirport",function(req, res){
  console.log(req.body);

  data = [
    req.body.code,
    req.body.park_capacity,
    req.body.latitude,
    req.body.longitude,
    req.body.description
  ];

  AirportModel.updateAirportType(data).then((result) => {
    req.session.msg = "Airport updated successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    console.log(err);
    req.session.msg = "Airport update failed"
    res.redirect('/admin')
    res.end();
  });

});

router.get("/deleteAirport",function(req, res, next) {
  if (req.session.data==null){res.redirect('/');}
  console.log(code);
  AirportModel.deleteAirportType(code).finally(()=>{
    res.redirect('/admin/');
  });
});

//routes
router.post("/addRoute",function(req, res){
  console.log(req.body);

  data = [
    req.body.r_id,
    req.body.dept_a_id,
    req.body.arrive_a_id,
    req.body.description,
    req.body.length
  ];

  RouteModel.addRouteType(data).then((result) => {
    req.session.data = null;
    req.session.msg = "Route added successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    req.session.data = null;
    req.session.msg = "Route adding failed"
    res.redirect('/admin')
    res.end();
  });

});

router.post("/updateRoute",function(req, res){
  console.log(req.body);

  data = [
    req.body.r_id,
    req.body.dept_a_id,
    req.body.arrive_a_id,
    req.body.description,
    req.body.length
  ];

  RouteModel.updateRouteType(data).then((result) => {
    req.session.msg = "Route updated successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    console.log(err);
    req.session.msg = "Route update failed"
    res.redirect('/admin')
    res.end();
  });

});

router.get("/deleteRoute",function(req, res, next) {
  if (req.session.data==null){res.redirect('/');}
  console.log(r_id);
  RouteModel.deleteRouteType(r_id).finally(()=>{
    res.redirect('/admin/');
  });
});

//schedules
router.post("/addSchedule",function(req, res){
  console.log(req.body);

  data = [
    req.body.s_id,
    req.body.description,
    req.body.arrival_time,
    req.body.departure_time
  ];

  ScheduleModel.addScheduleType(data).then((result) => {
    req.session.data = null;
    req.session.msg = "Schedule added successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    req.session.data = null;
    req.session.msg = "Schedule adding failed"
    res.redirect('/admin')
    res.end();
  });

});

router.post("/updateSchedule",function(req, res){
  console.log(req.body);

  data = [
    req.body.s_id,
    req.body.description,
    req.body.arrival_time,
    req.body.departure_time
  ];

  ScheduleModel.updateScheduleType(data).then((result) => {
    req.session.msg = "Schedule updated successfully";
    res.redirect('/admin');
    res.end();

  }).catch((err) => {
    console.log(err);
    req.session.msg = "Schedule update failed"
    res.redirect('/admin')
    res.end();
  });

});

router.get("/deleteSchedule",function(req, res, next) {
  if (req.session.data==null){res.redirect('/');}
  console.log(s_id);
  ScheduleModel.deleteScheduleType(s_id).finally(()=>{
    res.redirect('/admin/');
  });
});

// router.get("/", function (req, res, next) {
//   res.render("bookings", { title: "Admin" });
// });
// router.get("/", function (req, res, next) {
//   res.render("bookings", { title: "Admin" });
// });

module.exports = router;
