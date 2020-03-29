import * as request from 'superagent';
import logger from './logger'

interface IOptions {
  interval?: number,
  logger?: (arg: string) => any,
  verbose?: boolean
}

export default (url?: string, options: IOptions = {}): boolean | NodeJS.Timeout => {

  if (!url) {
    options.verbose && options.logger("heroku-self-ping: no url provided. Exiting.");
    return false;
  }

  options.interval = options.interval || 20 * 1000 * 60;
  logger.setLogger(options.logger || console.log)
  logger.setIsVerbose(options.verbose || false)

  const isHeroku = require('is-heroku')

  if (!isHeroku) {
    logger.verbose("heroku-self-ping: heroku not detected. Exiting.")
    return false;
  }
  logger.verbose(`heroku-self-ping: Setting up heartbeat to ${url} every ${options.interval} ms.`)

  return setInterval(() => {
    logger.log(`heroku-self-ping: Sending heartbeat to ${url}`);

    request.get(url);
  }, options.interval);
};
