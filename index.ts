import * as request from 'request'

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
  options.logger = options.logger || console.log;
  options.verbose = options.verbose || false;

  const isHeroku = require('is-heroku')

  if (!isHeroku) {
    options.verbose && options.logger("heroku-self-ping: heroku not detected. Exiting.");

    return false;
  }

  options.verbose && options.logger(`heroku-self-ping: Setting up heartbeat to ${url} every ${options.interval} ms.`);

  return setInterval(() => {
    options.logger(`heroku-self-ping: Sending heartbeat to ${url}`);
    request(url, function () { });
  }, options.interval);
};
