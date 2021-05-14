let fs = require('fs');
let lodash = require('lodash');
function unZip(inDir, outDir, callback) {
    try {
         const unzip = require("unzipper"),
         unzipStream = unzip.Extract({ "path": outDir });
         unzipStream.on('error', (err)=> { 
             return callback(err, null); 
         });
         const readStream = fs.createReadStream(inDir);
         readStream.on('error', (err)=> { 
             return callback(err, null); 
         });
         //Extract the ZIP file(s) 
         readStream.pipe(unzipStream).on('close', () => {
             const fileList = readExtract(outDir),
                 iscontainZip = lodash.find(fileList, (file)=> { return /\.(zip|ZIP)$/.test(file); });
             if(iscontainZip) {
                 unZip(iscontainZip, outDir, callback);
                 //deleted ZIP file
                //  rm.fs.unlink(iscontainZip, (err)=> {
                //      if(err) return callback(err, null);
                //  });
             }else{
                 return callback(null, fileList);
             }
         });            
    } catch (error) {
         console.log({ level: "error", data: error });
         return callback(error, null);
    }
 }

function readExtract(dir, filelist) {
    try {
        const files = fs.readdirSync(dir);
        filelist = filelist || [];
        files.forEach(item => {
            if (fs.statSync(dir + '/' + item).isDirectory()) {
                filelist = readExtract(dir + '/' + item, filelist);
            }
            else {
                filelist.push(dir + '/' + item);
            }
        }, this);         
        return filelist;
    } catch (error) {
        return filelist;
    }
}

 unZip('d:/javascript/test/unzip/coverage.zip', 'd:/javascript/test/unzip/coverage', (error, result)=>{
     console.log(error);
     console.log(result);
 })