const { pool } = require('../database_manager/mysqlpool');
var PlaneModel = {
    getPlaneData:getPlaneData,
    getAirportData:getAirportData,
    getFlightData:getFlightData,
    getFlightID:getFlightID,
    getFlightClasses:getFlightClasses,
    getFlightSeats:getFlightSeats,
    getFlightPrice:getFlightPrice
}

function getPlaneData(){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("select * from Plane;", function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });            
        })
    });
}

function getFlightPrice(id,classed){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("select * from Price where f_id=? and type=? limit 1;",[id,classed], function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {

                    resolve(rows);
                }
            });            
        })
    });
}


function getFlightClasses(id){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            //console.log(id);
            conn.query("select type from Flight_Data where f_id=?;",[id], function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });            
        })
    });
}

function getFlightSeats(id,classed){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            //console.log(id);
            conn.query("select * from Seat where pname in (select pname from Flight where f_id=?) and type=? and seat_no not in (select seat_id from Book where f_id=?);",[id,classed,id], function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });            
        })
    });
}

function getFlightData(){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("select * from Flight_Data;", function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });            
        })
    });
}
function getFlightID(){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("select distinct f_id from Flight where not_departured(f_id) order by (f_id);", function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });            
        })
    });
}

function getAirportData(){
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("select * from Airport;", function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows);
                }
            });            
        })
    });
}

module.exports=PlaneModel;