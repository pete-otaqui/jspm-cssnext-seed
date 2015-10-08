#!/usr/bin/env node

/*eslint-env node */
var useref = require('node-useref');
var fs = require('fs');

var path = './';
var htmlSrc = 'index-src.html';
var htmlOut = 'index.html';

var htmlString = fs.readFileSync(path + htmlSrc, 'utf-8');

var parsedHtmlObject = useref(htmlString);
var parsedHtml = parsedHtmlObject[0];

fs.writeFileSync(path + htmlOut, parsedHtml, 'utf-8');
