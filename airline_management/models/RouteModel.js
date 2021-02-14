const { pool } = require('../database_manager/mysqlpool');
var RouteModel = {
    addRouteType: addRouteType,
    updateRouteType:updateRouteType,
    deleteRouteType:deleteRouteType
}

function addRouteType(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("INSERT INTO route VALUES(?,?,?,?,?);",array, function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows[0]);
                }
            });            
        })
    });
}

function updateRouteType(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("UPDATE route set dept_a_id=?, arrive_a_id=? description=? length=? where r_id=?",array, function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows[0]);
                }
            });            
        })
    });
}

function deleteRouteType(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("delete from route where r_id=?",array, function (error, rows, fields) {
                conn.release();
                if (error) {
                    reject(error);
                } else {
                    resolve(rows[0]);
                }
            });            
        })
    });
}

module.exports=RouteModel;