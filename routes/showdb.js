var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



const router = express.Router();
const { Gardenbeds } = require('../public/models/gardenbeds_model');



router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));


mongoose.Promise = global.Promise;



//get matrix of bed positions
router.get('/bed/:id/positions', function (req, res) {
  Gardenbeds.findOne({ "bedNumber": `${req.params.id}` }).then(
    bed => {
      res.json(
        bed.bedPositions
      );
    }).catch(err => {
      //console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
//get all garden bed owners
router.get('/gardeners', function (req, res) {
  Gardenbeds.find({}).then(
    beds => {
      res.json(
        beds.map((bed) => bed.getOwner())
      );
    })
    .catch(err => {
      //console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});
router.get('/bedinfo/:id', function (req, res) {
  Gardenbeds.findOne({ "bedNumber": `${req.params.id}` }).then(
    bed => {
      res.json(
        bed.getAllBedInfo()
      );
    })
    .catch(err => {
      //console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});




module.exports = router;