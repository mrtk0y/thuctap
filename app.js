const express = require('express');         // da cai
const mongoose = require('mongoose');       // da cai
const session = require('express-session'); // da cai 
const MongoStore = require('connect-mongo')(session);
const app = express();

// Mongo connection
mongoose.connect('mongodb://localhost:27017/weather1');
let db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error'));

// Dùng Sessions để theo dõi logins
app.use(session({
  secret:'Its me',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

//  Làm user ID thành 1 templates
app.use( function (request,response, next){
  response.locals.currentUser= request.session.userID;
  next();
});

// Parse data
app.use(express.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Route
const mainRoutes = require('./routes');
const weatherRoutes = require('./routes/weather.js');

app.use(mainRoutes);
app.use('/weather', weatherRoutes);

// bắt sự kiện lỗi 404 và chuyển cho error handler
app.use(function(request, response, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, request, response, next) {
  response.status(err.status || 500);
  response.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, () => {
  console.log('Sever is running now at port 3000');
});