const path = require('path');
const express = require('express')

const util = require('util');
const fs = require('fs')
let tempSave = {};
let tempSaveFirst = {};
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const public = path.join(__dirname, 'static');

// viewed at http://localhost:8080
app.get('/second', function (req, res) {
  res.sendFile(path.join(public, 'index.html'));
});
app.get('/', function (req, res) {
  res.sendFile(path.join(public, 'indexFirst.html'));
});
app.post('/saveResults', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  tempSave[req.body.user] = req.body.selection;
  console.log(req.body);

});
app.post('/saveResultsFirst', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  tempSaveFirst[req.body.user] = req.body.selection;
  console.log(req.body);

});
app.post('/getResult', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(` getResult:${req.body}`);
  // res.send('Hello World!')
  if (tempSave[req.body.user]) {
    res.json(tempSave[req.body.user])
  }
  else {
    res.json(null)
  }


});
app.post('/getResultFirst', function (req, res) {
  if (!req.body) return res.sendStatus(400)
  console.log(` getResultFirst:${req.body}`);
  // res.send('Hello World!')
  if (tempSaveFirst[req.body.user]) {
    res.json(tempSaveFirst[req.body.user])
  }
  else {
    res.json(null)
  }


});
app.use('/', express.static(public));
//app.get('/', (req, res) => res.send('Hello World!'))
setInterval(() => {
  fs.writeFileSync('./data/first.json', JSON.stringify(tempSaveFirst), 'utf-8')
  fs.writeFileSync('./data/second.json', JSON.stringify(tempSave), 'utf-8')
  console.log('file saved');
}, 5000)
app.listen(3001, () => {
  tempSave = JSON.parse(fs.readFileSync('./data/first.json'));
  tempSaveFirst = JSON.parse(fs.readFileSync('./data/second.json'));
  console.log('Example app listening on port 3001!')
})