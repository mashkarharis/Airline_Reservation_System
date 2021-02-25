var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var session = require('express-session');



var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admins');
var memberRouter = require('./routes/members');
var userRouter=require('./routes/user');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(session({secret: "dc23r2223eqd33tvssdvaWeees"}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



var expressLayouts = require("express-ejs-layouts");
app.set('layout', false);
app.use(expressLayouts);

app.use('/user/',userRouter);
app.use('/', indexRouter);
app.use('/admin/', adminRouter);
app.use('/member/', memberRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
