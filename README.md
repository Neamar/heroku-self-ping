Heroku self ping
================

To avoid the one-hour time limit on your dyno, use this npm module:

```js
require('heroku-self-ping')("http://your-app-url");
```

This will register a timer self-pinging your app every 20 minutes.

This timer will only activate when your app is running on Heroku platform. The script is a no-op on any other environment, including local and CI.

## Parameters
* `your-app-url` can be any URL to access your app -- an `herokuapp.com` subdomain or any custom domain defined with your app.

> Heroku doesn't allow an app to retrieve its current name, which is why you need to manually specify the URL.

*  `options`, optional object with the following keys:
    * `interval` number of ms between two heartbeats calls. Default to `20 * 60 * 1000` (20 minutes).
    * `logger` function to use for logging. Default to `console.log`
    * `verbose` send more information to logger function. Default to `false`.

## Return
The function returns an [interval id](https://developer.mozilla.org/en/docs/Web/API/window.setInterval) when running on Heroku and the URL is not falsy, and `false` in other cases.

## Usage
We recommend you set a custom env variable, for instance `heroku config:set APP_URL http://yourapp.herokuapp.com` and access it later from `process.env.APP_URL`.

The lib won't do anything when passed an empty `url`.
