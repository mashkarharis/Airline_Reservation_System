const { pool } = require('../database_manager/mysqlpool');
var ScheduleModel = {
    addScheduleType: addScheduleType,
    updateScheduleType:updateScheduleType,
    deleteScheduleType:deleteScheduleType
}

function addScheduleType(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("INSERT INTO schedule VALUES(?,?,?,?);",array, function (error, rows, fields) {
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

function updateScheduleType(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("UPDATE schedule set description=?, arrival_time=?, departure_time=? where s_id=?",array, function (error, rows, fields) {
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

function deleteScheduleType(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("delete from schedule where s_id=?",array, function (error, rows, fields) {
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

module.exports=ScheduleModel;