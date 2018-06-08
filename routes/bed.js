var express = require('express');
var router = express.Router();
var path = require('path');


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Gardenbeds } = require('../public/models/gardenbeds_model');

//const {getBedPositions} = require('../public/javascripts/indexScripts');


/* GET all beds in garden. */
router.get('/bed/', function (req,res) {
  Gardenbeds.find({}).then(
    beds => { res.status(200).json(beds); }
  ).catch(err => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });;
});

/* GET bed page. */
router.get('/bed/:id', function (req, res) {
  const bedNumber = req.params.id;
  Gardenbeds.findOne({ "bedNumber": `${bedNumber}` }).then(
    bed => {
      res.status(200).json(bed);
      
      
      //stringify for proper pug parsing
          
      // let contact = JSON.stringify(bed.contact);
      // let soilLog = JSON.stringify(bed.soilLog);
      // let notifications = JSON.stringify(bed.notifications);
      // console.log("contact parsed: " + contact);
      // const bedPositions = JSON.stringify(bed.getBedPositions());
      // res.render(path.resolve('public/views/bed'), {
      //   bedNumber: `${bed.bedNumber}`,
      //   owner: `${bed.owner}`,
      //   length: `${bed.length}`,
      //   width: `${bed.width}`,
      //   contact: `${contact}`,
      //   bedPositions: `${bedPositions}`,
      //   notifications: `${notifications}`,
      //   soilLog: `${soilLog}`
      // });
    }
  ).catch(err => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });;
});
/* GET position information for bed. */
router.get('/bed/:id/:position1,:position2', function (req, res) {
  const bedNumber = req.params.id;
  const position1 = req.params.position1;
  const position2 = req.params.position2;
  Gardenbeds.findOne({ "bedNumber": `${bedNumber}` }).then(
    bed => {
      const bedPosition = bed.getBedPositions().bedPositions[position1][position2];
      
      res.status(200).json(bedPosition);
      
      
      // res.render(path.resolve('public/views/position'), {
      //   bedPosition: bedPosition
      // }
      // );
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

/* POST update to bed position */
router.post('/bed/:id/:pos1,:pos2', jsonParser, (req, res) => {
  let found = false;
  const requiredFields = ['startDate', 'occupied', 'plantType', 'harvestDate'];
  //console.log("REQ BODY: " + JSON.stringify(req.body));
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    //look for passed field to update
    console.log("if " + field + " in " + req.body);
    if ((field in req.body) && !found) {
      //found one
      found = true;

      console.log("cool, updating");
      
      const currentField = "req.body." + field;
      console.log("currentField: " + currentField);
      const setString = "bedPositions." + req.params.pos1 + "." + req.params.pos2 + "." + field;
      let jsonSetObject = {};
      jsonSetObject[setString] = eval(currentField);

      console.log("JSONSETobject: " + JSON.stringify(jsonSetObject));

      Gardenbeds.findOneAndUpdate(
        { "bedNumber": req.params.id },
        { "$set": jsonSetObject},
        {"returnNewDocument": true},



        function (error, success) {
          if (error) {
            console.log("ERROR: " + error);
            return res.status(201).json(error);
          } else if (success) {
            console.log("SUCCESS: " + success.bedPositions[0][0]);
            return res.status(201).json({ success: true });
          } else {
            console.log("failed " + success);
            return res.status(201).json({ success: false });
          }
        }
      ).catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });;
    }
  }

    if(!found) {
      //none!
      const message = `Missing \`${requiredFields}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  
});


module.exports = router;