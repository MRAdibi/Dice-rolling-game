// main variables {

// player instances
let player_1 = new Player(document.getElementById("player1"), "player1");
let player_2 = new Player(document.getElementById("player2"), "player2");

// buttons
const nameGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

//dice image
const img = document.querySelector(".dice");

// active player init
let activePlayer = player_1;

let clientPlayer = undefined;

//game type
let online = true;

// } end of main variables

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

// image setter function based on dice number
const setImg = (number) => {
  img.src = `Img/dice-${number}.png`;
};

// change style whene a player loss his acticePlayer
const switchPlayer = () => {
  player_1.root_element.classList.toggle("player--active");
  player_2.root_element.classList.toggle("player--active");

  activePlayer == player_1
    ? (activePlayer = player_2)
    : (activePlayer = player_1);

  socket.emit("switch player", activePlayer.player_name);
};

// check the winner
const checkWinner = () => {
  if (player_1.score >= 100) {
    player_1.root_element.classList.add("player--winner");
    holdBtn.disabled = true;
    rollDiceBtn.disabled = true;
  } else if (player_2.score >= 100) {
    player_2.root_element.classList.add("player--winner");
    holdBtn.disabled = true;
    rollDiceBtn.disabled = true;
  }
};

// start of the game events {

// roll dice event (main game system)
rollDiceBtn.addEventListener("click", () => {
  let generateNumber = Math.trunc(Math.random() * 6) + 1;
  setImg(generateNumber);
  socket.emit("roll dice", generateNumber);
  // switch player if roll dice is 1
  if (generateNumber == 1) {
    activePlayer.setCurrentScore(0);
    switchPlayer();
  } else {
    activePlayer.setCurrentScore(activePlayer.currentScore + generateNumber);
  }
});

// holding the score event
holdBtn.addEventListener("click", () => {
  activePlayer.setScore(activePlayer.currentScore + activePlayer.score);
  activePlayer.setCurrentScore(0);
  switchPlayer();
});

// Restarting the game event
nameGameBtn.addEventListener("click", () => {
  player_1.setScore(0);
  player_1.setCurrentScore(0);

  player_2.setScore(0);
  player_2.setCurrentScore(0);

  img.src = "";

  holdBtn.disabled = false;
  rollDiceBtn.disabled = false;

  activePlayer = player_1;
  player1.classList.add("player--active");
  player2.classList.remove("player--active");

  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
});

// } end of the game events
