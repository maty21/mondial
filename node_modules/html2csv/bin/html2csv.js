#!/usr/bin/env node
var fs = require('fs');
var program = require('commander');

var html2csv = require('../lib/html2csv');

program
  .description('Read HTML and creates one CSV file for every table')
  .action(toCSV);

program.parse(process.argv);

// Actions ---------------------------------

function toCSV(filename) {
  var html = fs.readFileSync(filename).toString().trim();

  html2csv.htmlToCSVs(html, function(err, csvs) {
    if (err) return console.error(err);

    csvs.forEach(function (csv, i) {
      fs.writeFileSync(pad2(i + 1) + '.csv', csv);
    });
  });
}

function pad2(number) {
   return (number < 10 ? '0' : '') + number
}
