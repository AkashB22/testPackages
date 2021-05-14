let Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// Instantiate a Mocha instance.
let mocha = new Mocha({
    ui: 'bdd',
    reporter: 'list'
});

let testDir = './'

// // Add each .js file to the mocha instance
// fs.readdirSync(testDir).filter(function(file) {
//     // Only keep the .js files
//     return file.substr(-3) === '.js';

// }).forEach(function(file) {
//     mocha.addFile(
//         path.join(testDir, file)
//     );
// });

mocha.addFile(path.join(testDir, 'sinonTest.js'))

// Run the tests.
mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
});