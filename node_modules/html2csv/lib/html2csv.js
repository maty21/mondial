var cheerio = require('cheerio');
var stringify = require('csv-stringify');
var stringifyOpts = {delimiter: ','};

var async = require('async');

module.exports = {
  tableToCSV,
  htmlToCSVs
}

function tableToCSV(table, callback) {
  var $ = cheerio.load(table);
  var $rows = $('tr:has(td, th)');

  var db = [];
  $rows.each(function (i, row) {
      var $cols = $(this).find('td, th');
      var db_row = [];

      $cols.each(function (j, col) {
        db_row[j] = $(this).text();
      });

      db[i] = db_row;
  });

  var csv = "";
  stringify(db, stringifyOpts, function(err, output) {
    if (err) return callback(err);
    callback(null, output);
  });
}

function htmlToCSVs(html, callback) {
  var $ = cheerio.load(html);
  var $tables = $('table');

  var csvs = [];
  async.forEach($tables, function (table, done) {

    $table = $(table);

    tableToCSV($table.get(), function (err, csv) {
      if (err) return done(err);
      csvs.push(csv);
      done();
    });

  }, function (err) {
    if (err) return next(err);
    callback(null, csvs);
  });
}
