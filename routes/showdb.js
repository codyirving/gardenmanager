var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var showDBRouter = require('./routes/showdb');

//var app = express();
var router = express.Router();
const { Beds } = require('../model');

router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));


mongoose.Promise = global.Promise;


router.get('/showdb', function (req, res, next) {
  console.log("lets showdb" + JSON.stringify(Beds));
  Beds.find({}).then(bed => {
    console.log("beds:" + Beds);
    res.json({
      bed: bed.map((currentBed) => currentBed.serialize())
    });
  })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    })
});


module.exports = router;
