var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var showDBRouter = require('./routes/showdb');

//var app = express();
const router = express.Router();
const { Gardenbeds } = require('../public/models/gardenbeds_model');
const { Plant } = require('../public/models/plant_model');
const { Notification } = require('../public/models/notifications_model');
const { Contact } = require('../public/models/contact_model');
const { Note } = require('../public/models/note_model');
const { Media } = require('../public/models/media_model');
const { SoilLog } = require('../public/models/soilLog_model');
router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));


mongoose.Promise = global.Promise;


const plant = new Plant({"commonName":"Tomato", "daysToHarvest":"70"});
const notification = new Notification({"message":"Hi there!"});
const contact = new Contact({"phoneNumber":"619-555-1234","email":"mark@mark.com","address":"123 New York St. NY NY"});
const dateAcquired = "";
const note = new Note({"content":"buy new plants"});
const media = new Media({"title":"my animated gif","URL":"http://..","notes":"from last week"});
const soilLog = new SoilLog({"action":"added new soil and chicken manure to bed and turned whole bed over"});


//WORKING DUPE KEY VALIDATOR 

const bedToAdd = new Gardenbeds({"bedNumber":"1","owner":"Mark"});

const secondBedToAdd = new Gardenbeds({"bedNumber":"15","owner":"Mark",contact,"notes":note,"media":media,"soilLog":soilLog,"notifications":notification});




// Gardenbeds.insertMany(bedToAdd,function(err) {
//   console.log("InsertError: " + err);
// });
Gardenbeds.insertMany(secondBedToAdd,function(err) {
  console.log("InsertError: " + err);
});


// Gardenbeds.findOneAndUpdate({"owner": "Cody"}, {$push:{"notifications":n}},
// function(error,success) {
//   if(error) {
//     console.log("pushERROR: " + error);
//   }else{
//     console.log("pushSUCCESS: " + success);
//   }
// }
// );


// Gardenbeds.findOneAndUpdate({"owner":"Cody"}, {"bedNumber": "3"},
//   function(error,success) {
//     if(error) {
//       console.log("ERROR: " + error);
//     }else{
//       console.log("SUCCESS: " + success);
//     }
//   });





router.get('/showdb', function (req, res, next) {
  console.log("lets showdb: " + JSON.stringify(Gardenbeds));
  Gardenbeds.find({}).then(bed => {
    console.log("beds:" + Gardenbeds);
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