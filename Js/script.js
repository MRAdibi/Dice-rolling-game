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

// image setter function based on dice number
const setImg = (number) => {
  img.src = `Img/dice-${number}.png`;
};

// switch active player
const switchPlayer = () => {
  activePlayer.setCurrentScore(0, true);

  player_1.root_element.classList.toggle("player--active");
  player_2.root_element.classList.toggle("player--active");

  activePlayer == player_1
    ? (activePlayer = player_2)
    : (activePlayer = player_1);

  socket.emit("switch player", activePlayer.player_name);
};

// start of the game events {

// roll dice event
rollDiceBtn.addEventListener("click", () => {
  const generateNumber = Math.trunc(Math.random() * 6) + 1;
  setImg(generateNumber);
  socket.emit("roll dice", generateNumber);
  // switch player if roll dice is 1
  if (generateNumber == 1) {
    switchPlayer();
  } else {
    activePlayer.setCurrentScore(
      activePlayer.currentScore + generateNumber,
      true
    );
  }
});

// holding the score event
holdBtn.addEventListener("click", () => {
  activePlayer.setScore(activePlayer.currentScore + activePlayer.score, true);
  switchPlayer();
});

// Restarting the game event
nameGameBtn.addEventListener("click", () => {
  player_1.setScore(0, true);
  player_1.setCurrentScore(0, true);

  player_2.setScore(0, true);
  player_2.setCurrentScore(0, true);

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
