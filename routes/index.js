var express = require('express');
var router = express.Router();
var path = require('path');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(path.resolve('public/views/index'), { title: 'Express@?' });
});


module.exports = router;