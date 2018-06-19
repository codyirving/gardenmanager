var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { Gardenbeds } = require('../public/models/gardenbeds_model');
const { SoilLog } = require('../public/models/soilLog_model');
//get notifications for a bed
router.get('/bed/:id/soilLog/', jsonParser, (req, res) => {
    Gardenbeds.findOne({ "bedNumber": `${req.params.id}` }).then(
      bed => {
        res.json(
          bed.getBedSoilLog()
        );
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });

//add new notification to bed
router.post('/bed/:id/soilLog/', jsonParser, (req, res) => {
  const requiredFields = ['action'];
  console.log("REQ BODY: " + JSON.stringify(req.body));
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const soilLog = new SoilLog({ "message": req.body.message });
  console.log(`Adding notification to bed \`${req.body.bednumber}\``);
  Gardenbeds.findOneAndUpdate({ "bedNumber": req.params.id }, { $push: { "soilLog": soilLog } },
    function (error, success) {
      if (error) {
        console.log("ERROR: " + error);
        res.status(201).json(error);
      } else if (success) {
        console.log("SUCCESS: " + success);
        res.status(201).json({success:true});
      } else {
        res.status(201).json({success:false});
      }
    }
  );

});

/* POST update to notification details */
router.post('/bed/:id/soilLog/', jsonParser, (req, res) => {
  let found = false;

  const requiredFields = [
    'date',
    'action'
  ];

  console.log("req.body.keys: " + Object.keys(req.body));
  //check req.body for any of required keys
  const intersected = intersect(requiredFields, Object.keys(req.body));

  console.log("Intersected: " + intersected);

 //MONGODB $set object
 let jsonSetObject = {};
 for (let i = 0; i < intersected.length; i++) {
   const field = intersected[i];
   //look for passed field to update
   console.log("if " + field + " in " + req.body);
   if ((field in req.body)) {
     //found at least one
     found = true;
     const setString = field;
     //set the key value
     jsonSetObject[setString] = req.body[field];
     console.log("JSONSETobject: " + JSON.stringify(jsonSetObject));
   }
 }
 if (!found) {
   //none!
   const message = `Missing \`${requiredFields}\` in request body`;
   console.error(message);
   return res.status(400).send(message);
 }

 Gardenbeds.findOneAndUpdate(
   { "bedNumber": req.params.id },
   { "$set": jsonSetObject },
   { "returnNewDocument": true }

 ).then(success => {
   if (success) {
     
     return res.status(201).json(success);
   } else {
     console.log("failed " + success);
     return res.status(200).json(error);
   }
 }).catch(error => {
   if (error) {
     console.log("ERROR: " + error);
     return res.status(200).json(error);
   }
   console.error(err);
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

//delete notification from bed
router.delete('/bed/:bedNumber/soilLog/:id', jsonParser, (req,res) => {
  Gardenbeds.update({"bedNumber":req.params.bedNumber}, { $pull: {"soilLog":{"_id":
  req.params.id}}},
    function(error,success) {
      if (error) {
        console.log("ERROR: " + error);
        res.status(200).json(error);
      } else if (success.nModified === 0) {
        console.log("SUCCESS: " + JSON.stringify(success));
        return res.status(404).send("Record Not found");
      } else {
        return res.status(201).send("Successfully Deleted");
      }
    }
  );
});


  module.exports = router;