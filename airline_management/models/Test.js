const { addMembershipType, updateMembershipType, deleteMembershipType } = require("./MembershipModel");
const { addUserType, updateMembership, deleteUser } = require("./UserModel");
const { addAdmin, updateAdmin, deleteAdmin } = require("./AdminModel");

//addMembershipType(["Normal_3","Just for fun",10]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

//updateMembershipType(["Test purpose",12,"Normal"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteMembershipType(["Normal_1"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

//addUser([Guest","Sri Lanka","111111","Kamal","23","983646234V","kamal@gmail.com","0703746253",null,null]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

//updateUser([Guest","Canada","111111","Kamal","23","983646234V","kamal@gmail.com","0703746253",null,null,"01"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteUser(["01"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

//addAdmin(["Rashmi","rashmi.18@cse.mrt.ac.lk","rashmi","995030225V","Sri Lanka","22","0702036662",null]).then((res)=>{console.log("pass")}).catch((res)=>{console.log("failed")});

//updateAdmin(["Rashmi","rashmi.18@cse.mrt.ac.lk","rashmi","995030225V","Australia","23","0702036662",null,"01"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});

deleteAdmin(["01"]).then((res)=>{console.log(res);console.log("pass")}).catch((res)=>{console.log(res);console.log("failed")});





