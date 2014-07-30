Heroku self ping
================

To avoid the one-hour time limit on your dyno, use this npm module:

```js
require('heroku-self-ping')("http://your-app-url");
```

This will register a timer self-pinging your app every 45 minutes.

This timer will only activate when your app is running on Heroku platform. The script is a no-op on any other environment, including local and CI.

`your-app-url` can be any URL to access your app -- an `herokuapp.com` subdomain or any custom domain defined with your app.

> Heroku doesn't allow an app to retrieve its current name, which is why you need to specify the URL.
> You can set a custom env variable, for instance `heroku config:set APP_URL http://yourapp.herokuapp.com` and access it later from `process.env.APP_URL`.
