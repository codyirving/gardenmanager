var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var showDBRouter = require('./routes/showdb');

var app = express();
const router = express.Router();
const { Gardenbeds } = require('../public/models/gardenbeds_model');
const { Plant } = require('../public/models/plant_model');
const { Notification } = require('../public/models/notifications_model');
const { Contact } = require('../public/models/contact_model');
const { Note } = require('../public/models/note_model');
const { Media } = require('../public/models/media_model');
const { SoilLog } = require('../public/models/soilLog_model');
const { BedPosition } = require('../public/models/bedPositions_model');

router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;

router.get('/showdb', function (req, res, next) {
  console.log("lets showdb: " + JSON.stringify(Gardenbeds));
  Gardenbeds.find({}).then(beds => {
    console.log("beds:" + Gardenbeds);
    res.json({
      beds: beds.map((currentBed) => currentBed.serialize())
    });
  })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get('/bedpositions/:id', function(req,res) {
  Gardenbeds.findOne({"bedNumber":`${req.params.id}`}).then(
    bed => {
      res.json(
        bed.bedPositions
      );
    }).catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get('/gardeners', function(req,res) {
  Gardenbeds.find({}).then(
    beds => {
      res.json(
        beds.map((bed)=>bed.getOwner())
      );
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.post('/notifications/:id', jsonParser, (req,res) => {
  const requiredFields = ['message'];
  console.log("REQ BODY: " + JSON.stringify(req.body));

  let quit = false;

  for(let i = 0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      //return not breaking 
      return res.status(400).send(message);
    }
  }
  
  const notification = new Notification({"message":req.body.message});
  console.log(`Adding notification to bed \`${req.params.id}\``);
  Gardenbeds.findOneAndUpdate({"bedNumber": req.params.id}, {$push:{"notifications":notification}},
    function(error,success) {
      if(error) {
        console.log("ERROR: " + error);
        res.status(201).json(error);
      }else{
        console.log("SUCCESS: " + success);
        res.status(201).json(success);
      }
    }
  );

});

module.exports = router;