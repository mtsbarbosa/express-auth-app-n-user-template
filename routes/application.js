var express = require('express');
var router = express.Router();
var application = require('../controllers/application');
var bcrypt = require('bcryptjs');

/* GET home page. */
router.post('/', function(req, res, next) {
  // find the user
  if(req.body
      && req.body.hasOwnProperty('name')
      && req.body.hasOwnProperty('hash_key'))
    application.save(req.body, function(err, application){
      if(err)
        res.json({ success: false, message: err });
      else {
        res.json({ success: true, message: 'Success' });
      }
    });
  else{
    res.json({ success: false, message: 'failed.' });
  }
});

module.exports = router;
