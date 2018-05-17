'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('WebSocket Server!');
});

io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('message', (message) => {
        io.emit('message', message);
    });

});

http.listen(5000, () => {
    console.log('Server started on port 5000');
});
