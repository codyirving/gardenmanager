'use strict';
require('dotenv').config();
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



let showDBRouter = require('./routes/showdb');
let bedRouter = require('./routes/bed');
let indexRouter = require('./routes/index');
let notificationsRouter = require('./routes/notifications');
let notesRouter = require('./routes/notes');
let soilLogRouter = require('./routes/soillogs');
let adminRouter = require('./routes/admin');
const passport = require('passport');
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('views', path.join(__dirname, './public/views'));
app.use(express.static(path.join(__dirname, './public')));

app.engine('html', require('ejs').renderFile);


app.use(showDBRouter);
app.use(bedRouter);
app.use(indexRouter);
app.use(notificationsRouter);
app.use(notesRouter);
app.use(soilLogRouter);
app.use(adminRouter);

mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');


const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');


app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);




passport.use(localStrategy);
passport.use(jwtStrategy);


const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});


let server;

function runServer(databaseUrl, port = PORT) {
  
  return new Promise((resolve, reject) => {
    
    mongoose.connect(databaseUrl, err => {
      if (err) {
        console.log("error in runserver db connect");
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          console.log("runServer error: " + err);
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  console.log("require.main === module");
  runServer(DATABASE_URL).catch(err => console.error(err));
}
module.exports = {app, closeServer, runServer};
