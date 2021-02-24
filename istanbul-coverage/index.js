// var im = require('istanbul-middleware'),
//     isCoverageEnabled = true; // or a mechanism of your choice

// //before your code is require()-ed, hook the loader for coverage
// if (isCoverageEnabled) {
//     console.log('Hook loader for coverage - ensure this is not production!');
//     im.hookLoader(__dirname);
//         // cover all files except under node_modules
//         // see API for other options
// }

// now require the rest of your code
var express = require('express'),
    axios = require('axios'),
    cookieParser = require('cookie-parser'),
    app = express();

// set up basic middleware
// ...

// add the coverage handler
// if (isCoverageEnabled) {
//     //enable coverage endpoints under /coverage
//     app.use('/coverage', im.createHandler());
// }

//add your router and other endpoints
//...
app.use(cookieParser());
app.get('/shtCheck', (req, res, next)=>{
    const cookie = Object.keys(req.cookies);
    axios.get('http://localhost:3001/a/sht/helpcontents/dewdrops_home_page/getDetails', {"headers": {"cookie":cookie[0]+"="+req.cookies[cookie[0]]}})
        .then(response=>{
            axios.get('http://localhost:3001/u/sht/tagcontents/20.4.2.58/download')
                .then(result=>{
                    res.end();
                })
                .catch(error=>{
                    console.log("inside"+ error);
                })
        })
        .catch(error=>{
            console.log(error);
        })
})

app.use('/', require('./server'));
  
  app.listen(3006)