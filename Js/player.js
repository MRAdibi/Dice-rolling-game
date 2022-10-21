class Player {
  constructor(root_element, player_name) {
    this.root_element = root_element;
    this.player_name = player_name;

    this.scoreElement = this.root_element.querySelector("#score");
    this.currentScoreElement = this.root_element.querySelector("#current");

    this.scoreElement.textContent = 0;
    this.currentScoreElement.textContent = 0;

    this.score = 0;
    this.currentScore = 0;
  }

  setScore(n) {
    this.score = n;
    this.scoreElement.textContent = n;

    // check winner
    if (activePlayer.score >= 100) {
      activePlayer.root_element.classList.add("player--winner");
      holdBtn.disabled = true;
      rollDiceBtn.disabled = true;
    }

    socket.emit("update score", { score: n });
  }

  setCurrentScore(n) {
    this.currentScore = n;
    this.currentScoreElement.textContent = n;

    socket.emit("update current score", { score: n });
  }
}
