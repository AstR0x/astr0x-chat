const http = require('http');
const express = require('express');
const io = require('socket.io');

const app = express();

app.use(express.static('build'));

const server = http.createServer(app);
const socketServer = new io(server);

const data = {
    connections: 0,
    users: []
};

socketServer.on('connection', socket => {
    socket.on('connectionsUpdate', nickname => {
        data.connections++;
        data.users.push({
            id: socket.id,
            nickname
        });

        socketServer.emit('chat', {
            text: `${nickname} has connected!`,
            time: new Date().toLocaleTimeString(),
        });

        socketServer.emit('connectionsUpdate', data)
    });

    socket.on('chat', msg => {
        socketServer.emit('chat', {
            text: msg.text,
            nickname: msg.nickname,
            time: new Date().toLocaleTimeString(),
        });
    });

    socket.on('disconnect', () => {
        const index = data.users.findIndex(elem => elem.id === socket.id);

        if(data.users[index]) {
            const nickname = data.users[index].nickname;

            data.users.splice(index, 1);
            data.connections--;

            socketServer.emit('connectionsUpdate', data);

            socketServer.emit('chat', {
                text: `${nickname} has disconnected!`,
                time: new Date().toLocaleTimeString(),
            });
        }
    });
});

server.listen(8080, () => console.log('Server is working!'));