const playerOne = document.querySelector('.left-player');
const playerTwo = document.querySelector('.right-player');
const playerOneTotal = document.querySelector('#total-one');
const playerTwoTotal = document.querySelector('#total-two');
const playerOneCurrent = document.querySelector('#current-one');
const playerTwoCurrent = document.querySelector('#current-two');
const diceImage = document.querySelector('.dice');
const roll = document.querySelector('#roll');
const hold = document.querySelector('#hold');
const restart = document.querySelector('.start');
let currentScore = 0;
let play = true;
getTurn();
roll.addEventListener('click', () => {
    if (play) {
        let dice = getDice();
        diceImage.src = `images/dice-${dice}.svg`;
        playerTurn = getPlayerTurn();
        if (playerTurn.classList[0] === "left-player") {
            currentScore += dice;
            playerOneCurrent.textContent = currentScore;
        } else {
            currentScore += dice;
            playerTwoCurrent.textContent = currentScore;
        }
        if (dice === 1) {
            changeTurn();
        }
    }
});


hold.addEventListener('click', () => {

    if (play) {
        let totalOne = Number(playerOneTotal.textContent);
        let totalTwo = Number(playerTwoTotal.textContent);
        playerTurn = getPlayerTurn();
        if (playerTurn.classList[0] === "left-player") {

            playerOneTotal.textContent = totalOne + currentScore;
        } else {
            playerTwoTotal.textContent = totalTwo + currentScore;
        }
        win();
        if (play) {
            changeTurn();
        }
    }
});

restart.addEventListener('click', () => {
    playerOneCurrent.textContent = 0;
    playerTwoCurrent.textContent = 0;
    playerOneTotal.textContent = 0;
    playerTwoTotal.textContent = 0;
    diceImage.classList.remove('hidden');
    playerOne.classList.remove('winner');
    playerTwo.classList.remove('winner');
    currentScore = 0;
    play = true;
    getTurn();
});


function getTurn() {
    let turn = Math.trunc((Math.random() * 2) + 1);
    if (turn === 1) {
        playerOne.classList.add('turn');
        playerTwo.classList.remove('turn');
    } else {
        playerTwo.classList.add('turn');
        playerOne.classList.remove('turn');
    }
}

function getDice() {
    return Math.trunc((Math.random() * 6) + 1);
}

function getPlayerTurn() {
    return playerTurn = document.querySelector('.turn');
}

function changeTurn() {
    currentScore = 0;
    playerOneCurrent.textContent = currentScore;
    playerTwoCurrent.textContent = currentScore;
    playerOne.classList.toggle("turn");
    playerTwo.classList.toggle("turn");
}

function endGame() {
    play = false;
    diceImage.classList.add('hidden');
    playerOne.classList.remove('turn');
    playerTwo.classList.remove('turn');

}

function win() {
    let totalOne = Number(playerOneTotal.textContent);
    let totalTwo = Number(playerTwoTotal.textContent);
    if (totalOne >= 10) {
        playerOne.classList.add('winner');
        endGame();
    } else if (totalTwo >= 10) {
        playerTwo.classList.add('winner');
        endGame();
    }
}