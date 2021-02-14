const { addMembershipType, updateMembershipType, deleteMembershipType } = require("./MembershipModel");

//addMembershipType(["Normal_3","Just for fun",10]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

//updateMembershipType(["Test purpose",12,"Normal"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteMembershipType(["Normal_1"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

const { addAirportType, updateAirportType, deleteAirportType } = require("./AirportModel");

addAirportType(["SIN",2000,100.00,330.00,"fy"]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

updateAirportType([2450,100.00,330.00,"fly","SIN"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteAirportType(["SIN"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

const { addRouteType, updateRouteType, deleteRouteType } = require("./RouteModel");

addRouteType([3,"SIN","CMB","Singapore to Colombo",2000.00]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

updateRouteType(["SIN","CMB","Singapore to Colombo",2020.00,3]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteRouteType([3]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});


const { addSheduleType, updateSheduleType, deleteSheduleType } = require("./ScheduleModel");

addRouteType([2,"HI","2020-10-09 05:30:00","2020-10-09 08:30:00"]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

updateRouteType(["Hey","2020-10-12 05:00:00","2020-10-12 08:30:00",2]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteRouteType([2]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});





