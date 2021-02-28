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
// router.get("/", function (req, res, next) {
//   res.render("bookings", { title: "Admin" });
// });
// router.get("/", function (req, res, next) {
//   res.render("bookings", { title: "Admin" });
// });

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

module.exports = router;
