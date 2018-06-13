var fs = require('fs');
var path = require('path');
var expect = require('chai').expect;

var html2csv = require('../../lib/html2csv');

describe('html2csv', function() {
  describe('#tableToCVS', function() {
    context('when given a single HTML table', function() {

      var result;
      before(function() {
        html2csv.tableToCSV("<table><tr><td>one</td><td>two</td></tr></table>", function(err, csv) {
          result = csv;
        });
      });

      it('returns the correct CSV', function() {
        expect(result).to.equal("one,two\n");
      });
    });
  });

  describe('#htmlToCSVs', function() {
    context('when given a HTML two tables', function() {

      var result = [];
      var firstCSV = "";
      var secondCSV = "";

      before(function() {
        var htmlFixture = path.join(__dirname, '..', 'fixtures', 'input.html');
        var html = fs.readFileSync(htmlFixture).toString();

        var firstCSVFixture = path.join(__dirname, '..', 'fixtures', '1.csv');
        firstCSV = fs.readFileSync(firstCSVFixture).toString();

        var secondCSVFixture = path.join(__dirname, '..', 'fixtures', '2.csv');
        secondCSV = fs.readFileSync(secondCSVFixture).toString();

        html2csv.htmlToCSVs(html, function(err, csvs) {
          result = csvs;
        });
      });

      it('returns two CSVs', function() {
        expect(result.length).to.equal(2);
      });

      it('first CSV matches', function() {
        expect(result[0]).to.equal(firstCSV);
      });

      it('second CSV matches', function() {
        expect(result[1]).to.equal(secondCSV);
      });

    });
  });

});
