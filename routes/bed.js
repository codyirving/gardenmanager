var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();
const { Gardenbeds } = require('../public/models/gardenbeds_model');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
let app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));


mongoose.Promise = global.Promise;


const { router: usersRouter } = require('../users');
const { router: authRouter, localStrategy, jwtStrategy } = require('../auth');
const { JWT_SECRET } = require('../config');


router.use('/api/users/', usersRouter);
router.use('/api/auth/', authRouter);



passport.use(localStrategy);
passport.use(jwtStrategy);


const jwtAuth = passport.authenticate('jwt', { session: false });



/* GET all beds in garden. */
router.get('/bed/', function (req, res) {
  Gardenbeds.find({}).then(
    beds => { res.status(200).json(beds); }
  ).catch(err => {
    //console.error(err);
    res.status(500).json({ message: "Internal server error" });
  });;
});

/* GET bed information. */
router.get('/bed/:id', function (req, res) {
  
  let found = false;
  let token = req.cookies.authToken;
  //console.log("TOKEN from cookie: " + token);
  //console.log("TOKEN from req.cookies: " + JSON.stringify(req.query));

  try {

    let decoded = jwt.verify(token, JWT_SECRET); 
    //console.log("Decoded token:  " + JSON.stringify(decoded));

  } catch (err) {
    //console.log("ERROR DECODING");
    return res.status('401').send("unauthorized");

  }

  
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


      // res.render(path.resolve('public/views/position'), {
      //   bedPosition: bedPosition
      // }
      // );
    })
    .catch(err => {
      //console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});

/* POST update to bed position */
router.post('/bed/:id/:pos1,:pos2', jsonParser, (req, res) => {
  let found = false;

  const requiredFields = ['startDate', 'occupied', 'plantType.commonName', 'harvestDate'];

  //console.log("req.body.keys: " + Object.keys(req.body));
  //check req.body for any of required keys
  const intersected = intersect(requiredFields, Object.keys(req.body));
  //console.log("Intersected: " + intersected);
  //MONGODB $set object
  let jsonSetObject = {};
  for (let i = 0; i < intersected.length; i++) {
    const field = intersected[i];
    //look for passed field to update
    ////console.log("if " + field + " in " + req.body);


    if ((field in req.body)) {

      //found at least one
      found = true;



      let setString;

      if (field === 'commonName') {
        //!  HACK?
        setString = "bedPositions." + req.params.pos1 + "." + req.params.pos2 + ".plantType." + field;
      } else {
        setString = "bedPositions." + req.params.pos1 + "." + req.params.pos2 + "." + field;
      }

      //set the key value
      jsonSetObject[setString] = req.body[field];
      //console.log("JSONSETobject: " + JSON.stringify(jsonSetObject));

      //!SET NESTED PLANT OBJECT DATA -- commonName 



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


router.post('/bed/:id/', jsonParser, (req, res, next) => {
  let found = false;
  let token = req.cookies.authToken;
  //console.log("TOKEN from cookie: " + token);
  //console.log("TOKEN from req.cookies: " + JSON.stringify(req.query));
  
  try {
  
    let decoded = jwt.verify(token, JWT_SECRET); 
    //console.log("Decoded token:  " + JSON.stringify(decoded));

  } catch (err) {
    //console.log("ERROR DECODING");
    return res.status('401').send("unauthorized");

  }
  const requiredFields = [
    'length',
    'width',
    'bedNumber',
    'owner',
    'contact',
    'notes',
    'dateAcquired',
    'address'
  ];
  //console.log("req body: " + JSON.stringify(req.body));
  //console.log("req.body.keys: " + Object.keys(req.body));
  //check req.body for any of required keys
  const intersected = intersect(requiredFields, Object.keys(req.body));

  //console.log("Intersected: " + intersected);

  //MONGODB $set object
  let jsonSetObject = {};
  for (let i = 0; i < intersected.length; i++) {
    const field = intersected[i];
    let setString;
    if ((field in req.body)) {
      //found at least one
      found = true;
      setString = field;
      //! check for fields that are nested?
      if (field === 'address') {
        //!  HACK?
        setString = "contact." + field;
      }








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
      //console.log("SUCCESS: " + success);

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