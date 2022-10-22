// connecting client socket to the websocket server
let socket = io("http://localhost:8000", {
  transports: ["websocket", "polling", "flashsocket"],
});

const getPlayer = (name) => {
  if (name == "player1" || name == "player_1") return player_1;
  else if (name == "player2" || name == "player_2") return player_2;
};

socket.on("init game state", (msg, active) => {
  console.log(msg);

  player_1.setScore(msg.player_1.score, false);
  player_1.setCurrentScore(msg.player_1.currentScore, false);

  player_2.setScore(msg.player_2.score, false);
  player_2.setCurrentScore(msg.player_2.currentScore, false);
  console.log(active.name);
  if (!active.name == "player_1") {
    player_1.root_element.classList.toggle("player--active");
    player_2.root_element.classList.toggle("player--active");
  }

  activePlayer = getPlayer(active.name);
});

socket.on("deter player", (msg) => {
  activePlayer = getPlayer(msg);
});

socket.on("update score", (msg) => {
  activePlayer.score = msg.score;
  activePlayer.scoreElement.textContent = msg.score;
});

socket.on("update current score", (msg) => {
  console.log("f");
  activePlayer.currentScore = msg.score;
  activePlayer.currentScoreElement.textContent = msg.score;
});

socket.on("roll dice", (value) => {
  setImg(value);
});

socket.on("switch player", (msg) => {
  console.log(msg);
  activePlayer = getPlayer(msg);
  player_1.root_element.classList.toggle("player--active");
  player_2.root_element.classList.toggle("player--active");
});
