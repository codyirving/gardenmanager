var express = require('express');
var router = express.Router();
var path = require('path');



/* GET home page. */
router.get('/gtest/:id', function(req, res, next) {
  res.render('garden.html', {bedNumber:req.params.id});
});


module.exports = router;