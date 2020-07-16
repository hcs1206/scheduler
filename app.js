var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/user');
var eventsRouter = require('./routes/event');
var sequelize = require('./models');

var app = express();
sequelize.sequelize.sync();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/events', eventsRouter);

app.get('/', (req,res) => {
  res.render('main', {
    userId: req.cookies.userId,
    err: req.body.err
  });
});

module.exports = app;
