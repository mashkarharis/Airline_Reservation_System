const { pool } = require('../database_manager/mysqlpool');
var PlaneModel = {
    getPlaneData:getPlaneData,
    getAirportData:getAirportData,
    getFlightData:getFlightData,
    getFlightID:getFlightID
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