const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('A user connected');

  // Receive and store username
  socket.on('set username', username => {
    socket.username = username;
    io.emit('chat message', `🔵 ${username} joined the chat`);
  });

  // Broadcast message to all clients
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  // On disconnect
  socket.on('disconnect', () => {
    if (socket.username) {
      io.emit('chat message', `🔴 ${socket.username} left the chat`);
    }
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
