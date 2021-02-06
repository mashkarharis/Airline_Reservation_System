drop database if exists A12_AirLine_Management;
Create database A12_AirLine_Management;
use A12_AirLine_Management;

CREATE TABLE `Admin` (
  `Ad_id` INT auto_increment,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(20),
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
  `email` VARCHAR(20),
  `phone_number` INT,
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
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (a_id)
);
  
CREATE TABLE Route(
	r_id INT auto_increment,
	dept_a_id INT NOT NULL,
	arrive_a_id INT NOT NULL,
	description VARCHAR(50) DEFAULT NULL,
	length numeric(8,2) NOT NULL,
    check (length>0),
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (r_id),
	FOREIGN KEY (dept_a_id) REFERENCES Airport (a_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (arrive_a_id) REFERENCES Airport (a_id) ON DELETE RESTRICT ON UPDATE CASCADE
);
CREATE TABLE Schedule(
	s_id INT auto_increment,
	description VARCHAR(50) DEFAULT NULL,
	arrival_time DATETIME NOT NULL,
	departure_time DATETIME NOT NULL,
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (s_id)
);
CREATE TABLE Flight(
	f_id INT auto_increment,
	p_id INT NOT NULL,
	s_id INT NOT NULL,
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (class_id) REFERENCES Class (class_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (f_id) REFERENCES Flight (f_id) ON DELETE RESTRICT ON UPDATE CASCADE
);


CREATE TABLE Seat(
	seat_id INT auto_increment,
	class_id SMALLINT NOT NULL,
	p_id INT NOT NULL,
	seat_no INT NOT NULL,
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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

--  ============================== DUMMY DATA FOR START ==============================
