'use strict';

const COOLDOWN = 60;
const GAME_LENGHT = 300;

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let users = [
    { username: 'Doggo 🐶', free: true },
    { username: 'Mimi 🐭', free: true },
    { username: 'Tyro 🦖', free: true },
    { username: 'Bloup 🐠', free: true },
    { username: 'Ham-burger 🐹', free: true },
    { username: 'Boing 🐰', free: true },
    { username: 'Le Jubilant 🐴', free: true },
    { username: 'Lulu 🦄', free: true },
    { username: 'Komodo 🐲', free: true },
    { username: 'Froggy 🐸', free: true },
    { username: 'Rocco 🐷', free: true },
    { username: 'Presto 🐢', free: true },
    { username: 'Touch 🐙', free: true },
    { username: 'Neko 🐱', free: true },
    { username: 'Wally 🐳', free: true },
    { username: 'Batman 🦇', free: true },
    { username: 'Jiji 🐼', free: true }
];

let game_time = 0;
let is_game = 0;
let intervalId;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('WebSocket Server!');
});

app.get('/free', (req, res) => {
    res.send(users);
    users = users.map(user => {
        user.free = true;
        return user;
    });
});

app.get('/user', (req, res) => {
    const user = users.find(user => user.free === true);
    if (user) {
        user.free = false;

        res.json({ data: user });
        console.log(user);
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

    socket.on('free', (data) => {
        const user = users.find(user => user.username === JSON.parse(data).username);
        user.free = true;
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
