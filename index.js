"use strict";

var request = require('request');


module.exports = function herokuSelfPing(url) {
  var isHeroku = require("is-heroku");
  if(!url || !isHeroku) {
    return false;
  }

  return setInterval(function() {
    request(url, function () {});
  }, 45000);
};
