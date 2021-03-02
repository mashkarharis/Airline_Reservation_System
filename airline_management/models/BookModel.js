const { pool } = require('../database_manager/mysqlpool');
var BookModel = {
    getBookdata:getBookdata,
    remove_booking:remove_booking,
    doguestbooking:doguestbooking,
    getguestData:getguestData,
    domembooking:domembooking
}
function doguestbooking(body) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.beginTransaction(function (err) {
                if (err) { reject(err); }
                conn.query('INSERT INTO Book values(?,?,?,?,?,?)', [body.book_id,null,body.flight,body.seat_id,new Date(),body.topay], function (err, result) {
                    if (err) {
                        conn.rollback(function () {
                            reject(err);
                        });
                    }
                    else {
                        console.log("First Success");
                        conn.query('INSERT INTO Guest values(?,?,?,?,?,?,?,?)', [body.book_id,body.country,body.NIC,body.name,body.age,body.address,body.phone,null], function (err, result) {
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










function domembooking(body){
    console.log("ABC");
    console.log(body.email);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query('INSERT INTO Book values(?,?,?,?,?,?)', [body.book_id,body.email,body.flight,body.seat_id,new Date(),body.topay], function (error, rows, fields) {
                conn.release();
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });            
        })
    });
}





function getBookdata(email){
    console.log("ABC");
    console.log(email);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("select * from basic_book_data where email=?;",[email], function (error, rows, fields) {
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

function remove_booking(booking_id){

    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            } 
            conn.query("call removebooking(?)",[booking_id], function (error, rows, fields) {
                conn.release();
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(rows);
                }
            });            
        })
    });
}
function getguestData(bid){

    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            } 
            conn.query("select * from Book natural join Guest where book_id=?",[bid], function (error, rows, fields) {
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


 
module.exports=BookModel;