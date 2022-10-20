const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, { cors: { origin: "*" } });
let players = {
  player_1: false,
  player_2: false,
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  if (!players.player_1 && !players.player_2) {
    socket.emit("deter player", "player1");
  } else {
    socket.emit("deter player", "player2");
  }

  socket.on("update score", (e) => {
    socket.broadcast.emit("update score", e);
  });
  socket.on("update current score", (e) => {
    socket.broadcast.emit("update current score", e);
  });

  socket.on("switch player", (e) => {
    console.log("s");
    socket.broadcast.emit("switch player", e);
  });

  socket.on("roll dice", (e) => {
    console.log("s");
    socket.broadcast.emit("roll dice", e);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(8000, () => {
  console.log("listening on *:8000");
});
