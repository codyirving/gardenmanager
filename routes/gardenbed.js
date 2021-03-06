var express = require('express');
var router = express.Router();
var path = require('path');


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { Gardenbeds } = require('../public/models/gardenbeds_model');


/* GET all beds in garden. */
router.get('/gardenbed/', function (req, res) {
  Gardenbeds.find({}).then(
    beds => { res.status(200).json(beds); }
  ).catch(err => {
    //console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });;
});

/* GET bed information. */
router.get('/gardenbed/:id', function (req, res) {
  const bedNumber = req.params.id;
  Gardenbeds.findOne({ "bedNumber": `${bedNumber}` }).then(
    bed => {
      res.status(200).json(bed);


    }
  ).catch(err => {
    //console.error(err);
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

    })
    .catch(err => {
      //console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

/* POST update to bed position */
router.post('/bed/:id/:pos1,:pos2', jsonParser, (req, res) => {
  let found = false;

  const requiredFields = ['startDate', 'occupied', 'plantType', 'harvestDate'];

  //console.log("req.body.keys: " + Object.keys(req.body));
  //check req.body for any of required keys
  const intersected = intersect(requiredFields, Object.keys(req.body));
  //console.log("Intersected: " + intersected);
  //MONGODB $set object
  let jsonSetObject = {};
  for (let i = 0; i < intersected.length; i++) {
    const field = intersected[i];
    //look for passed field to update
    //console.log("if " + field + " in " + req.body);
    if ((field in req.body)) {
      //found at least one
      found = true;
      const setString = "bedPositions." + req.params.pos1 + "." + req.params.pos2 + "." + field;
      //set the key value
      jsonSetObject[setString] = req.body[field];
      //console.log("JSONSETobject: " + JSON.stringify(jsonSetObject));

    }
  }
  if (!found) {
    //none!
    const message = `Missing \`${requiredFields}\` in request body`;
    //console.error(message);
    return res.status(400).send(message);
  }


  Gardenbeds.findOneAndUpdate(
    { "bedNumber": req.params.id },
    { "$set": jsonSetObject },
    { "returnNewDocument": true }

  ).then(success => {
    if (success) {
      //console.log("SUCCESS: " + success.bedPositions[0][0]);
      return res.status(201).json(success);
    } else {
      //console.log("failed " + success);
      return res.status(200).json(error);
    }
  }).catch(error => {

    if (error) {
      //console.log("ERROR: " + error);
      return res.status(200).json(error);
    }

    //console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });




});
/* POST update to bed details */
router.post('/bed/:id/', jsonParser, (req, res) => {
  let found = false;

  const requiredFields = [
    'length',
    'width',
    'bedNumber',
    'owner',
    'contact',
    'notes',
    'dateAcquired'
  ];

  //console.log("req.body.keys: " + Object.keys(req.body));
  //check req.body for any of required keys
  const intersected = intersect(requiredFields, Object.keys(req.body));

  //console.log("Intersected: " + intersected);

 //MONGODB $set object
 let jsonSetObject = {};
 for (let i = 0; i < intersected.length; i++) {
   const field = intersected[i];
   //look for passed field to update
   //console.log("if " + field + " in " + req.body);
   if ((field in req.body)) {
     //found at least one
     found = true;
     const setString = field;
     //set the key value
     jsonSetObject[setString] = req.body[field];
     //console.log("JSONSETobject: " + JSON.stringify(jsonSetObject));
   }
 }
 if (!found) {
   //none!
   const message = `Missing \`${requiredFields}\` in request body`;
   //console.error(message);
   return res.status(400).send(message);
 }

 Gardenbeds.findOneAndUpdate(
   { "bedNumber": req.params.id },
   { "$set": jsonSetObject },
   { "returnNewDocument": true }

 ).then(success => {
   if (success) {
     //console.log("SUCCESS: " + success.bedPositions[0][0]);
     return res.status(201).json(success);
   } else {
     //console.log("failed " + success);
     return res.status(200).json(error);
   }
 }).catch(error => {
   if (error) {
     //console.log("ERROR: " + error);
     return res.status(200).json(error);
   }
   //console.error(err);
   res.status(500).json({ message: "Internal server error" });
 });


});




function intersect(a, b) {
  var t;
  if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
  return a.filter(function (e) {
    return b.indexOf(e) > -1;
  });
}




module.exports = router;