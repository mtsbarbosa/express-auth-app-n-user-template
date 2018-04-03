var express = require('express');
var router = express.Router();
var application = require('../controllers/application');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../config');
var sessions = require('../sessions');

/* GET home page. */
router.post('/', function(req, res, next) {
  // find the user
  application.findOne({
    name: req.body.name
  }, function(err, application) {
    if (err) throw err;

    if (!application) {
      res.json({ success: false, message: 'Authentication failed.' });
    } else if (application) {
      if(process.env.NODE_ENV === 'test'){
          if(req.body.hash_key === application.hash_key){
            const payload = {
              root: application.root
            };
            var token = jwt.sign(payload, config.secret, {
              expiresIn: 1440 // expires in 24 hours
            });
            sessions.all[token] = {
              application: application,
              date: new Date()
            };
            res.json({
              success: true,
              message: 'The token for your application is here',
              token: token
            });
          }else{
            res.json({ success: false, message: 'Authentication failed.' });
          }
      }else{
        // check if password matches
        bcrypt.compare(req.body.hash_key, application.hash_key,function(err,hash_res) {
            if(hash_res == true){
              // if user is found and password is right
              // create a token with only our given payload
              // we don't want to pass in the entire user since that has the password
              const payload = {
                root: application.root
              };
              var token = jwt.sign(payload, config.secret, {
                expiresIn: 1440 // expires in 24 hours
              });
              sessions.all[token] = {
                application: application,
                date: new Date()
              };
              // return the information including token as JSON
              res.json({
                success: true,
                message: 'The token for your application is here',
                token: token
              });
            }else{
              res.json({ success: false, message: 'Authentication failed.' });
            }
        });
      }
    }
  });
});

module.exports = router;
