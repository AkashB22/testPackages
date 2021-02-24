const { createReadStream, createWriteStream } = require('fs');
const { AsyncParser } = require('json2csv');
 
const fields = ['carModel', 'price', 'color'];
const opts = { fields };
const transformOpts = { highWaterMark: 8192 };
 
// Using the promise API
// const input = createReadStream(inputPath, { encoding: 'utf8' });
// const asyncParser = new AsyncParser(opts, transformOpts);
// const parsingProcessor = asyncParser.fromInput(input);
 
// parsingProcessor.promise()
//   .then(csv => console.log(csv))
//   .catch(err => console.error(err));
 
// Using the promise API just to know when the process finnish
// but not actually load the CSV in memory
const inputPath = "./input.json";
const outputPath = './out.csv';
const input = createReadStream(inputPath, { encoding: 'utf8' });
const output = createWriteStream(outputPath, { encoding: 'utf8' });
const asyncParser = new AsyncParser(opts, transformOpts);
const parsingProcessor = asyncParser.fromInput(input).toOutput(output);
 
parsingProcessor.promise(false).catch(err => console.error(err));