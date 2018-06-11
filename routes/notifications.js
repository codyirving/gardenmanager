var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { Gardenbeds } = require('../public/models/gardenbeds_model');
const { Notification } = require('../public/models/notifications_model');
//get notifications for a bed
router.get('/bed/:id/notifications/', jsonParser, (req, res) => {
    Gardenbeds.findOne({ "bedNumber": `${req.params.id}` }).then(
      bed => {
        res.json(
          bed.getBedNotifications()
        );
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });
//add new notification to bed
router.post('/bed/:id/notifications/', jsonParser, (req, res) => {
    const requiredFields = ['message'];
    console.log("REQ BODY: " + JSON.stringify(req.body));
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
    const notification = new Notification({ "message": req.body.message });
    console.log(`Adding notification to bed \`${req.body.bednumber}\``);
    Gardenbeds.findOneAndUpdate({ "bedNumber": req.params.id }, { $push: { "notifications": notification } },
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
router.delete('/bed/:bedNumber/notifications/:id', jsonParser, (req,res) => {
  Gardenbeds.update({"bedNumber":req.params.bedNumber}, { $pull: {"notifications":{"_id":
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