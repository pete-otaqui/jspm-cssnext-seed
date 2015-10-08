#!/usr/bin/env node

/*eslint-env node */
var fs = require("fs");
var cssnext = require("cssnext");

var path = './styles/';
var mainCssFile = 'main.css';
var bundleCssFile = 'bundle.css';

var input = fs.readFileSync(path + mainCssFile, "utf8");

var output = cssnext(input, {
  from: path + mainCssFile,
  to: path + bundleCssFile,
  compress: false,
  map: {inline: false}
});

//  {css: "{css string}", map: {sourcemap object}}

fs.writeFileSync(path + bundleCssFile, output.css);
fs.writeFileSync(path + bundleCssFile + '.map', output.map);
