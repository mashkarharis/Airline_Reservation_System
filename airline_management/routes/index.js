var express = require("express");
const BookModel = require("../models/BookModel");
var router = express.Router();
const PlaneModel = require("../models/PlaneModel");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("landingPage/index.ejs", {
    title: "Express",
    layout: false,
    data: req.session.data
  });
});

router.get("/iwantbook", function (req, res, next) {
  array=[];
  var msgs=req.session.msg;
  req.session.msg=null;
  PlaneModel.getFlightID().then((res)=>{   
    res.forEach(row => {
      array.push(row);
    });
    console.log("----------------------------")
    console.log(array);    
  }).catch((err)=>{
  }).finally(()=>{
    res.render("iwantbook.ejs", {
      title: "Express",
      layout: false,
      flights: array,
      msg:msgs
    });
   });  
});

router.get("/flightclass", function (req, res, next) {
  var id=req.param('id')
  console.log(req.params);
  var array=[]
  PlaneModel.getFlightClasses(id).then((res)=>{   
    res.forEach(row => {
      array.push(row.type);
    });
    console.log("----------------------------")
    console.log(array); 
    res.send(array);  
  }).catch((err)=>{
    res.send(array);
  }); 
});

router.get("/flightseat/:id/:class", function (req, res, next) {
  var id=req.params.id;
  var classed=req.params.class;
  console.log(req.params);
  var array=[]
  PlaneModel.getFlightSeats(id,classed).then((res)=>{   
    res.forEach(row => {
      array.push(row.seat_no);
    });
    console.log("----------------------------")
    console.log(array); 
    res.send(array);  
  }).catch((err)=>{
    res.send(array);
  }); 
});

router.get("/flight_price/:id/:class", function (req, res, next) {
  var id=req.params.id;
  var classed=req.params.class;
  console.log(req.params);
  var array=[]
  
  PlaneModel.getFlightPrice(id,classed).then((res)=>{   
    res.forEach(row => {
      array.push(row.amount);
    });
    console.log("----------------------------")
    console.log(array); 
    res.send(array);  
  }).catch((err)=>{
    res.send(array);
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





router.post("/guestbook", function (req, res, next) {
  var body=req.body;
  console.log(body);
  BookModel.doguestbooking(body).then((result) => {
    req.session.data = null;
    req.session.msg = "Booking Success.Your Booking ID is :"+body.book_id;
    res.redirect('/iwantbook');
    res.end();
  }).catch((err) => {
    console.log(err)
    req.session.data = null;
    req.session.msg = "Booking Failed"
    res.redirect('/iwantbook');
    res.end();
  });
});








// router.get("/", function (req, res, next) {
//   res.render("landingPage/index.ejs", {
//     title: "Express",
//     layout: "layouts/layoutSecond.ejs",
//   });
// });

module.exports = router;
