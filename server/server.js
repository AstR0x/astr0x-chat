const WebSocket = require('ws');

const server = new WebSocket.Server({port: 3000}, () => console.log('Server is working!'));

server.on('connection', ws => {
  ws.send('Добро пожаловать...');

  sendMessage('Новое подключение');

  ws.on('message', message => {
    sendMessage(message);
  });

  ws.on('close', () => {
    sendMessage('Пользователь отключился');
  });
});

function sendMessage(message) {
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  })
}