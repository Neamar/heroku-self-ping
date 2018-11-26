import * as assert from 'assert'
import herokuSelfPing from './../src/index'

describe("Heroku self ping", () => {
  it("should skip when URL is not defined", () => {

    const output = herokuSelfPing(null, {
      logger: text => {
        assert.strictEqual(text, 'heroku-self-ping: no url provided. Exiting.')
      }
    })
    assert.ok(!output);
  });

  it("should skip when not on Heroku", () => {
    const output = herokuSelfPing("http://mypp.herokuapp.com", {
      logger: text => {
        assert.strictEqual(text, 'heroku-self-ping: heroku not detected. Exiting.')
      }
    })
    assert.ok(!output);
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

  it('check if interval is ticking and logs correct message on Heroku', async () => {
    // Fake an Heroku env
    process.env.HEROKU = 'true';
    // Dirty hack to force a reload of "is-heroku" module,
    // else we're stuck with the previously cached value
    delete require.cache[require.resolve('is-heroku')];
    
    const INTERVAL = 2 // ms
    const URL = "http://mypp.herokuapp.com"
    const expectedLogOutput = `heroku-self-ping: Sending heartbeat to ${URL}`

    const interval = herokuSelfPing(URL, {
      interval: INTERVAL,
      logger: text => {
        assert.strictEqual(text, expectedLogOutput)
      }
    }) as NodeJS.Timeout
    assert.ok(interval);

    // Wait for 5 ticks, check if logged output is correct
    await new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 5 * INTERVAL)
    })
    // Cleanup
    delete process.env.HEROKU;
    clearInterval(interval);
  });
});
