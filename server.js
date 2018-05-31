'use strict';
require('dotenv').config();
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var showDBRouter = require('./routes/showdb');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(showDBRouter);


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
