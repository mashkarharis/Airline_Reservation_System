const { addMembershipType, updateMembershipType, deleteMembershipType } = require("./MembershipModel");

//addMembershipType(["Normal_3","Just for fun",10]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

//updateMembershipType(["Test purpose",12,"Normal"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteMembershipType(["Normal_1"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});


const { addBookType, updateBookType, deleteBookType } = require("./BookModel");

addBookType(["06","03","01","Economic","2020-10-09 05:30:00"]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

updateBookType(["03","01","Economic","2020-10-09 05:30:00","01"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteBookType(["02"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});



const { addClassType, updateClassType, deleteClassType } = require("./ClassModel");

addClassType(["Economic","Normal Travels"]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

updateClassType(["Faster Travels","Economic"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteClassType(["Economic"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});


