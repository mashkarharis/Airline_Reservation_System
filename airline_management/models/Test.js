const { addMembershipType, updateMembershipType, deleteMembershipType } = require("./MembershipModel");

//addMembershipType(["Normal_3","Just for fun",10]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

//updateMembershipType(["Test purpose",12,"Normal"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteMembershipType(["Normal_1"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});





