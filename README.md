# build-info-webpack-plugin
在html文件中自动引入一段打印‘打包相关信息’的js代码

## Install

```sh
git clone <url>
```
or
```sh
yarn add build-info-webpack-plugin --dev
```
or
```sh
npm i add build-info-webpack-plugin -D
```
*Note: this package requires html-webpack-plugin*

## Usage
webpack.config.js
```js
//const BuildInfoWebpackPlugin = require('../build-info-webpack-plugin/src')
const BuildInfoWebpackPlugin = require("build-info-webpack-plugin");
module.export = {
  //...
  plugins: [
    //...
    new BuildInfoWebpackPlugin(),
  ],
}

```

## Result
index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
    <title>Title</title>
</head>
<body>
<script type="text/javascript" src="./buildInfo.js?1598968103253"></script>
</body>
</html>
```
buildInfo.js

```javascript
(function () {
  console.log({
    'buildTime': '2020-09-01 21:48:23',
    'buildOS': 'Windows_NT',
    'git': {
      'commitId': '93642a6a9f8a57f184c2711370c6e9af36b33853',
      'userName': 'BeliefRC',
      'email': 'beliefrc@outlook.com',
      'commitDate': '2019-08-02 10:14:8',
      'commitMessage': 'init',
    },
  })
})()

```
## Options

```js

```

# License

MIT
