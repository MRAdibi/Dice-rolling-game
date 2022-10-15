class Player {
  constructor(root_element) {
    this.root_element = root_element;

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

    socket.send(
      JSON.stringify({
        type: "update_score",
      })
    );
  }

  setCurrentScore(n) {
    this.currentScore = n;
    this.currentScoreElement.textContent = n;
    socket.send(
      JSON.stringify({
        type: "update_current_score",
      })
    );
  }
}
