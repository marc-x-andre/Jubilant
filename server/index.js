'use strict';

const COOLDOWN = 60;
const GAME_LENGHT = 300;

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let users = [];
let game_time = 0;
let is_game = 0;
let intervalId;

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

    if (intervalId === undefined) {
        intervalId = setInterval(() => {
            if (game_time > 0) {
                game_time--;
            } else {
                if (is_game) {
                    game_time = GAME_LENGHT;
                    is_game = false;
                } else {
                    game_time = COOLDOWN;
                    is_game = true;
                }
            }
            io.emit('time', { game_time: game_time, is_game: is_game });
        }, 1000);
    }

});

http.listen(5000, () => {
    console.log('Server started on port 5000');
});
