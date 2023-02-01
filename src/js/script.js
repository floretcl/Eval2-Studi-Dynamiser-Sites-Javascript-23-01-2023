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
const rollButton = document.getElementById('roll-btn');
const holdButton = document.getElementById('hold-btn');
const diceImage = document.getElementById('dice-img');
const dice1SrcImg = "./images/dice/Dice-1.svg";
const dice2SrcImg = "./images/dice/Dice-2.svg";
const dice3SrcImg = "./images/dice/Dice-3.svg";
const dice4SrcImg = "./images/dice/Dice-4.svg";
const dice5SrcImg = "./images/dice/Dice-5.svg";
const dice6SrcImg = "./images/dice/Dice-6.svg";


// FUNCTIONS

const getRandomIntIncl = (min, max) => {
    const mini = Math.ceil(min);
    const maxi = Math.floor(max);
    return Math.floor(Math.random() * (maxi - mini + 1)) + mini;
}

// CLASS

class Player {
    constructor(nb) {
        this.nb = nb;
        this.roundScore = 0;
        this.score = 0;
    }

    rollDice(diceFaces) {
        return getRandomIntIncl(1, diceFaces);
    }

    holdScore() {
        this.score += this.roundScore;
    }
}

class DiceGame {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayerNb = 1;
    }

    initDisplay() {
        player1Score.innerText = 0;
        player1RoundScore.innerText = 0;
        player2Score.innerText = 0;
        player2RoundScore.innerText = 0;
        diceImage.src = dice6SrcImg;
    }

    initCurrentPlayer() {
        this.currentPlayerNb = 1;
        console.log(`Player ${this.currentPlayerNb}, it's your turn.`);
        player1Title.classList.replace('font-extralight', 'font-light');
        player1Indicator.classList.remove('hidden');
        player2Title.classList.replace('font-light', 'font-extralight');
        player2Indicator.classList.add('hidden');
    }

    initRoundScore(player) {
        player.roundScore = 0;
        if (player.nb === 1) {
            player1RoundScore.innerText = 0;
        } else {
            player2RoundScore.innerText = 0;
        }
    }

    startGame() {
        console.log("Game start");
        this.initDisplay;
        this.initCurrentPlayer();
    }
    
    roll(player){
        this.initRoundScore(player);
        const diceValue = player.rollDice(6);
        switch (diceValue) {
            case 1:
                diceImage.src = dice1SrcImg;
                console.log("1");
                break;
            case 2:
                diceImage.src = dice2SrcImg;
                console.log("2");
                break;
            case 3:
                diceImage.src = dice3SrcImg;
                console.log("3");
                break;
            case 4:
                diceImage.src = dice4SrcImg;
                console.log("4");
                break;
            case 5:
                diceImage.src = dice5SrcImg;
                console.log("5");
                break;
            case 6:
                diceImage.src = dice6SrcImg;
                console.log("6");
                break;
            default:
                break;
        }
        console.log(diceImage.getAttribute('src'));
        if (diceValue !== 1) {
            player.roundScore = diceValue;
        } else {
            player.roundScore = 0;
            this.currentPlayerNb = (this.currentPlayerNb === 1) ? 2 : 1;
            console.log(`Player ${this.currentPlayerNb}, it's your turn.`);
            if (this.currentPlayerNb === 1) { 
                player1Title.classList.replace('font-extralight', 'font-light');
                player1Indicator.classList.remove('hidden');
                player2Title.classList.replace('font-light', 'font-extralight');
                player2Indicator.classList.add('hidden');
            } else {
                player1Title.classList.replace('font-light', 'font-extralight');
                player1Indicator.classList.add('hidden');
                player2Title.classList.replace('font-extralight', 'font-light');
                player2Indicator.classList.remove('hidden')
            }
        }
        if (player.nb === 1) {
            player1RoundScore.innerText = player.roundScore;
        } else {
            player2RoundScore.innerText = player.roundScore;
        }
        if (player1.score >= 100) {
            alert("Player 1 win");
        }
        if (player2.score >= 100) {
            alert("Player 2 win");
        }
    }

    hold(player) {
        player.holdScore();
        if (player.nb === 1) {
            player1Score.innerText = player.score;
            player1RoundScore.innerText = 0;
        } else {
            player2Score.innerText = player.score;
            player2RoundScore.innerText = 0;
        }
        this.currentPlayerNb = (this.currentPlayerNb === 1) ? 2 : 1;
        console.log(`Player ${this.currentPlayerNb}, it's your turn.`);
        if (this.currentPlayerNb === 1) { 
            player1Title.classList.replace('font-extralight', 'font-light');
            player1Indicator.classList.remove('hidden');
            player2Title.classList.replace('font-light', 'font-extralight');
            player2Indicator.classList.add('hidden');
        } else {
            player1Title.classList.replace('font-light', 'font-extralight');
            player1Indicator.classList.add('hidden');
            player2Title.classList.replace('font-extralight', 'font-light');
            player2Indicator.classList.remove('hidden')
        }
        if (player1.score >= 100) {
            alert("Player 1 win");
        }
        if (player2.score >= 100) {
            alert("Player 2 win");
        }
    }
}



//////////
// MAIN //
//////////

// Init
const player1 = new Player(1);
const player2 = new Player(2);

const diceGame = new DiceGame(player1, player2);

// If new game button clicked, start a game
newGameButton.addEventListener('click', () => {
    diceGame.startGame();
});

// If roll button clicked, roll dice 
rollButton.addEventListener('click', () => {
    diceGame.roll(diceGame.currentPlayerNb === 1 ? player1 : player2);
});

// If hold button clicked, hold score 
holdButton.addEventListener('click', () => {
    diceGame.hold(diceGame.currentPlayerNb === 1 ? player1 : player2);
});

/*
player1Score.innerText.addEventListener('change', () => {
    if (player1.score >= 100) {
        alert("Player 1 win");
    }
});

player2Score.innerText.addEventListener('change', () => {
    if (player2.score >= 100) {
        alert("Player 2 win");
    }
});
*/