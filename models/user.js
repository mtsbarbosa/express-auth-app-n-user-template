// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = { schema: function(){
                              var schema =
                                (new Schema({
                                              _id:          Schema.Types.ObjectId,
                                              name:         { type: String, required: true},
                                              email:        { type: String, required: true, unique: true},
                                              password:     { type: String, required: true},
                                              active:       { type: Boolean, required: true},
                                              is_master:    { type: Boolean, required: true},
                                              applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }],
                                          }));

                              return schema;
                          },
                  model: function(){
                          return mongoose.model('User');
                  }};
