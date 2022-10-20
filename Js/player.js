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
    checkWinner();

    socket.emit("update score", { score: n });
  }

  setCurrentScore(n) {
    this.currentScore = n;
    this.currentScoreElement.textContent = n;
    checkWinner();

    socket.emit("update current score", { score: n });
  }
}
