const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const iconv = require('iconv-lite');


app.use(cors());
app.get('/', (req, res)=>{
	res.send("root")
})

app.post('/', (req, res)=>{
	console.log("called");
	res.status(200).json({data: "req received"})
})

app.get('/home', (req, res)=>{
	fs.readFile('./sample.jpeg', (err, file)=>{
		let json = JSON.stringify(file);
		console.log(json);
		console.log("file length =====", file.length);
		const strFile = file.toString();
		const fileBuffer = Buffer.from(strFile, 'binary');
		console.log("fileBuffer length =====", fileBuffer.length);
		const options = {
			'Content-Type': "application/jpeg; charset=utf8",
			'Content-Length': file.length,
			'Content-Disposition': "attachment; charset=utf-8; filename=sample.jpeg"
		};
		res.writeHead(200, options);
		res.end(file);
	})
})
app.get('/title', (req, res)=>{
	res.send("title")
})
app.get('/other', (req, res)=>{
	res.send("other")
})

module.exports = app;