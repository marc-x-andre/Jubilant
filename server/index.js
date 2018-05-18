'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


let users = [];

app.get('/', (req, res) => {
    res.send('WebSocket Server!');
});

io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (data) => {
        io.emit('message', data);
    });

    socket.on('progress', (data) => {
        io.emit('progress', data);
    });

});

function addUser(username) {
    users.forEach(user => {
        if (user.username === username) {
            return;
        }
    });
    const newUser = { username: username, progress: 0 };
    users.push(newUser);
}

http.listen(5000, () => {
    console.log('Server started on port 5000');
});
