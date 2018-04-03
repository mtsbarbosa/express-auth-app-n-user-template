var config = require('../config');
var sessions = require('../sessions');
var string_helper = require('../helpers/string_helper');

module.exports = function(req, res, next) {
  if(string_helper.containsAtLeastOne(req.originalUrl,
        ['/status',
        '/transition',
        '/workflow'])){
          if(typeof(req.locals) == 'undefined'){
            req.locals = {};
          }
          if(!req.session.application.root){
              req.locals.application = req.session.application._id;
          }else{
            if(typeof(req.params) != 'undefined'){
              if(req.headers.hasOwnProperty('application_id')){
                req.locals.application = req.headers.application_id;
              }else{
                req.locals.application = req.session.application._id;
              }
            } else if(typeof(req.body) != 'undefined'){
              if(req.body.hasOwnProperty('application')){
                req.locals.application = req.body.application._id;
              }else{
                req.locals.application = req.session.application._id;
              }
            }
          }
  }
  next();
};
