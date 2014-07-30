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

  it('should set an interval on Heroku', function() {
    // Fake an Heroku env
    process.env.HEROKU = true;
    // Dirty hack to force a reload of "is-heroku" module,
    // else we're stuck with the previously cached value
    delete require.cache[require.resolve('is-heroku')];

    assert.ok(herokuSelfPing("http://mypp.herokuapp.com"));
    delete process.env.HEROKU;
  });
});
