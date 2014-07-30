"use strict";

var assert = require("assert");

var herokuSelfPing = require('./index.js');


describe("Heroku self ping", function() {
  it("should skip when URL is not defined", function() {
    assert.ok(!herokuSelfPing());
  });

  it("should skip when not on Heroku", function() {
    assert.ok(!herokuSelfPing("http://mypp.herokuapp.com"));
  });
});
