const http = require('http');
const express = require('express') ;
const io = require('socket.io');

const app = express();

app.use(express.static('build'));

const server = http.createServer(app);
const socketServer = new io(server);

const connections = {
  amount: 0,
  users: []
};

socketServer.on('connection', socket => {
  connections.amount++;

  socket.on('connectionsUpdate', nickname => {
    connections.users.push({
      id: socket.id,
      nickname,
    });

    socketServer.emit('connectionsUpdate', connections);
  });

  socket.on('chat', message => {
    socketServer.emit('chat', {
      message,
      time: new Date().toLocaleTimeString(),
    });
  });

  socket.on('disconnect', () => {
    const index = connections.users.findIndex(elem => elem.id === socket.id);
    connections.users.splice(index, 1);
    connections.amount--;
    socketServer.emit('connectionsUpdate', connections);
  });
});

server.listen(8080, () => console.log('Server is working!'));