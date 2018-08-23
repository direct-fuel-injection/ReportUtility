# Report Utility

A Form to collect report messages from your sites. Now your users can easly send you reports and bugs.

### Installation

Install as npm package.

```sh
$ npm i report-utility
```

Install as standalone library.

```sh
$ cp ./dist/report.utility.min.js $dest
```

### Usage

Defaults 
```js
    {
        el, // selector for inject form
        url, // endpoint to send logs
        template, // html code
        minimized // compact mode
    }
```

Example ([`init` function](https://direct-fuel-injection.github.io/ReportUtility/examples/render/)):
```js
ReportUtility.config({
    el: '#container',
    minimized: false
});
ReportUtility.init();
```
### Development

Want to contribute? Great!
Open your favorite Terminal and run these commands.

Runs dev-server on http://localhost:3000 :
```sh
$ node run start
```

Tests:
```sh
$ npm test
```
#### Building
For production release:
```sh
$ npm run build
```

### Todos

 - Demo server with saving logs
 - test, test, test...

License
----

MIT

