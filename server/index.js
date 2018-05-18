'use strict';

const COOLDOWN = 60;
const GAME_LENGHT = 300;

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let users = [
    { username: 'Doggo 🐶', progress: 0, free: true },
    { username: 'Mimi 🐭', progress: 0, free: true },
    { username: 'Tyro 🦖', progress: 0, free: true },
    { username: 'Bloup 🐠', progress: 0, free: true },
    { username: 'Ham-burger 🐹', progress: 0, free: true },
    { username: 'Boing 🐰', progress: 0, free: true },
    { username: 'Le Jubilant 🐴', progress: 0, free: true },
    { username: 'Lulu 🦄', progress: 0, free: true },
    { username: 'Komodo 🐲', progress: 0, free: true },
    { username: 'Froggy 🐸', progress: 0, free: true },
    { username: 'Rocco 🐷', progress: 0, free: true },
    { username: 'Presto 🐢', progress: 0, free: true },
    { username: 'Touch 🐙', progress: 0, free: true },
    { username: 'Neko 🐱', progress: 0, free: true },
    { username: 'Wally 🐳', progress: 0, free: true },
    { username: 'Batman 🦇', progress: 0, free: true },
    { username: 'Jiji 🐼', progress: 0, free: true }
];

let game_time = 0;
let is_game = 0;
let intervalId;

app.get('/', (req, res) => {
    res.send('WebSocket Server!');
});

app.get('/free', (req, res) => {
    users = users.map(user => {
        user.free = true;
        return user;
    });
    res.send('Kidou');
});


app.get('/user', (req, res) => {
    const user = users.find(user => user.free === true);
    if (user) {
        user.free = false;
        res.json({ data: user });
    } else {
        res.json({ error: 'no_more_user' });
    }
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
                    io.emit('progress', []);
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
