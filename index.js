"use strict";

var request = require('request');


module.exports = function herokuSelfPing(url, interval) {
  var isHeroku = require("is-heroku");
  if(!url || !isHeroku) {
    return false;
  }

  if(!interval) {
    interval = 45 * 1000 * 60;
  }

  return setInterval(function() {
    request(url, function () {});
  }, interval);
};
