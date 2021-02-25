
--  ============================== DUMMY DATA FOR START	 ==============================
-- admin:
INSERT INTO admin VALUES ("01","Rashmi","rashmi.18@cse.mrt.ac.lk","rashmi","995030225V","Sri Lanka","22","0702036662",null);
INSERT INTO admin VALUES ("02","Sandali","sandali.18@cse.mrt.ac.lk","sandali","985030225V","Canada","23","0702036663",null);

-- plane:
INSERT INTO plane VALUES("A320-200","180","A320","2","2020-11-30","White");
INSERT INTO plane VALUES("A319-200","145","A319","3","2020-02-22","White");
-- membership:
INSERT INTO membership VALUES("Guest","Guest customer","0");
INSERT INTO membership VALUES("Reg_frequent","Registered and frequent customer","5");
INSERT INTO membership VALUES("Reg_gold","Registered and gold customer","9");

-- user:
INSERT INTO user VALUES("01","Guest","Sri Lanka","111111","Kamal","23","983646234V","kamal@gmail.com","0703746253",null,null);
INSERT INTO user VALUES("02","Reg_frequent","Sri Lanka","111111","Nishani","23","983633234V","nishani@gmail.com","0703236253",null,null);
INSERT INTO user VALUES("03","Reg_gold","Canada","111111","James","23","223456","james@gmail.com","0771234567",null,null);
INSERT INTO user VALUES("04","Reg_gold","Korea","123456","Kim","30","2234456","kim@gmail.com","022716345",null,null);
INSERT INTO user VALUES("05","Guest","Sri Lanka","123456","Supun","50","712535663V","supun@gmail.com","0701234565",null,null);
INSERT INTO user VALUES("06","Guest","Australia","123446","Sam","66","735204856","sam@gmail.com","07926365448726",null,null);
INSERT INTO user VALUES("07","Guest","Australia","121212","Jenny","36","732304856","jenny@gmail.com","0792624235448726",null,null);
INSERT INTO user VALUES("08","Reg_frequent","Sri Lanka","121212","Akashi","22","992637128V","akashi@gmail.com","0771234567",null,null);
INSERT INTO user VALUES("09","Reg_frequent","Sri Lanka","555555","Amani","23","982637128V","amani@gmail.com","0771234577",null,null);
INSERT INTO user VALUES("10","Guest","India","666666","Amir","23","82347863","amir@gmail.com","34545644577",null,null);

-- schedule:
INSERT INTO schedule VALUES("01",NULL,"2020-10-09 05:30:00","2020-10-09 08:30:00");
INSERT INTO schedule VALUES("03",NULL,"2020-10-09 05:30:00","2020-10-09 08:30:00");

-- class:
INSERT INTO class VALUES("Economic","Normal Travels");
INSERT INTO class VALUES("Bussiness","Business Matters");

-- flight:
INSERT INTO flight VALUES("01","A320-200","01");
INSERT INTO flight VALUES("02","A319-200","01");

-- book:
INSERT INTO book VALUES("01","03","01","Economic","2020-10-09 05:30:00");
INSERT INTO book VALUES("02","06","02","Bussiness","2020-12-23 05:30:00");

-- seat:
INSERT INTO seat VALUES("01","Economic","A320-200","34");
INSERT INTO seat VALUES("02","Bussiness","A320-200","155");

-- price:
INSERT INTO price VALUES("01","Economic","30000");
INSERT INTO price VALUES("02","Bussiness","60000");

-- airport:
INSERT INTO airport VALUES("CMB","10000","500","10000",null);
INSERT INTO airport VALUES("SAR","30000","200","10000",null);

-- route:
INSERT INTO route VALUES("01","CMB","SAR","Colombo to Sarjah","100000");
INSERT INTO route VALUES("02","SAR","CMB","Sarjah to Colombo","3000000");

-- flight_route:
INSERT INTO flight_route VALUES("01","02");
INSERT INTO flight_route VALUES("01","01");








select * from Membership;

