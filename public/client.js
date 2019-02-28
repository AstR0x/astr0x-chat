const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

const ws = new WebSocket('ws://37.230.115.224:3000');

function setStatus(value) {
  status.innerText = value;
}

function printMessage(value) {
  const li = document.createElement('li');

  li.innerText = value;
  messages.appendChild(li);
}

form.onsubmit = function (event) {
  event.preventDefault();
  ws.send(input.value);
  input.value = '';
};

ws.onopen = () => setStatus('ONLINE');

ws.onclose = () => setStatus('DISCONNECTED');

ws.onmessage = msg => {
  const date = new Date().toLocaleTimeString();
  printMessage(date + ": " +  msg.data);
};