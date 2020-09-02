'use strict';

const os=require('os');
const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');
const version = require('safe-require')(
  'html-webpack-plugin/package.json').version;
const { compareVersion, formatDate, getGitInfo } = require('./utils');

class BuildInfoWebpackPlugin {
  constructor (options = {}) {
    this.options = { filename: 'buildInfo', ...options };
  }
  apply (compiler) {
    const filename = this.options.filename;
    const fullFileName = `./${filename}.js`;
    //生成资源到 output 目录之前。https://www.webpackjs.com/api/compiler-hooks/#emit
    compiler.hooks.emit.tap('BuildInfoWebpackPlugin',
      (compilation) => {
        const buildInfo = {
          buildTime: formatDate(new Date()),
          buildOS: os.type(),
        };
        const gitInfo = getGitInfo();
        if (gitInfo) buildInfo.git = gitInfo;
        const jsStr = `(function(){console.log(${JSON.stringify(buildInfo)})})()`;
        compilation.assets[fullFileName] = {
          source () {
            return jsStr
          },
          size () {
            return jsStr.length
          },
        };
      });
    //编译(compilation)创建之后，执行插件。https://www.webpackjs.com/api/compiler-hooks/#compilation
    compiler.hooks.compilation.tap('BuildInfoWebpackPlugin',
      (compilation) => {
        const addScript = (data, callback) => {
          data.assets.js.push(`${fullFileName}?${Date.now()}`);
          callback && callback(null, data);
        };
        const versionDiff = compareVersion(version, '4.0.0');
        // https://github.com/jantimon/html-webpack-plugin/blob/master/CHANGELOG.md#breaking-changes
        //html-webpack-钩子函数示意图 https://github.com/jantimon/html-webpack-plugin#events
        // 4.0.0 (2020-03-23)
        if (versionDiff >= 0) {
          HtmlWebpackPlugin.getHooks(compilation).
            beforeAssetTagGeneration.
            tapAsync('BuildInfoWebpackPlugin', addScript);
        } else {
          //V4之前的版本
          compilation.plugin('html-webpack-plugin-before-html-processing',
            addScript);
        }
      });
  }
}

module.exports = BuildInfoWebpackPlugin;
