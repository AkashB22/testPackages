// node: v0.10.7
// express: 3.4.4
var fs = require('fs');
var express = require('express');
var mimetype = require('mime')

var app = express();
app.use(require('express-status-monitor')());
// app.post('/', function (req, res, next) {
//   req.pipe(fs.createWriteStream('./uploadFile'));
//   req.on('end', next);
// });

app.get('/:fileName/withStream', function (req, res, next) {
  let readStream = fs.createReadStream(__dirname + '/' + req.params.fileName);
  res.set({
    'Content-Type': mimetype.getType(req.params.fileName)
  });
  readStream.on('data', (data)=>{
    let buf = Buffer.from(data)
    res.write(buf, req.params.fileName);
  })
  readStream.on('end', ()=>{
    res.end();
  })
});

app.get('/:fileName/withoutStream', function (req, res, next) {
  let fileData = fs.readFileSync(__dirname + '/' + req.params.fileName);
  res.set({
    'Content-Type': mimetype.getType(req.params.fileName)
  });
  res.end(fileData);
});

app.post('*', function (req, res, next) {
  res.send("hello");
});

process.on('uncaughtException', error => {
  console.log(error);
});
app.listen(5000, ()=>{
  console.log("server running on port 5000");
});