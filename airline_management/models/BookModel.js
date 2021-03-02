const { pool } = require('../database_manager/mysqlpool');
var BookModel = {
    addBookType: addBookType,
    updateBookType:updateBookType,
    getBookdata:getBookdata,
    remove_booking:remove_booking
}

function addBookType(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("INSERT INTO book VALUES(?,?,?,?,?);",array, function (error, rows, fields) {
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

function updateBookType(array) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            }
            conn.query("UPDATE book set u_id=?,f_id=?,type=?,time_date=? where book_id=?",array, function (error, rows, fields) {
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

function remove_booking(booking_id){

    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err || conn.state === "disconnected") {
                reject("Database Error");
            } 
            conn.query("call removebooking(?)",[booking_id], function (error, rows, fields) {
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
module.exports=BookModel;
