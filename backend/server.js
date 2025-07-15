const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Drone = require('tello-drone');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Instantiate the drone (it connects automatically when you send commands)
const drone = new Drone();

// Optional: send initial "command" to enable SDK mode
drone.command('command');

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('command', (cmd) => {
    console.log(`Sending command to drone: ${cmd}`);
    drone.command(cmd); // E.g. "takeoff", "land", "up 50"
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
