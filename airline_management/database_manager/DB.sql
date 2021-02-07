drop database if exists A12_AirLine_Management;
Create database A12_AirLine_Management;
use A12_AirLine_Management;

CREATE TABLE `Admin` (
  `Ad_id` INT auto_increment,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(120),
  `password` VARCHAR(45) NOT NULL,
  `NIC` VARCHAR(45) UNIQUE NOT NULL,
  `age` INT NOT NULL,
  `phone_number` INT,
  `picture` blob default null,
  check (age>=18),
  PRIMARY KEY (`Ad_id`));

CREATE TABLE `Membership` (
  `member_type` VARCHAR(20) NOT NULL,
  `description` VARCHAR(100) NULL,
  `discount` numeric(10,2) default 0,
  PRIMARY KEY (`member_type`));

CREATE TABLE `User` (
  `u_id` INT auto_increment,
  `member_type` VARCHAR(20) NOT NULL,
  `country` VARCHAR(10) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `NIC` VARCHAR(45) UNIQUE NOT NULL,
  `email` VARCHAR(120),
  `phone_enumber` bigint,
  `picture` blob default null,
  `status` VARCHAR(20) default 'PENDING',
  check (age>=0),
  check (`status` in ('PENDING','ACTIVE','DELETED')),
  PRIMARY KEY (`u_id`),
  INDEX `member_type_idx` (`member_type` ASC) VISIBLE,
  CONSTRAINT `member_type`
    FOREIGN KEY (`member_type`)
    REFERENCES `Membership` (`member_type`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE Plane(
	p_id int auto_increment,
	capacity int NOT NULL,
	ptype VARCHAR(20) NOT NULL,
	pname VARCHAR(30) UNIQUE NOT NULL,
	engine_no INT UNIQUE NOT NULL,
	last_repaired DATETIME NOT NULL,
	color VARCHAR(20) NOT NULL,
    check (capacity>=0),
	PRIMARY KEY (P_id)
);   

CREATE TABLE Airport(
	a_id INT auto_increment,
	park_capacity INT NOT NULL,
	latitude numeric(10,5) NOT NULL,
	longitude numeric(10,5)NOT NULL,
	code VARCHAR(20) UNIQUE NOT NULL,
	description VARCHAR(50) DEFAULT NULL,
    check (park_capacity>=0),
    PRIMARY KEY (a_id)
);
  
CREATE TABLE Route(
	r_id INT auto_increment,
	dept_a_id INT NOT NULL,
	arrive_a_id INT NOT NULL,
	description VARCHAR(50) DEFAULT NULL,
	length numeric(38,2) NOT NULL,
    check (length>0),
    PRIMARY KEY (r_id),
	FOREIGN KEY (dept_a_id) REFERENCES Airport (a_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (arrive_a_id) REFERENCES Airport (a_id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE Schedule(
	s_id INT auto_increment,
	description VARCHAR(50) DEFAULT NULL,
	arrival_time DATETIME NOT NULL,
	departure_time DATETIME NOT NULL,
    PRIMARY KEY (s_id)
);
CREATE TABLE Flight(
	f_id INT auto_increment,
	p_id INT NOT NULL,
	s_id INT NOT NULL,
    PRIMARY KEY (f_id),
	FOREIGN KEY (p_id) REFERENCES Plane(p_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (s_id) REFERENCES Schedule(s_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Flight_Route(
	f_id INT NOT NULL,
	r_id INT NOT NULL,
	FOREIGN KEY (f_id) REFERENCES Flight(f_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (r_id) REFERENCES Route(r_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Class(
	class_id SMALLINT auto_increment,
	description VARCHAR(50) DEFAULT NULL,
	type VARCHAR(20) UNIQUE NOT NULL,
	PRIMARY KEY (class_id)
);

CREATE TABLE Price(
	f_id INT NOT NULL,
	class_id SMALLINT NOT NULL,
	amount DECIMAL(10,2) NOT NULL,
    check (amount>=0),
    FOREIGN KEY (class_id) REFERENCES Class (class_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (f_id) REFERENCES Flight (f_id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE Seat(
	seat_id INT auto_increment,
	class_id SMALLINT NOT NULL,
	p_id INT NOT NULL,
	seat_no INT NOT NULL,
    PRIMARY KEY (seat_id),
	FOREIGN KEY (class_id) REFERENCES Class (class_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (p_id) REFERENCES Plane (p_id) ON DELETE RESTRICT ON UPDATE CASCADE
); 

CREATE TABLE Book(
	book_id INT auto_increment,
	u_id INT NOT NULL,
	f_id INT NOT NULL,
	class_id SMALLINT NOT NULL,
	time_date DATETIME NOT NULL,
    PRIMARY KEY (book_id),
	FOREIGN KEY (u_id) REFERENCES User(u_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (f_id) REFERENCES Flight(f_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (class_id) REFERENCES Class(class_id) ON DELETE RESTRICT ON UPDATE CASCADE	
);

--  ============================== INDEX ==============================
create index ADMIN_SELECT on Admin(NIC);
create index USER_SELECT on User(NIC);
create index PLANE_SELECT on Plane(pname);
create index AIRPORT_SELECT on Airport(a_id);


show tables;
desc admin;
desc airport;
desc book;
desc class;
desc flight;
desc flight_route;
desc membership;
desc plane;
desc price;
desc route;
desc schedule;
desc seat;
desc user;

--  ============================== DUMMY DATA FOR START	 ==============================
-- admin:
INSERT INTO admin VALUES ("01","Rashmi","rashmi.18@cse.mrt.ac.lk","rashmi","995030225V","22","0702036662",null);
INSERT INTO admin VALUES ("02","Sandali","sandali.18@cse.mrt.ac.lk","sandali","985030225V","23","0702036663",null);

-- plane:
INSERT INTO plane VALUES("01","180","A320","A320-200","2","2020-11-30","White");
INSERT INTO plane VALUES("02","145","A319","A319-200","3","2020-02-22","White");
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
INSERT INTO class VALUES("01",null,"1st class");
INSERT INTO class VALUES("02",null,"2nd class");

-- flight:
INSERT INTO flight VALUES("01","01","01");
INSERT INTO flight VALUES("02","02","01");

-- book:
INSERT INTO book VALUES("01","03","01","01","2020-10-09 05:30:00");
INSERT INTO book VALUES("02","06","02","02","2020-12-23 05:30:00");

-- seat:
INSERT INTO seat VALUES("01","01","02","34");
INSERT INTO seat VALUES("02","02","01","155");

-- price:
INSERT INTO price VALUES("01","01","30000");
INSERT INTO price VALUES("02","01","60000");

-- airport:
INSERT INTO airport VALUES("01","10000","500","10000","100",null);
INSERT INTO airport VALUES("02","30000","200","10000","57",null);

-- route:
INSERT INTO route VALUES("01","02","01",NULL,"100000");
INSERT INTO route VALUES("02","01","02",NULL,"3000000");

-- flight_route:
INSERT INTO flight_route VALUES("01","02");
INSERT INTO flight_route VALUES("01","01");

