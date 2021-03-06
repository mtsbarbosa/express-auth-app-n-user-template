var config = require('../config');
var jwt = require('jsonwebtoken');
var sessions = require('../sessions');

module.exports = function(req, res, next) {
  if(req.originalUrl == '/express-auth-app-n-user-template/authenticate'
      || req.originalUrl == '/express-auth-app-n-user-template/user/authenticate')
    return next();
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var me_token = req.body.me || req.query.me || req.headers['me'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        req.session = sessions.application[token];
        next();
      }
    });

  } else if (me_token) {

    jwt.verify(me_token, config.secret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        req.session = sessions.user[me_token];
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
};
