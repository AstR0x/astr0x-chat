const http = require('http');
const express = require('express');
const io = require('socket.io');
const randomColor = require('random-color');

const app = express();

app.use(express.static('build'));

const server = http.createServer(app);
const socketServer = new io(server);

const data = {
  connections: 0,
  users: [],
};

socketServer.on('connection', (socket) => {
  socket.on('connectionsUpdate', (nickname) => {
    data.connections += 1;
    data.users.push({
      id: socket.id,
      nickname,
      color: randomColor().hexString(),
    });

    socketServer.emit('chat', {
      text: `${nickname} has connected!`,
      time: new Date().toLocaleTimeString(),
    });

    socketServer.emit('connectionsUpdate', data);
  });

  socket.on('chat', (msg) => {
    socketServer.emit('chat', {
      text: msg.text,
      nickname: msg.nickname,
      time: new Date().toLocaleTimeString(),
      color: data.users.find(obj => obj.id === socket.id).color,
    });
  });

  socket.on('disconnect', () => {
    const index = data.users.findIndex(elem => elem.id === socket.id);

    if (data.users[index]) {
      const { nickname } = data.users[index];

      data.users.splice(index, 1);
      data.connections -= 1;

      socketServer.emit('connectionsUpdate', data);

      socketServer.emit('chat', {
        text: `${nickname} has disconnected!`,
        time: new Date().toLocaleTimeString(),
      });
    }
  });
});

server.listen(3001, () => console.log('Server is working!'));
