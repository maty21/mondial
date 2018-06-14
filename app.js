const path = require('path');
const express = require('express')
const device = require('express-device');
const teams= {
  saudiarabia:"saudiarabia",
  russia:'russia',
  egypt:'egypt',
  uruguay:'uruguay',
  morocco:'morocco',
  iran:'iran',
  portugal:'portugal',
  spain:'spain',
  france:'france',
  australia:'australia',
  argentina:'argentina',
  iceland:'iceland',
  peru:'peru',
  denmark:'denmark',
  croatia:'croatia',
  nigeria:'nigeria',
  costarica:'costarica',
  serbia:'serbia',
  germany:'germany',
  mexico:'mexico',
  brazil:'brazil',
  switzerland:'switzerland',
  sweden:'sweden',
  korea:'korea',
  belgium:'belgium',
  panama:'panama',
  tunisia:'tunisia',
  england:'england',
  colombia:'colombia',
  japan:'japan',
  poland:'poland',
  senegal:'senegal'
}
const util = require('util');
const fs = require('fs')
const {csvGenerator,htmlGenerator,htmlTransGenerator,htmlTransGeneratorMobile} = require('./csvGenerator')
let tempSave = {};
let tempSaveFirst = {};
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(device.capture());
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
  if(req.body.user=='Xresult'){
    tempSaveFirst[req.body.user] = req.body.selection;
    return res.sendStatus(200)
  }else{
    return res.sendStatus(400)
  }

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

app.get('/generateCsv',(req,res)=>{
  res.setHeader('Content-disposition', 'attachment; filename=' + 'res.csv');
  res.setHeader('Content-type', '');
  res.send(csvGenerator('./data/first.json'))
})
app.get(`/result`,(req,res)=>{
  if(req.device.type=='desktop'){
    let result =htmlTransGenerator('./data/first.json')
    res.send(result)
  }
  else {
    let result =htmlTransGeneratorMobile('./data/first.json')
    res.send(result)
  }
})
app.get(`/resultOld`,(req,res)=>{
  let result =htmlGenerator('./data/first.json')
  res.send(result)
 //s res.send(`result will be publish after bet ending `)
})
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
  tempSaveFirst = JSON.parse(fs.readFileSync('./data/first.json'));
  tempSave = JSON.parse(fs.readFileSync('./data/second.json'));
  console.log('Example app listening on port 3001!')
})