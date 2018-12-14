import * as assert from 'assert';
import logger from './../src/logger';


describe("Logger", () => {
  it('should set custom logger and log messages to it', () => {
    const message = 'TEST'
    logger.setLogger(text => {
      assert.strictEqual(message, text)
    })
    logger.log(message)
  })

  it('should not log verbose if verbose is false', () => {
    const message = 'TEST'
    logger.setIsVerbose(false)
    logger.setLogger(text => {
      throw 'This should never be called'
    })
    logger.verbose(message)
  })

  it('should log verbose when verbose is true', () => {
    const message = 'TEST'
    logger.setIsVerbose(true)
    logger.setLogger(text => {
      assert.strictEqual(text, message)
    })
    logger.verbose(message)
  })

})
