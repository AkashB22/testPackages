const express = require('express')
const app = express()
const formidable = require('formidable')
const request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var mimeType = require('mime');
var fs = require('fs');
var axios = require('axios');
let keepAlive = require('agentkeepalive');
const path = require('path');
const i18n = require('i18n');
const crypto = require('crypto');

/**
 * configure shared state
 */
i18n.configure({
    locales: ['en_US', 'de_DE'],
    "defaultLocale": "en_US",
    directory: path.join(__dirname, '/locales')
});

app.use(i18n.init);

// app.use(cors({
//     origin: 'http://localhost:3001',
//     credentials: true,
//     exposedHeaders: ['Content-Type', 'Content-Disposition', 'filename']
// }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/submit-form', (req, res) => {
    console.log("called");
    const x = request.post("http://localhost:3001/products/upload", (err, result) => {
        if (err) return res.status(500).json({ err });
        return res.status(200).json({ "backendResp": JSON.parse(result.body) })
    })

    req.pipe(x);
    // x.pipe(res)
})

app.use(express.static(path.join(__dirname, 'public')));

const NodeClam = require('clamscan');

// clamscan module configs
// const ClamScan = new NodeClam().init({
//     debug_mode: true,
//     scan_recursively: false,
//     clamdscan: {
//         socket: false, // Socket file for connecting via TCP
//         host: false, // IP of host to connect to TCP interface
//         port: false, // Port of host to use when connecting via TCP interface
//         timeout: 60000, // Timeout for scanning files
//         local_fallback: false, // Do no fail over to binary-method of scanning
//         path: 'C:/Users/akash.b/Downloads/clamav/clamdscan.exe', // Path to the clamdscan binary on your server
//         config_file: null, // Specify config file if it's in an unusual place
//     },
//     preference: 'clamdscan'
// });

// // Scan file using clamscan module 
// function scanFile(filePath) {
//     return ClamScan
//         .then(async clamscan => {
//             const { is_infected, viruses } = await clamscan.scan_file(filePath);

//             if (is_infected) {
//                 console.log(`The file is INFECTED with ${viruses}`);
//                 throw new Error('ERR_FILE_SCAN_INFECTED');
//             } else {
//                 return 'CLEAN';
//             }
//         }).catch(err => {
//             throw new Error(err);
//         });
// }

app.get('/getDetails', (req, res) => {
    // axios({
    //         method: 'POST',
    //         url: "https://reqres.in/api/users",
    //         data: req.body,
    //         httpsAgent: new keepAlive.HttpsAgent({
    //             maxSockets: 100,
    //             maxFreeSockets: 10,
    //             timeout: 60000, // active socket keepalive for 60 seconds
    //             freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
    //         }),
    //         header: req.headers
    //     })
    //     .then(x => {
    //         return res.status(200).json({ getDetails: x.data });
    //     })
    //     .catch(x => {
    //         return res.status(400).json({ error: x.toJSON() })
    //     })
    const language = req.headers.language || "en_US";
    req.setLocale(language);
    return res.status(200).json({ getDetails: true, message: req.__('hello_msg_1') });
})

app.get('/:id/getDetails', (req, res) => {
    const id = req.params.id;
    return res.status(200).json({ getDetails: true, id });
})

app.post('/upload', (req, res) => {
    try {
        console.log("upload api called");
        const form = formidable({ multiples: true, uploadDir: "./imagePath" });

        form.on('fileBegin', function (name, file) {
            //rename the incoming file to the file's name
            const fileName = (file.name !== "" || file.name !== null) ? file.name : name || "default";
            file.path = form.uploadDir + "/" + fileName;
        })

        form.on('error', function (err) {
            console.log("an error has occured with form upload");
            console.log(err);
            // request.resume();
        });

        form.on('aborted', function (err) {
            console.log("user aborted upload");
        });

        form.on('end', function () {
            console.log('-> upload done');
        });
        form.parse(req, (error, fields, files) => {
            // res.writeHead(200, { 'content-type': 'application/json', keepExtensions: true });
            if (error) return res.json({ error })
            else res.json({ fields, files, "status": "uploaded successfully" });
        });
    } catch (error) {
        return res.send(error)
    }
})

// Add sub-routes
app.post("/encrypt", (req, res) => {
    try {
        console.log("api called");
        const form = formidable({ multiples: true, uploadDir: path.join(`${__dirname}/imagePath`) });

        form.on('fileBegin', function (name, file) {
            //rename the incoming file to the file's name
            const fileName = (file.name !== "" || file.name !== null) ? file.name : name || "default";
            file.path = form.uploadDir + "/" + fileName;
        })

        form.onPart = (part) => {
            if (part.mime) {
                const stream = fs.createWriteStream(path.join(`${__dirname}/encoded/${part.filename}`));
                req.filename = part.filename;
                part.on('data', (buffer) => {
                    const cipher = crypto.createCipheriv('aes256', "qwertyuiopasdfghqwertyuiopasdfgh", "qwertyuiopasdfgh");
                    let encrypted = cipher.update(buffer);
                    encrypted = Buffer.concat([encrypted, cipher.final()])
                    stream.write(encrypted);
                });
                part.on('end', () => {
                    stream.end();
                    console.log("file encryption done");
                });
            } else {
                form.handlePart(part);
            }
        };

        form.parse(req, (error, fields, files) => {
            // res.writeHead(200, { 'content-type': 'application/json', keepExtensions: true });
            if (error) return res.json({ error })
            else {
                // const readStream = fs.createReadStream(path.join(`${files['file'].path}`)),
                // writeStream = fs.createWriteStream(path.join(`${__dirname}/encoded/${files['file'].name}`)),
                // cipher = crypto.createCipheriv('aes256', "qwertyuiopasdfghqwertyuiopasdfgh", "qwertyuiopasdfgh");
                // readStream.pipe(cipher).pipe(writeStream)
                // .on('finish', ()=>{
                //     res.json({ fields, files, "status": "uploaded successfully with encryption" });
                // })
                return res.json({ fields, filename: req.filename, "status": "uploaded successfully with encryption" });
            }
        });
    } catch (error) {
        return res.send(error)
    }
});

app.get("/decrypt", (req, res) => {
    const filename = req.headers['filename'] || "(4).jpg"
    const readStream = fs.createReadStream(path.join(`${__dirname}/encoded/${filename}`)),
        // writeStream = fs.createWriteStream(path.join(`${__dirname}/encoded/${files['file'].name}`)),
        decipher = crypto.createDecipheriv('aes256', "qwertyuiopasdfghqwertyuiopasdfgh", "qwertyuiopasdfgh");
    res.setHeader('Content-Type', mimeType.getType(`./imagePath/${filename}`));
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('filename', `${filename}`);
    readStream.pipe(decipher).pipe(res);
    // fileStream.pipe(res);
});

app.get('/download', (req, res) => {
    try {
        console.log("download called");
        const fileStream = fs.createReadStream('./imagePath/testImage.jpg');
        res.setHeader('Content-Type', mimeType.getType('./imagePath/testImage.jpg'));
        res.setHeader('Content-Disposition', `attachment; filename="testImage.jpg"`);
        res.setHeader('filename', 'testImage.jpg');
        res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, filename, Content-Type')
        fileStream.pipe(res);
    } catch (error) {
        return res.send(error)
    }
});

app.get('/downloadStreamOne', (req, res) => {
    try {
        console.log("download stream called");
        const fileData = fs.readFileSync('./imagePath/SampleJPGImage_20mbmb (1).jpg');
        console.log("file data read");
        res.writeHead(200, { 'Content-Type': mimeType.getType('./imagePath/SampleJPGImage_20mbmb (1).jpg'), 'Content-Disposition': `attachment; filename="SampleJPGImage_20mbmb (1).jpg"` })
        console.log('res headers set');
        res.end(fileData)
        console.log('res sent');
    } catch (error) {
        return res.send(error)
    }
});

app.get('/downloadStreamTwo', (req, res) => {
    try {
        console.log("download without stream one called");
        res.sendFile(path.join(__dirname, './imagePath/SampleJPGImage_20mbmb (1).jpg'));
    } catch (error) {
        return res.send(error)
    }
});

app.get('/downloadStreamThree', (req, res) => {
    try {
        console.log("download without stream one called");
        res.download(path.join(__dirname, './imagePath/SampleJPGImage_20mbmb (1).jpg'));
    } catch (error) {
        return res.send(error)
    }
});

app.get('/downloadWithoutStream', (req, res) => {
    try {
        const fileData = fs.readFileSync('./imagePath/testImage.jpg');
        res.writeHead(200, { 'Content-Type': mimeType.getType('./imagePath/testImage.jpg'), 'Content-Disposition': `attachment; filename="testImage.jpg"` })
        res.end(fileData)
    } catch (error) {
        return res.send(error)
    }
});

// Routing
// app.post('/scan-file', async(req, res) => {
//     // req.files will contain the file details

//     try {
//         const form = formidable({ multiples: true, uploadDir: "./imagePath" });

//         form.on('fileBegin', function(name, file) {
//             //rename the incoming file to the file's name
//             const fileName = (file.name !== "" || file.name !== null) ? file.name : name || "default";
//             file.path = form.uploadDir + "/" + fileName;
//         })

//         form.on('error', function(err) {
//             console.log("an error has occured with form upload");
//             console.log(err);
//             // request.resume();
//         });

//         form.on('aborted', function(err) {
//             console.log("user aborted upload");
//         });

//         form.on('end', function() {
//             console.log('-> upload done');
//         });
//         form.parse(req, async(error, fields, files) => {
//             // res.writeHead(200, { 'content-type': 'application/json', keepExtensions: true });

//             if (error) return res.json({ error })
//             else {
//                 const avStatus = await scanFile(path.join(__dirname, `/../${files.file.path}`)); // Pass the full path of the file
//                 console.log(avStatus);
//                 res.json({ fields, files, "status": "uploaded successfully" });
//             }
//         });

//         // All OK!
//     } catch (err) {
//         console.log('Raise alarm!', err);
//     }
// });

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log("server running on " + port);
})