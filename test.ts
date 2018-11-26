import * as assert from 'assert'
import herokuSelfPing from './index'

describe("Heroku self ping", () => {
  it("should skip when URL is not defined", () => {
    assert.ok(!herokuSelfPing());
  });

  it("should skip when not on Heroku", () => {
    assert.ok(!herokuSelfPing("http://mypp.herokuapp.com"));
  });

  it('should set an interval on Heroku', () => {
    // Fake an Heroku env
    process.env.HEROKU = 'true';
    // Dirty hack to force a reload of "is-heroku" module,
    // else we're stuck with the previously cached value
    delete require.cache[require.resolve('is-heroku')];

    const interval = herokuSelfPing("http://mypp.herokuapp.com") as NodeJS.Timeout
    assert.ok(interval);

    // Cleanup
    delete process.env.HEROKU;
    clearInterval(interval);
  });
});
