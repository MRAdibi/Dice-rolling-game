// main variables {

// player instances
let player_1 = new Player(document.getElementById("player1"));
let player_2 = new Player(document.getElementById("player2"));

// buttons
const nameGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

//dice image
const img = document.querySelector(".dice");

// active player init
let activePlayer = player_1;

// } end of main variables

// connecting client socket to the websocket server
let socket = new WebSocket("ws://localhost:8001");

// on connection opened event
socket.onopen = (e) => {
  console.log("[open] Connection established");
  // creating user unique id

  // sending a unique id to
  socket.send(
    JSON.stringify({
      type: "get_token",
    })
  );
};

socket.onmessage = (e) => {
  const jsonData = JSON.parse(e.data);
  switch (jsonData.type) {
    case "token":
      console.log("token is " + jsonData.data);

    default:
      console.log(jsonData);
  }
};

// image setter function based on dice number
const setImg = (number) => {
  img.src = `Img/dice-${number}.png`;
};

// calculate the current currentScore
const addDice = (number) => {
  activePlayer.setCurrentScore(activePlayer.currentScore + number);
};

// change style whene a player loss his acticePlayer
const switchPlayer = () => {
  player_1.root_element.classList.toggle("player--active");
  player_2.root_element.classList.toggle("player--active");
  if (activePlayer == player_1) {
    activePlayer = player_2;
  } else if (activePlayer == player_2) {
    activePlayer = player_1;
  }
};

// check the winner
const checkWinner = () => {
  if (player_1.score >= 100) {
    player_1.root_element.classList.add("player--winner");
  } else if (player_2.score >= 100) {
    player_2.root_element.classList.add("player--winner");
  }
};

// start of the game events {

// roll dice event (main game system)
rollDiceBtn.addEventListener("click", () => {
  if (player_1.score <= 100 && player_2.score <= 100) {
    let generateNumber = Math.trunc(Math.random() * 6) + 1;
    if (generateNumber == 1) {
      let number = 1;
      setImg(number);
      if (activePlayer == player_1) {
        activePlayer.setCurrentScore(0);

        switchPlayer();
      } else if (activePlayer == player_2) {
        activePlayer.setCurrentScore(0);
        switchPlayer();
      }
      checkWinner();
    } else {
      setImg(generateNumber);
      addDice(generateNumber);
      checkWinner();
    }
  }
});

// holding the score event
holdBtn.addEventListener("click", () => {
  if (player_1.score <= 100 && player_2.score <= 100) {
    if (activePlayer == player_1) {
      player_1.setScore(player_1.currentScore + player_1.score);
      activePlayer.setCurrentScore(0);
      switchPlayer();
      checkWinner();
    } else if (activePlayer == player_2) {
      player_2.setScore(player_2.currentScore + player_2.score);
      activePlayer.setCurrentScore(0);
      switchPlayer();
      checkWinner();
    }
  }
});

// Restarting the game event
nameGameBtn.addEventListener("click", () => {
  player_1.setScore(0);
  player_1.setCurrentScore(0);

  player_2.setScore(0);
  player_2.setCurrentScore(0);

  img.src = "";
  activePlayer = player_1;
  player1.classList.add("player--active");
  player2.classList.remove("player--active");

  if (player1.classList.contains("player--winner")) {
    player1.classList.remove("player--winner");
  } else if (player2.classList.contains("player--winner")) {
    player2.classList.remove("player--winner");
  }
});

// } end of the game events
