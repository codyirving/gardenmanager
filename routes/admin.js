var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const router = express.Router();
const { Gardenbeds } = require('../public/models/gardenbeds_model');
// const { Plant } = require('../public/models/plant_model');
// const { Notification } = require('../public/models/notifications_model');
// const { Contact } = require('../public/models/contact_model');
// const { Note } = require('../public/models/note_model');
// const { Media } = require('../public/models/media_model');
// const { SoilLog } = require('../public/models/soilLog_model');
// const { BedPosition } = require('../public/models/bedPositions_model');


router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));


mongoose.Promise = global.Promise;


const { router: usersRouter } = require('../users');
const { router: authRouter, localStrategy, jwtStrategy } = require('../auth');


router.use('/api/users/', usersRouter);
router.use('/api/auth/', authRouter);


// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   if (req.method === 'OPTIONS') {
//     return res.send(204);
//   }
//   next();
// });

passport.use(localStrategy);
passport.use(jwtStrategy);


const jwtAuth = passport.authenticate('jwt', { session: false });

// A protected endpoint which needs a valid JWT to access it
router.get('/admintest/', jwtAuth, (req, res) => {


    return res.json({
        data: 'rosebud'
    });
});


router.get('/admin/login', function (req, res, next) {

    res.render('login.html');

});




router.get('/admin/dashboard/', function (req, res, next) {
    console.log("reqcooks: " + JSON.stringify(req.cookies));
    let token = req.cookies.authToken;
    console.log("TOKEN from cookie: " + token);
    try{
        let decoded = jwt.verify(token, 'testsecrettest');
        console.log("Decoded token:  " + JSON.stringify(decoded));
        res.render('admin.html');
    }catch (err) {
        res.render('login.html');

    }


});

router.get('/admin/notifications/:id', function (req,res,next) {
    let token = req.cookies.authToken;
    console.log("TOKEN from cookie: " + token);
    try{
        let decoded = jwt.verify(token, 'testsecrettest');
        console.log("Decoded token:  " + JSON.stringify(decoded));
        res.render('notifications.html', {bedNumber:req.params.id});
    
    }catch (err) {
        res.render('login.html');

    }

});

router.get('/admin/notes/:id', function (req,res,next) {
    let token = req.cookies.authToken;
    console.log("TOKEN from cookie: " + token);
    try{
        let decoded = jwt.verify(token, 'testsecrettest');
        console.log("Decoded token:  " + JSON.stringify(decoded));
        res.render('notes.html', {bedNumber:req.params.id});
    
    }catch (err) {
        res.render('login.html');

    }

});
















//!shows all db info -- dangerous
router.get('/showdb', function (req, res, next) {


    console.log("lets showdb: " + JSON.stringify(Gardenbeds));
    Gardenbeds.find({}).then(beds => {
        console.log("beds:" + Gardenbeds);

        res.json(beds);



    })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        });
});

module.exports = router;