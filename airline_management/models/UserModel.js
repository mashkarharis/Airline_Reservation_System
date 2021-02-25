const { pool } = require('../database_manager/mysqlpool');
var UserModel = {
    getAllNIC: getAllNIC,
    get_user_data: get_user_data,
    register_user: register_user,
    get_user_data_by_email: get_user_data_by_email,
    update_user:update_user
}

function getAllNIC() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
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

function get_user_data_by_email(email) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("select * from all_member_public_data where email=?", [email], function (error, rows, fields) {
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





function get_user_data(email, password) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("call get_user_data(?,?);", [email, password], function (error, rows, fields) {
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



function update_user(data) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("update Member set address=? , phone_number=? where email=?",data, function (error, rows, fields) {
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

function register_user(data, privilege) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.beginTransaction(function (err) {
                if (err) { reject(err); }
                conn.query('INSERT INTO User values(?,?,?)', privilege, function (err, result) {
                    if (err) {
                        conn.rollback(function () {
                            reject(err);
                        });
                    }
                    else {
                        console.log("First Success");
                        conn.query('INSERT INTO Member values(?,?,?,?,?,?,?,?,?)', data, function (err, result) {
                            if (err) {
                                conn.rollback(function () {
                                    reject(err);
                                });
                            }
                            else {
                                console.log("Second Success");
                                conn.commit(function (err) {
                                    if (err) {
                                        conn.rollback(function () {
                                            reject(err)
                                        });
                                    }
                                    console.log('Transaction Complete.');
                                    conn.end();
                                    resolve("Success");
                                });
                            }
                        })
                    }
                });
            });
        })
    });
}
module.exports = UserModel;