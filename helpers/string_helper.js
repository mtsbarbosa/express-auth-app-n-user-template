var express = require('express');

module.exports = {
  jsUcfirst: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  },
  transformUnderlineToCamelCase(string) {
    var arr = string.split("_");
    for(var i = 0; i < arr.length; i++){
      arr[i] = this.jsUcfirst(arr[i]);
    }
    return arr.join("");
  },
  containsAtLeastOne(text,arr_strings){
    var contains = false;
    arr_strings.forEach(function(str){
      if(text.indexOf(str) > -1)
        contains = true;
    });
    return contains;
  }

}
