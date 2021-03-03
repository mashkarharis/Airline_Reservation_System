const { pool } = require('../database_manager/mysqlpool');
var AdminModel = {
    addAdmin: addAdmin,
    updateAdmin:updateAdmin,
    deleteAdmin:deleteAdmin
}

function addAdmin(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("INSERT INTO admin VALUES(?,?,?,?,?,?,?,?);",array, function (error, rows, fields) {
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

function updateAdmin(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("UPDATE admin set name=?,email=?,password=?,NIC=?,country=?,age=?,phone_enumber=?,picture=? where Ad_id=?",array, function (error, rows, fields) {
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

function deleteAdmin(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("delete from admin where Ad_id=?",array, function (error, rows, fields) {
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

module.exports=AdminModel;
