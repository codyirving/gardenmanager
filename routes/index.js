var express = require('express');
var router = express.Router();
var path = require('path');



/* GET home page. */
router.get('/gardener/:id', function(req, res, next) {
  res.render('garden.html', {bedNumber:req.params.id});
});



router.get('/', function(req, res, next) {
  res.render('index.html');
});





/* GET position edit page. */
router.get('/gardener/:id/edit/:posX,:posY', function(req, res, next) {
  console.log("gettine edit page");
  res.render('edit.html', {bedNumber:req.params.id, posX:req.params.posX, posY:req.params.posY});
});

module.exports = router;