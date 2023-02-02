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

const getRandomIntIncl = (min, max) => {
    const mini = Math.ceil(min);
    const maxi = Math.floor(max);
    return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
}

const rollButtonEnable = () => {
    rollButton.removeAttribute('disabled');
    rollButtonIcon.classList.replace('stroke-dark-gray', 'stroke-red');
}

const rollButtonDisable = () => {
    rollButton.setAttribute('disabled', '');
    rollButtonIcon.classList.replace('stroke-red', 'stroke-dark-gray');
}

const holdButtonEnable = () => {
    holdButton.removeAttribute('disabled');
    holdButtonIcon.classList.replace('stroke-dark-gray', 'stroke-red');
}

const holdButtonDisable = () => {
    holdButton.setAttribute('disabled', '');
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

// CLASS

class Player {
    constructor(nb) {
        this.nb = nb;
        this.roundScore = 0;
        this.score = 0;
    }

    rollDice(diceFaces) {
        const diceValue = getRandomIntIncl(1, diceFaces);
        console.log(`You've got a ${diceValue}`);
        // update display
        setDiceImage(diceValue);
        return diceValue
    }

    setScore(score) {
        this.score = score;
        // update display
        if (this.nb === 1) {
            setPlayer1Score(score);
        } else {
            setPlayer2Score(score);
        }
    }

    setRoundScore(score) {
        this.roundScore = score;
        // update display
        if (this.nb === 1) {
            setPlayer1RoundScore(score);
        } else {
            setPlayer2RoundScore(score);
        }
    }

    holdScore() {
        this.score += this.roundScore;
        // update display
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
        console.log("Game start");

        this.initDiceImg();
        this.initPlayersScore();
        this.initCurrentPlayer();
        this.newRoundButtonsState();

        console.log(`Player ${this.currentPlayerNb}, it's your round.`);
    }

    roll(){
        if (this.currentPlayerNb === 1) {
            // reset player round score (0)
            this.player1.setRoundScore(0);
            // roll dice according to nb of faces
            const diceValue = this.player1.rollDice(diceFaces);

            // if dice value isn't 1 then player can roll dice again or hold his round score
            // else player lose round score and pass his round
            if (diceValue !== 1) {
                this.player1.setRoundScore(diceValue);
                this.sameRoundButtonsState();

                console.log("Do you roll dice again or hold round score?");
            } else {
                this.changeCurrentPlayer();
                this.newRoundButtonsState();
                console.log("You pass your round");
                console.log(`Player ${this.currentPlayerNb}, it's your round.`);
            }
        } else {
            // reset player round score (0)
            this.player2.setRoundScore(0);
            // roll dice according to nb of faces
            const diceValue = this.player2.rollDice(diceFaces);

            // if dice value isn't 1 then player can roll dice again or hold his round score
            // else player lose round score and pass his round
            if (diceValue !== 1) {
                this.player2.setRoundScore(diceValue);
                this.sameRoundButtonsState();

                console.log("Do you roll dice again or hold round score?");
            } else {
                this.changeCurrentPlayer();
                this.newRoundButtonsState();

                console.log("You pass your round");
                console.log(`Player ${this.currentPlayerNb}, it's your round.`);
            }
        }
        this.testIfWinner();
    }

    hold() {
        if (this.currentPlayerNb === 1) {
            this.player1.holdScore();
        } else {
            this.player2.holdScore();
        }
        this.changeCurrentPlayer();
        this.newRoundButtonsState();
        console.log(`Player ${this.currentPlayerNb}, it's your round.`);
        this.testIfWinner();
    }

    initDiceImg() {
        // update display
        setDiceImage(6);
    }
    
    initCurrentPlayer() {
        this.currentPlayerNb = 1;
        // update display
        setPlayer1Indicators();
    }

    changeCurrentPlayer() {
        this.currentPlayerNb = (this.currentPlayerNb === 1) ? 2 : 1;
        // update display
        if (this.currentPlayerNb === 1) {
            setPlayer1Indicators();
        } else {
            setPlayer2Indicators();
        }  
    }

    initButtonsState() {
        // update display
        rollButtonDisable();
        holdButtonDisable();
    }

    newRoundButtonsState() {
        // update display
        rollButtonEnable();
        holdButtonDisable();
    }

    sameRoundButtonsState() {
        // update display
        rollButtonEnable();
        holdButtonEnable();
    }

    initPlayersScore() {
        this.player1.setScore(90);
        this.player1.setRoundScore(0);
        this.player2.setScore(90);
        this.player2.setRoundScore(0);
    }

    testIfWinner() {
        // If a player has maximum score, he wins
        if (this.player1.score >= maxScore || this.player2.score >= maxScore) {
            // display winner 
            this.player1.score >= maxScore ? console.log("Player 1 win") : console.log("Player 2 win");
            // game ending -> reset display
            this.initButtonsState();
            this.initPlayersScore();
            initPlayersIndicators();
            setDiceImage(6);
        }
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
// then change player, new game round
holdButton.addEventListener('click', () => {
    diceGame.hold();
});