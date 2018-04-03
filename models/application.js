// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = { schema: function(){
                              var schema =
                                (new Schema({
                                              _id:          Schema.Types.ObjectId,
                                              name:         { type: String, required: true, unique: true},
                                              description:  { type: String, required: false},
                                              hash_key:     { type: String, required: true},
                                              root:         { type: Boolean, required: true},
                                          }));

                              return schema;
                          },
                  model: function(){
                          return mongoose.model('Application');
                  }};
