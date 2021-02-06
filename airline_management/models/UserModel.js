const { pool } = require('../database_manager/mysqlpool');
var UserModel = {
    getAllNIC: getAllNIC
}

function getAllNIC() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Server Error");
            }
            conn.query("select NIC from User;", function (error, rows, fields) {
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

module.exports=UserModel;