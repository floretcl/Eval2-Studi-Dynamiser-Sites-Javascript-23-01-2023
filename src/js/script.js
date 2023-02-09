// CONSTANTS

const player1Title = document.getElementById('player-1-title');
const player1Indicator = document.getElementById('player-1-indicator');
const player1Score = document.getElementById('player-1-score');
const player1RoundScore = document.getElementById('player-1-round-score');
const player2Title = document.getElementById('player-2-title');
const player2Indicator = document.getElementById('player-2-indicator');
const player2Score = document.getElementById('player-2-score');
const player2RoundScore = document.getElementById('player-2-round-score');
const newGameButton = document.getElementById('new-game-btn');
const newGameButtonIcon = document.getElementById('new-game-btn-icon');
const rollButton = document.getElementById('roll-btn');
const rollButtonIcon = document.getElementById('roll-btn-icon');
const holdButton = document.getElementById('hold-btn');
const holdButtonIcon = document.getElementById('hold-btn-icon');
const diceImage = document.getElementById('dice-img');

const diceFaces = 6;
const maxScore = 100;

// FUNCTIONS

const getRandomIntInclusive = (min, max) => {
    const mini = Math.ceil(min);
    const maxi = Math.floor(max);
    return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
}

// VIEW FUNCTIONS

const rollButtonEnable = () => {
    rollButton.removeAttribute('disabled');
    rollButton.classList.add('group', 'transition', 'ease-in-out', 'duration-200', 'hover:scale-105');
    rollButtonIcon.classList.replace('stroke-dark-gray', 'stroke-red');
}

const rollButtonDisable = () => {
    rollButton.setAttribute('disabled', '');
    rollButton.classList.remove('group', 'transition', 'ease-in-out', 'duration-200', 'hover:scale-105');
    rollButtonIcon.classList.replace('stroke-red', 'stroke-dark-gray');
}

const holdButtonEnable = () => {
    holdButton.removeAttribute('disabled');
    holdButton.classList.add('group', 'transition', 'ease-in-out', 'duration-200', 'hover:scale-105');
    holdButtonIcon.classList.replace('stroke-dark-gray', 'stroke-red');
}

const holdButtonDisable = () => {
    holdButton.setAttribute('disabled', '');
    holdButton.classList.remove('group', 'transition', 'ease-in-out', 'duration-200', 'hover:scale-105');
    holdButtonIcon.classList.replace('stroke-red', 'stroke-dark-gray');
}

const initPlayersIndicators = () => {
    player1Title.classList.replace('font-light', 'font-extralight');
    player1Indicator.classList.add('hidden');
    player2Title.classList.replace('font-light', 'font-extralight');
    player2Indicator.classList.add('hidden');
}

const setPlayer1Indicators = () => {
    player1Title.classList.replace('font-extralight', 'font-light');
    player1Indicator.classList.remove('hidden');
    player2Title.classList.replace('font-light', 'font-extralight');
    player2Indicator.classList.add('hidden');
}

const setPlayer2Indicators = () => {
    player1Title.classList.replace('font-light', 'font-extralight');
    player1Indicator.classList.add('hidden');
    player2Title.classList.replace('font-extralight', 'font-light');
    player2Indicator.classList.remove('hidden');
}

const setDiceImage = (nb) => {
    diceImage.src = `./images/dice/Dice-${nb}.svg`;
}

const setPlayer1Score = (score) => {
    player1Score.innerText = score;
}

const setPlayer2Score = (score) => {
    player2Score.innerText = score;
}

const setPlayer1RoundScore = (score) => {
    player1RoundScore.innerText = score;
}

const setPlayer2RoundScore = (score) => {
    player2RoundScore.innerText = score;
}

// CLASSES

class Player {
    constructor(nb) {
        this.nb = nb;
        this.roundScore = 0;
        this.score = 0;
    }

    rollDice(diceFaces) {
        const diceValue = getRandomIntInclusive(1, diceFaces);
        alert(`You've got a ${diceValue}`);
        setDiceImage(diceValue);
        return diceValue
    }

    setScore(score) {
        this.score = score;
        if (this.nb === 1) {
            setPlayer1Score(score);
        } else {
            setPlayer2Score(score);
        }
    }

    setRoundScore(score) {
        this.roundScore = score;
        if (this.nb === 1) {
            setPlayer1RoundScore(score);
        } else {
            setPlayer2RoundScore(score);
        }
    }

    holdScore() {
        this.score += this.roundScore;
        if (this.score >= 100) {
            this.score = 'WIN';
        }
        this.setScore(this.score);
        this.setRoundScore(0);
    }
}

class DiceGame {
    constructor() {
        this.player1 = new Player(1);
        this.player2 = new Player(2);
        this.currentPlayerNb = 1;
    }

    startGame() {
        alert('Game start');
        // init game state and view
        this.initDiceImg();
        this.initPlayersScore();
        this.initCurrentPlayer();
        this.newRoundButtonsState();

        alert(`Player ${this.currentPlayerNb}, it's your round.`);
    }

    roll(){
        // get current player
        let currentPlayer = this.currentPlayerNb === 1 ? this.player1 : this.player2;
        // reinit player round score
        currentPlayer.setRoundScore(0);
        // player dice roll dice according to nb of faces
        const diceValue = currentPlayer.rollDice(diceFaces);

        // if dice value isn't 1 then player can roll dice again or hold his round score
        // else player loose round score and pass his round
        if (diceValue !== 1) {
            currentPlayer.setRoundScore(diceValue);
            this.retryRoundButtonsState();
        } else {
            alert('You pass your round');
            this.changeCurrentPlayer();
        }
    }

    hold() {
        // get current player
        let currentPlayer = this.currentPlayerNb === 1 ? this.player1 : this.player2;
        // player hold, add round score to global score
        currentPlayer.holdScore();

        // if current player win, it's end game
        let win = this.ifWinner(currentPlayer);
         // else next player
        if (!win) {
            this.changeCurrentPlayer();
        }
    }

    initDiceImg() {
        setDiceImage(0);
    }
    
    initCurrentPlayer() {
        this.currentPlayerNb = 1;
        setPlayer1Indicators();
    }

    changeCurrentPlayer() {
        // switch player nb variable and init view according to current player
        this.currentPlayerNb = (this.currentPlayerNb === 1) ? 2 : 1;
        if (this.currentPlayerNb === 1) {
            setPlayer1Indicators();
        } else {
            setPlayer2Indicators();
        }  
        this.initDiceImg();
        this.newRoundButtonsState();

        alert(`Player ${this.currentPlayerNb}, it's your round.`);
    }

    initButtonsState() {
        rollButtonDisable();
        holdButtonDisable();
    }

    newRoundButtonsState() {
        rollButtonEnable();
        holdButtonDisable();
    }

    retryRoundButtonsState() {
        rollButtonEnable();
        holdButtonEnable();
    }
    
    initPlayersScore() {
        this.player1.setScore(0);
        this.player1.setRoundScore(0);
        this.player2.setScore(0);
        this.player2.setRoundScore(0);
    }

    ifWinner(player) {
        // If a player win
        if (player.score === 'WIN') {
            // show winner 
            alert(`Player ${player.nb} win`);
            // game ending
            this.resetGame();
            return true;
        } else {
            return false;
        }
    }

    resetGame() {
        // reinit view, ready for a new game
        this.initButtonsState();
        initPlayersIndicators();
    }
}


//////////
// MAIN //
//////////

// Init

const diceGame = new DiceGame();

// If new game button clicked, start a new game 
// then wait for player to roll the dice
newGameButton.addEventListener('click', () => {
    diceGame.startGame();
});

// If roll button clicked, roll dice 
// then wait for player to roll again or hold round score
rollButton.addEventListener('click', () => {
    diceGame.roll();
});

// If hold button clicked, hold round score and add it to global score
// then change player and wait
holdButton.addEventListener('click', () => {
    diceGame.hold();
});