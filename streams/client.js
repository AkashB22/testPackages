// node: v0.10.21
// request: 2.27.0
var request = require('request');
var fs = require('fs');

var r = request.get("http://localhost:5000/temp.mp4");
// See http://nodejs.org/api/stream.html#stream_new_stream_readable_options
// for more information about the highWaterMark
// Basically, this will make the stream emit smaller chunks of data (ie. more precise upload state)
var upload = fs.createReadStream('temp.mp4', { highWaterMark: 500 });

upload.pipe(r);

var upload_progress = 0;
upload.on("data", function (chunk) {
  upload_progress += chunk.length
  console.log(new Date(), upload_progress);
})

upload.on("end", function (res) {
  console.log('Finished');
})