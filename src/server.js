const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000;

const { users, addUser, addChosen } = require('./users');

const { Server } = require('socket.io');

const io = new Server(server, {
  cors: { origin: '*' }
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

io.on('connection', (socket) => {
  console.log(`${socket.id} socket conectado`);

  io.emit('userConnected', socket.id);

  socket.on('addParticipant', (participant) => {
    const addedUsers = addUser(participant);
    io.emit('allParticipants', addedUsers);
  });

  socket.on('addChosen', (participant) => {
    const addedChosen = addChosen(participant);
    io.emit('allChosen', addedChosen);
  });
});

server.listen(
  port,
  () => console.log(`Server is running`)
);