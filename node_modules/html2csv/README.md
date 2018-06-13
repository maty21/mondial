# html2csv

Convert every table in an HTML to a CSV file.

## Usage

```js
{ htmlToCSVs } = require ('html2csv');

htmlToCSVs(html, function(err, csvs) {
  console.log(csvs);
});
```

## Command Line Tool

Install `html2csv` globally.

```sh
npm install html2csv -g
```

Run the conversion with an HTML file as an argument. The csv files will be created in the current directory.

```sh
html2csv input.html
```

## License

MIT
