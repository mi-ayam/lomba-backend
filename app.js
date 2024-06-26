var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileupload = require('express-fileupload')
const cors = require('cors')

var indexRouter = require('./routes/index');
var competitionsRouter = require('./routes/competitions')
var userRouter = require('./routes/users')
var registrationRouter = require('./routes/registration')
var authRouter = require('./routes/auth')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload())

const corsOptions = {
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
    allowedHeaders: 'Content-Type,Authorization',
  };

app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/competitions', competitionsRouter)
app.use('/users', userRouter)
app.use('/registration', registrationRouter)
app.use('/auth', authRouter)

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
