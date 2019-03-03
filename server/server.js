const http = require('http');
const fs = require('fs');
const path = require('path');
const io = require('socket.io');


function handleError(error, res) {
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.end(error.message);
}

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, '../', 'build', 'index.html'), (error, html) => {
      if (error) return handleError(error, res);

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(html);
    })
  } else if (req.url.match(/.css$/)) {
    fs.readFile(path.join(__dirname, '../', 'build', req.url), (error, css) => {
      if (error) return handleError(error, res);

      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(css);
    })
  } else if (req.url.match(/.js$/)) {
    fs.readFile(path.join(__dirname, '../', 'build', req.url), (error, js) => {
      if (error) return handleError(error, res);

      res.writeHead(200, {'Content-Type': 'text/js'});
      res.end(js);
    })
  } else if (req.url.match(/.mp3$/)) {
    fs.readFile(path.join(__dirname, '../', 'build', req.url), (error, mp3) => {
      if (error) return handleError(error, res);

      res.writeHead(200, {'Content-Type': 'audio/mpeg'});
      res.end(mp3);
    })
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('404 Not found');
  }
});

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

server.listen(3000, () => console.log('Server is working!'));

