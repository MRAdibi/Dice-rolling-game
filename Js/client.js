// connecting client socket to the websocket server
let socket = io("http://localhost:8000", {
  transports: ["websocket", "polling", "flashsocket"],
});

socket.on("deter player", (msg) => {
  if (msg == "player1") {
    clientPlayer = player_1;
  } else {
    clientPlayer = player_2;
  }
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
  if (msg == "player1") {
    activePlayer = player_1;
  } else {
    activePlayer = player_2;
  }
  player_1.root_element.classList.toggle("player--active");
  player_2.root_element.classList.toggle("player--active");
});
