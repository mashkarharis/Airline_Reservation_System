drop database if exists A12_AirLine_Management;
Create database A12_AirLine_Management;
use A12_AirLine_Management;

CREATE TABLE User(	
    email VARCHAR(120) NOT NULL,
	privilege VARCHAR(20) NOT NULL,    
   `password` VARCHAR(45) NOT NULL,
    PRIMARY KEY (email),
	check (privilege in ('Admin','Member'))
);

CREATE TABLE `Admin` (	
  `email` VARCHAR(120),	
  `country` VARCHAR(10) NOT NULL,
  `NIC` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `address` varchar(120) NOT NULL,
  `phone_number` INT,
  `picture` blob default null,
  check (age>=18),
  PRIMARY KEY (`email`),
  FOREIGN KEY (`email`) REFERENCES User(email) ON DELETE RESTRICT ON UPDATE CASCADE,
  UNIQUE KEY (`country`,`NIC`)
  );

CREATE TABLE `Membership` (
  `member_type` VARCHAR(20),
  `description` VARCHAR(100) default NULL,
  `discount` numeric(10,2) default 0,
  `min_travels_to_acheive` int default 0,
  PRIMARY KEY (`member_type`)
);

CREATE TABLE `Member` (	
  `email` VARCHAR(120),
  `country` VARCHAR(10) NOT NULL,
  `NIC` VARCHAR(45) NOT NULL,
  `member_type` VARCHAR(20) default NULL,    
  `name` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `address` varchar(120) NOT NULL,
  `phone_number` bigint,
  `picture` blob default null,
 -- `status` VARCHAR(20) default 'PENDING',
  check (age>=18),
 -- check (`status` in ('PENDING','ACTIVE','DELETED')),
  PRIMARY KEY (`email`),
  FOREIGN KEY (`email`) REFERENCES User(email) ON DELETE RESTRICT ON UPDATE CASCADE,
  UNIQUE KEY (`country`,`NIC`),
  FOREIGN KEY (`member_type`)
    REFERENCES `Membership` (`member_type`)
    ON DELETE restrict
    ON UPDATE CASCADE
);


    
CREATE TABLE Plane(	
	pname VARCHAR(30),
	capacity int NOT NULL,
	ptype VARCHAR(20) NOT NULL,
	engine_no INT UNIQUE NOT NULL,
	last_repaired DATETIME NOT NULL,
	color VARCHAR(20) NOT NULL,
    check (capacity>=0),
	PRIMARY KEY (pname)
);   

CREATE TABLE Airport(
	code CHAR(3),
	park_capacity INT NOT NULL,
	latitude numeric(10,5) NOT NULL,
	longitude numeric(10,5)NOT NULL,
	country VARCHAR(12),
	city VARCHAR(20),
	description VARCHAR(50) DEFAULT NULL,
    check (park_capacity>=0),
    PRIMARY KEY (code),
	UNIQUE KEY (latitude,longitude)
);
  
CREATE TABLE Route(
	r_id INT auto_increment,
	dept_a_id CHAR(3) NOT NULL,
	arrive_a_id CHAR(3) NOT NULL,
	description VARCHAR(50) DEFAULT NULL,
	length numeric(38,2) NOT NULL,
    check (length>0),
    PRIMARY KEY (r_id),
	FOREIGN KEY (dept_a_id) REFERENCES Airport (code) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (arrive_a_id) REFERENCES Airport (code) ON DELETE RESTRICT ON UPDATE CASCADE
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
	pname VARCHAR(30) NOT NULL,
	s_id INT NOT NULL,
	r_id INT NOT NULL,
    PRIMARY KEY (f_id),
	FOREIGN KEY (r_id) REFERENCES Route(r_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (pname) REFERENCES Plane(pname) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (s_id) REFERENCES Schedule(s_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Class(
	type VARCHAR(20),
	description VARCHAR(50) DEFAULT NULL,	
	PRIMARY KEY (type)
);

CREATE TABLE Price(
	f_id INT NOT NULL,
	type VARCHAR(20),
	amount DECIMAL(10,2) NOT NULL,
    check (amount>=0),
    primary key (f_id,type),
    FOREIGN KEY (type) REFERENCES Class (type) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (f_id) REFERENCES Flight (f_id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE Seat(
	seat_id INT auto_increment,
	type VARCHAR(20),
	pname VARCHAR(30),
	seat_no INT NOT NULL,
    PRIMARY KEY (seat_id),
    UNIQUE KEY(pname,seat_no),
	FOREIGN KEY (type) REFERENCES Class (type) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (pname) REFERENCES Plane (pname) ON DELETE RESTRICT ON UPDATE CASCADE
); 

CREATE TABLE Book(
	book_id bigint,
	email VARCHAR(120) default NULL,
	f_id INT NOT NULL,
	seat_id INT NOT NULL,
	time_date DATETIME NOT NULL,
    paid DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (book_id),
    FOREIGN KEY(email) REFERENCES Member(email) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (f_id) REFERENCES Flight(f_id) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (seat_id) REFERENCES Seat(seat_id) ON DELETE RESTRICT ON UPDATE CASCADE	
);

CREATE TABLE `Guest` (	
  `book_id` bigint,
  `country` VARCHAR(10) NOT NULL,
  `NIC` VARCHAR(45) default NULL,
  `name` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `address` varchar(120) NOT NULL,
  `phone_number` bigint,
  `picture` blob default null,
  check (age>=0),
  FOREIGN KEY (`book_id`)
    REFERENCES `Book` (`book_id`)
    ON DELETE restrict
    ON UPDATE CASCADE
);

--  ============================== INDEX ==============================
-- create index ADMIN_SELECT on Admin(email);
-- create index Member_SELECT on Member(email);
-- create index PLANE_SELECT on Plane(pname);
-- create index AIRPORT_SELECT on Airport(code);


show tables;


-- =================================== View ======================================================
create VIEW all_member_public_data as select email,privilege,country,NIC,member_type,name,age,address,phone_number,picture  from User natural join Member;
create VIEW all_admin_public_data as select email,privilege,country,NIC,name,age,address,phone_number,picture  from User natural join Admin;
create VIEW basic_book_data as Select email,book_id,f_id,time_date,type,pname,seat_id,seat_no,paid from Book left join Seat using(seat_id);
drop  view if exists Flight_Plane;
create view Flight_Plane as select f_id,pname,s_id,r_id from Flight natural join Plane;
-- select * from Flight_Plane;

drop view if exists Flight_Schedule;
create view Flight_Schedule as select f_id,pname,r_id,arrival_time,departure_time from Flight_Plane natural join Schedule;
-- select * from Flight_Schedule;

drop view if exists Flight_Schedule_Price;
create view Flight_Schedule_Price as select * from Flight_Schedule left join Price using(f_id);


drop view if exists Flight_Data;
create view Flight_Data as select * from Flight_Schedule_Price left join Route using(r_id);
select * from Flight_Data;
-- =================================== Functions ================================================
drop function if exists `not_departured`;
DELIMITER //
CREATE FUNCTION `not_departured`(f_id_in INT) 
RETURNS varchar(20)
deterministic
BEGIN
	DECLARE departure_at varchar(20);
    DECLARE ret_val boolean;
	select departure_time into departure_at from Flight_Data where f_id=f_id_in limit 1;
	RETURN(current_timestamp()<departure_at);
END; //
delimiter ;
select distinct f_id from Flight where not_departured(f_id) order by (f_id);
select not_departured(1);
-- =================================== Procedures ================================================
-- ======== To get data of login person ==========
drop procedure if exists get_user_data;
delimiter //
create procedure get_user_data(IN in_email VARCHAR(120),IN in_password VARCHAR(45))
	begin
		DECLARE in_privilege VARCHAR(20);
		select privilege into in_privilege from User where email=in_email and password=in_password;
        if in_privilege = "Admin" THEN
			select * from all_admin_public_data where email=in_email;
		elseif in_privilege="Member" THEN
			select * from all_member_public_data where email=in_email;
		else
			select * from User where false;
		end if;
	end; //
delimiter ;
call get_user_data("davidjones@gmail.com","32250170a0dca92d53ec9624f336ca24");

-- ======== To Update Member Type After Booking Removed ==========
drop procedure if exists removebooking;
delimiter //
create procedure removebooking(IN in_book_id BIGINT)
	begin
		DECLARE dec_email VARCHAR(120);
        DECLARE num_of_bookings INT;
        DECLARE new_member_type varchar(20);
        
		select email into dec_email from Book where book_id=in_book_id;
        
        delete from Book where book_id=in_book_id;
        
        select count(*) into num_of_bookings from Book where email=dec_email;
        
		select member_type into new_member_type from Membership where min_travels_to_acheive <= num_of_bookings order by min_travels_to_acheive desc limit 1;
        
        update Member set member_type=new_member_type where email=dec_email;
	end; //
delimiter ;

-- ==================== Triggers ===========================
-- =========== Seat Not Exceed Plane Capacity ==============
DELIMITER $$
CREATE TRIGGER protect_seat_limitation BEFORE INSERT ON Seat FOR EACH ROW
	BEGIN
		DECLARE max_capacity varchar(20);
        DECLARE seats_added INT;
        select capacity into max_capacity from Plane where pname=NEW.pname;
        select count(*) into seats_added from Seat where pname=NEW.pname;
        IF seats_added>=max_capacity
			THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Plane Full no Space';
		END IF;
	END $$
DELIMITER ;
-- =========== Assign Memership When New Member Added ======
DELIMITER $$
CREATE TRIGGER assign_memebership_to_new_member BEFORE INSERT ON Member FOR EACH ROW
	BEGIN
		DECLARE lowest_membership_type varchar(20);
        select member_type into lowest_membership_type from Membership where min_travels_to_acheive<1 order by min_travels_to_acheive limit 1;
        SET NEW.member_type=lowest_membership_type; -- update Member set member_type=lowest_membership_type where email=NEW.email;
	END $$
DELIMITER ;


-- ============================= SAMPLE DATA ===========================

insert into Membership values("New","New Member",1,0);
insert into Membership values("Frequent","Usually do travels",5,3);
insert into Membership values("Gold","Always do travels",9,5);

insert into User values ("mashkarharis@gmail.com","Admin","32250170a0dca92d53ec9624f336ca24");
insert into Admin values("mashkarharis@gmail.com","Sri Lanka","981821505V","Ashkar MHM",23,"house1,street2,city3",0767489525,null);

insert into User values ("abcsilva@gmail.com","Admin","32250170a0dca92d53ec9624f336ca24");
insert into Admin values("abcsilva@gmail.com","UK","981821506V","Silva ABC",22,"house1,street2,city3",0767481525,null);

insert into User values ("kamalperera@gmail.com","Member","32250170a0dca92d53ec9624f336ca24");
insert into Member values("kamalperera@gmail.com","Russia","181822505V",null,"Kamal Perera",28,"house1,street2,city3",0767909525,null);

insert into User values ("davidjones@gmail.com","Member","32250170a0dca92d53ec9624f336ca24");
insert into Member values("davidjones@gmail.com","USA","12331506V",null,"David Jones",32,"house1,street2,city3",0767481115,null);

insert into Class values("Economy","Usual Travels");
insert into Class values("Bussiness","Bussiness Travels");

insert into Airport values("CMD",5,2.3454,3.2312,"Sri Lanka","Katunayaka","Main Airport in Sri Lanaka");
insert into Airport values("HAM",3,1.3454,5.2312,"Sri Lanka","Hamabantota","Secondary Airport in Sri Lanaka");
insert into Airport values("SAR",10,4.3454,1.2312,"Dubai","Sharjah","A popular Airport");

insert into Plane values("A-2123",2,"Boyeing","021021202","2021-02-02","Red");
insert into Plane values("B-2132",4,"AirBus","02112122","2020-12-02","Blue");

insert into Seat(type,pname,seat_no) values("Economy","A-2123",1);
insert into Seat(type,pname,seat_no) values("Economy","A-2123",3);
insert into Seat(type,pname,seat_no) values("Bussiness","A-2123",2);
insert into Seat(type,pname,seat_no) values("Bussiness","A-2123",4);

insert into Seat(type,pname,seat_no) values("Economy","B-2132",1);
insert into Seat(type,pname,seat_no) values("Economy","B-2132",3);
insert into Seat(type,pname,seat_no) values("Bussiness","B-2132",2);

insert into Route(dept_a_id,arrive_a_id,description,length) values("CMD","HAM","Colombo to Hambantota",12000);
insert into Route(dept_a_id,arrive_a_id,description,length) values("CMD","SAR","Colombo to Sarjah",92000);
insert into Route(dept_a_id,arrive_a_id,description,length) values("HAM","SAR","Hambantota to Sarjah",112000);

insert into Schedule(description,arrival_time,departure_time) values ("Morning Flight","2021-02-12 08:15:00","2021-02-12 18:15:00");
insert into Schedule(description,arrival_time,departure_time) values ("Evening Flight","2021-03-12 13:15:00","2021-03-12 21:15:00");
insert into Schedule(description,arrival_time,departure_time) values ("Night Flight","2021-04-12 18:15:00","2021-04-13 01:15:00");

insert into Flight(pname,s_id,r_id) values("A-2123",1,3);
insert into Flight(pname,s_id,r_id) values("A-2123",3,2);
insert into Flight(pname,s_id,r_id) values("B-2132",2,1);

insert into Price values(1,"Economy",130000);
insert into Price values(1,"Bussiness",230000);

insert into Price values(2,"Economy",150000);
insert into Price values(2,"Bussiness",220000);

insert into Price values(3,"Economy",80000);
insert into Price values(3,"Bussiness",100000);

insert into Book(book_id,email,f_id,seat_id,time_date,paid) values (UNIX_TIMESTAMP()*100+1*10+2,"davidjones@gmail.com",1,2,"2021-02-15 10:30:00",10000.00);
select * from Book;
insert into Book(book_id,email,f_id,seat_id,time_date,paid) values (UNIX_TIMESTAMP()*100+2*10+1,"kamalperera@gmail.com",2,1,"2021-02-10 12:30:00",20000.00);
select * from Book;
insert into Book(book_id,email,f_id,seat_id,time_date,paid) values (UNIX_TIMESTAMP()*100+3*10+2,"davidjones@gmail.com",3,2,"2021-02-15 10:30:00",30000.00);
select * from Book;
insert into Book(book_id,email,f_id,seat_id,time_date,paid) values (UNIX_TIMESTAMP()*100+2*10+1,"davidjones@gmail.com",2,1,"2021-02-10 12:30:00",40000.00);

-- Guest + Book

select * from User;
select * from Member;
select * from Admin;
select * from Airport;
select * from Schedule;
Select email,book_id,f_id,time_date,type,pname,seat_id,seat_no from Book left join Seat using(seat_id);
select distinct f_id from Flight;
-- Select (book_id,f_id,time_date,type,pname,seat_id,seat_no) from Book left join Seat using(seat_id);

select * from Book;
select * from Seat;
select pname from Flight where f_id=1;
select * from Price where f_id=1 and type="Economy" limit 1;
select * from Seat where pname in (select pname from Flight where f_id=1) and type="Economy" and seat_id not in (select seat_id from Book where f_id=1);