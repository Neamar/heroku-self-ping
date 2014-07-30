"use strict";

var isHeroku = require("is-heroku");


module.exports = function herokuSelfPing(url) {
  if(!url || !isHeroku) {
    return false;
  }

}
