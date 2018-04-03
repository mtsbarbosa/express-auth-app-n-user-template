var filter = require('filter-properties');

module.exports = {
  ParamNotFoundError: class ParamNotFoundError extends require('./error').ExtendableError {
    constructor(property_names) {
      super(property_names.toString() + " is mandatory");
    }
  },
  isArray: function(o){
    return typeof(o) !== 'undefined' && Object.prototype.toString.call(o) === '[object Array]';
  },
  extract: function(object, arr_mandatory, arr_allowed){
    var extracted;
    if(this.isArray(arr_allowed) && arr_allowed != null && arr_allowed.length > 0){
      extracted = filter(arr_allowed, object);
      if(this.isArray(arr_mandatory) && arr_mandatory != null && arr_mandatory.length > 0){
          var arr_params_not_set = [];
          for(var i = 0; i < arr_mandatory.length; i++){
            if(!extracted.hasOwnProperty(arr_mandatory[i])){
                arr_params_not_set.push(arr_mandatory[i]);
            }
          }
          if(arr_params_not_set.length > 0)
            throw new this.ParamNotFoundError(arr_params_not_set);
      }
    }
    return extracted;
  }
};
