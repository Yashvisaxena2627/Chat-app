const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

// Prompt for username
let username = prompt("Enter your name:");
if (!username) username = "Anonymous";

// Send username to server
socket.emit('set username', username);

// Send message on submit
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', `${username}: ${input.value}`);
    input.value = '';
  }
});

// Receive and display message
socket.on('chat message', function (msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
