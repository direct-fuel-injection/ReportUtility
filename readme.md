# Report Utility

Form to collect report messages from your sites. Now your users can easly send you reports and bugs.
Use it as:
  - React Component;
  - standalone library.

### Installation

ReportUtility requires React v16 to run.

Install as npm package.

```sh
$ npm i report-utility
```

Install as standalone library.

```sh
$ cp ./dist/standalone/report.utility.min.js $dest
```
### Usage

As React Component, see examples([React](https://direct-fuel-injection.github.io/ReportUtility/examples/react/)):
```js
<ReportUtility url="http://localhost:3000" minimized={false} />
```
As standalone library, see examples([`render` function](https://direct-fuel-injection.github.io/ReportUtility/examples/render/)):
```js
ReportUtility.render(document.getElementById('container'), {
	url: 'http://localhost:3000/',
	minimized: false
});
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
Generating examples:
```sh
$ npm run examples
```

### Todos

 - Demo server with saving logs
 - test, test, test...

License
----

MIT

