'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.send('WebSocket Server!');
});

io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('progress', (progress) => {
        io.emit('progress', progress);
    });

});

http.listen(5000, () => {
    console.log('Server started on port 5000');
});
