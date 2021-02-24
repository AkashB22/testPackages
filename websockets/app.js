const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const fs = require('fs');
const mime = require('mime');

app.use(cors());

app.get('*', (req, res) => {
    console.log("called base url");
    res.json({
        "businessEntity" : [{
            "entityData": {
                "isActive": true
            }
        }]
    });
});

io.on('connection', (socket) => {
    console.log('a user connected');
        socket.on('join', (data) => {
            // joining
            socket.join(data.room);
            console.log(`${data.user} joined the room ${data.room}`);
            socket.broadcast.to(data.room).emit('new user joined', { user: data.user, message: 'has joined this room' });
        });

        socket.on('leave', (data) => {
            // leave
            console.log(`${data.user} left the room ${data.room}`);
            socket.broadcast.to(data.room).emit('left room', { user: data.user, message: 'left this room' });

            socket.leave(data.room)
        });

        socket.on('message', (data) => {
            io.in(data.room).emit('new message', { user: data.user, message: data.message });
        });

        let files = {},
            struct = {
                name: null,
                type: null,
                size: 0,
                data: [],
                slice: 0
            };
        socket.on('sliceUpload', (result) => {
            const fileName = result.fileData["fileName"];
            let fileDataBuffer = result.fileData.data;
            if(!files[fileName]){
                files[fileName] = Object.assign({}, struct, result.fileData);
                files[fileName].data = [];
            }
            fileDataBuffer = Buffer.from(new Uint8Array(fileDataBuffer));
            files[fileName].data.push(fileDataBuffer);
            files[fileName].slice++;
            if(files[fileName].slice * 10000 >= result.fileData.size){
                let fileBuffer = Buffer.concat(files[fileName].data);
                fs.writeFile(`./temp-dir/${fileName}`, fileBuffer, (err)=>{
                    delete files[fileName];
                    if(err) return socket.emit('upload error');
                    socket.emit('uploaded successfully');
                })
            } else{
                socket.emit('next slice upload', {currentSlice : files[fileName].slice})
            }
        });

        socket.on('sendFile', ({fileName}) => {
            let readStream = fs.createReadStream(`./temp-dir/${fileName}`, {encoding: 'binary'}),
                chunks = [];
            
            readStream.on('data', (data)=>{
                chunks.push(data);
                socket.emit('getImageChunks', {type: mime.getType(`./temp-dir/${fileName}`), chunks: chunks.join('')});
            });

            readStream.on('end', ()=>{
                console.log('image loaded');
            })
        });

        socket.on('disconnect', (data)=>{
            console.log('disconnected');
        })
});


server.listen(8000, (err)=>{
    if(err) console.log(err)
    else console.log("node server running in 8000")
})

process.on('uncaughtException', error=>{
    console.log(error);
})