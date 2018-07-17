var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const router = express.Router();



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
    //console.log("reqcooks: " + JSON.stringify(req.cookies));
    let token = req.cookies.authToken;
    //console.log("TOKEN from cookie: " + token);
    try{
        let decoded = jwt.verify(token, JWT_SECRET);

        res.render('admin.html');
    }catch (err) {
        res.render('login.html');

    }


});

router.get('/admin/notifications/:id', function (req,res,next) {
    let token = req.cookies.authToken;
    //console.log("TOKEN from cookie: " + token);
    try{
        let decoded = jwt.verify(token, JWT_SECRET);
        //console.log("Decoded token:  " + JSON.stringify(decoded));
        res.render('notifications.html', {bedNumber:req.params.id});
    
    }catch (err) {
        res.render('login.html');

    }

});

router.get('/admin/notes/:id', function (req,res,next) {
    let token = req.cookies.authToken;
    //console.log("TOKEN from cookie: " + token);
    try{
        let decoded = jwt.verify(token, JWT_SECRET);
        //console.log("Decoded token:  " + JSON.stringify(decoded));
        res.render('notes.html', {bedNumber:req.params.id});
    
    }catch (err) {
        res.render('login.html');

    }

});

module.exports = router;