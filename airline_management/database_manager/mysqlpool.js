var config=require('../conf/default.json');
var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : config.Database.host,
    user     : config.Database.user,
    password : config.Database.password,
    database : config.Database.database
});

exports.pool = pool;

// USE ONLY POOL . QUERY()  -> get->run->release...