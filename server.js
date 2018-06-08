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
let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

app.use(showDBRouter);
app.use(bedRouter);
app.use(indexRouter);
app.use(notificationsRouter);

mongoose.Promise = global.Promise;
const { PORT, DATABASE_URL } = require('./config');

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
