const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');


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
  } else if(req.url.match(/.css$/)) {
    fs.readFile(path.join(__dirname, '../', 'build', req.url), (error, css) => {
      if (error) return handleError(error, res);

      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(css);
    })
  } else if(req.url.match(/.js$/)) {
    fs.readFile(path.join(__dirname, '../', 'build', req.url), (error, js) => {
      if (error) return handleError(error, res);

      res.writeHead(200, {'Content-Type': 'text/js'});
      res.end(js);
    })
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('404 Не найдено');
  }
});

const wsServer = new WebSocket.Server({ server });

let id = 0;
let connections = 0;

wsServer.on('connection', ws => {
  connections++;
  ws.send(JSON.stringify({
    id: null,
    message: 'Добро пожаловать!',
    time: new Date().toLocaleTimeString(),
    connections
  }));

  sendMessage(JSON.stringify({
    id: null,
    message: 'Новое подключение',
    time: new Date().toLocaleTimeString(),
    connections
  }));

  ws.on('message', message => {
    sendMessage(JSON.stringify({
      id: id++,
      message,
      time: new Date().toLocaleTimeString(),
    }));
  });

  ws.on('close', () => {
    sendMessage('Пользователь отключился');
    connections--;
  });
});

server.listen(3000, () => console.log('Server is working!!!'));

function sendMessage(message) {
  wsServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  })
}

