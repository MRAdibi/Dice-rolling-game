'use strict';


// Select or create all the Elements i need
const player1 = document.querySelector(".player--0");
const name1 = document.getElementById("name--0").textContent;
let score1 = Number(document.getElementById("score--0").textContent)
let currentScore1 = Number(document.getElementById("current--0").textContent);
const player2 = document.querySelector(".player--1");
const name2 = document.getElementById("name--1").textContent;
let score2 = Number(document.getElementById("score--1").textContent)
let currentScore2 = Number(document.getElementById("current--1").textContent);
const nameGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const img = document.querySelector(".dice")
let acticePlayer = name1
/////////////////////////////////////////////////////////////




// I created a function to set the dice img
const setImg = function (number) {
    img.src = `Img/dice-${number}.png`
}

// calculate the current currentScore
const addDice = function (number) {
    if (acticePlayer == name1) {
        currentScore1 += number
        document.getElementById("current--0").textContent = currentScore1
    } else if (acticePlayer == name2) {
        currentScore2 += number
        document.getElementById("current--1").textContent = currentScore2
    }
}


// set currnt score to 0
const setCurrentZero = function () {
    if (acticePlayer == name1) {
        currentScore1 = 0;
        document.getElementById("current--0").textContent = 0
    } else if (acticePlayer == name2) {
        currentScore2 = 0;
        document.getElementById("current--1").textContent = 0
    }

}



// change style whene a player loss his acticePlayer
const switchPlayer = function () {
    player1.classList.toggle("player--active");
    player2.classList.toggle("player--active");
    if (acticePlayer == name1) {
        acticePlayer = name2
    } else if (acticePlayer == name2) {
        acticePlayer = name1
    }
}
// check the winner
const checkWinner = function () {
    if (score1 >= 100) {
        player1.classList.add("player--winner")
    } else if (score2 >= 100) {
        player2.classList.add("player--winner")
    }
}


// Rolling the dice and the main game system to recognize the player's turn
rollDiceBtn.addEventListener("click", function () {
    if (score1 <= 100 && score2 <= 100) {
        let generateNumber = Math.trunc(Math.random() * 6) + 1
        if (generateNumber == 1) {
            let number = 1
            setImg(number)
            if (acticePlayer == name1) {
                setCurrentZero()
                switchPlayer()
            } else if (acticePlayer == name2) {
                setCurrentZero()
                switchPlayer()
            }
            checkWinner()
        } else {
            setImg(generateNumber)
            addDice(generateNumber)
            checkWinner()
        }
    }
})

// The operation of saving player points and also check the winner
holdBtn.addEventListener("click", function () {
    if (score1 <= 100 && score2 <= 100) {
        if (acticePlayer == name1) {
            score1 += currentScore1
            document.getElementById("score--0").textContent = score1
            setCurrentZero()
            switchPlayer()
            checkWinner()
        } else if (acticePlayer == name2) {
            score2 += currentScore2
            document.getElementById("score--1").textContent = score2
            setCurrentZero()
            switchPlayer()
            checkWinner()
        }
    }
})




// Restarting the game
nameGameBtn.addEventListener("click", function () {
    score1 = 0;
    document.getElementById("score--0").textContent = 0
    score2 = 0;
    document.getElementById("score--1").textContent = 0
    currentScore1 = 0;
    document.getElementById("current--0").textContent = 0
    currentScore2 = 0;
    document.getElementById("current--1").textContent = 0
    img.src = ""
    acticePlayer = name1
    document.querySelector(".player--0").classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--active");

    if (player1.classList.contains("player--winner")) {
        player1.classList.remove("player--winner")
    } else if (player2.classList.contains("player--winner")) {
        player2.classList.remove("player--winner")
    }
})