"use strict";

var request = require('request');


module.exports = function herokuSelfPing(url, options) {
  if(!options) {
    options = {};
  }

  options.interval = options.interval || 20 * 1000 * 60;
  options.logger = options.logger || console.log;
  options.verbose = options.verbose || false;

  var isHeroku = require("is-heroku");

  if(!url) {
    options.verbose && options.logger("heroku-self-ping: no url provided. Exiting.");
    return false;
  }
  if(!isHeroku) {
    options.verbose && options.logger("heroku-self-ping: heroku not detected. Exiting.");

    return false;
  }


  options.verbose && options.logger("heroku-self-ping: Setting up hearbeat to " + url + " every " + options.interval + "ms.");

  return setInterval(function() {
    options.logger("heroku-self-ping: Sending hearbeat to " + url);
    request(url, function () {});
  }, options.interval);
};
