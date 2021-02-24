let JSZip = require('jszip');
var zip = new JSZip();
 
zip.file("Hello.txt", "Hello World\n");
zip.generateNodeStream({type:"nodebuffer", streamFiles:true}).pipe(require('fs').createWriteStream('./test.zip'))
    .on('finish', ()=>{
        console.log("zip file created");
    })