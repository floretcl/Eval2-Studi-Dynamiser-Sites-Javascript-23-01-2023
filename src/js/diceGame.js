class DiceGame {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.diceFaces = 6;
        this.maxScore = 100;
        this.currentPlayerNb = 0;
        this.currentPlayer = undefined;
        this.diceValue = 0;
        this.inGame = false;
        this.newGameButtonEnabled = true;
        this.rollButtonEnabled = false;
        this.holdButtonEnabled = false;
    }

    startGame = () => {
        // init game state
        this.inGame = true;
        this.initDiceImg();
        this.initPlayersScore();
        this.setCurrentPlayer(1);
        this.newRoundButtonsState();

        //showModal(`The game begins.\nPlayer ${this.currentPlayerNb}, you start.`);
    }

    roll = () => {
        // player dice roll dice according to nb of faces
        this.diceValue = this.currentPlayer.rollDice(this.diceFaces);
        //setDiceImage(this.diceValue);

        // if dice value isn't 1 then player can roll dice again or hold his round score
        // else player loose round score and pass his round
        if (this.diceValue !== 1) {
            this.currentPlayer.setRoundScore(this.diceValue);
            this.retryRoundButtonsState();
        } else {
            //showModal(`Player ${this.currentPlayerNb}, you've got a 1.\nYou pass your round.`);
            this.toggleCurrentPlayer();
            this.initDiceImg();
            this.newRoundButtonsState();
        }
    }

    hold = () => {
        // get current player
        let currentPlayer = this.currentPlayerNb === 1 ? this.player1 : this.player2;
        // player hold, add round score to global score
        currentPlayer.holdScore();
        if (currentPlayer.score >= this.maxScore) {
            currentPlayer.setScore('WIN');
        }

        // if current player win, it's end game
        let win = this.isWinner(currentPlayer);
         // else next player
        if (!win) {
            this.toggleCurrentPlayer();
            this.initDiceImg();
            this.newRoundButtonsState();
        }
    }

    initDiceImg = () => {
        this.diceValue = 0;
        //setDiceImage(0);
    }

    initPlayersScore = () => {
        this.player1.setScore(0);
        this.player1.setRoundScore(0);
        this.player2.setScore(0);
        this.player2.setRoundScore(0);
    }
    
    setCurrentPlayer = (nb) => {
        this.currentPlayerNb = nb;
        if (this.currentPlayerNb === 1) {
            this.currentPlayer = this.player1;
            //setPlayer1Indicators();
        } else if (this.currentPlayerNb === 2) {
            this.currentPlayer = this.player2;
            //setPlayer2Indicators();
        } else {
            this.currentPlayer = undefined;
            //initPlayersIndicators();
        }
    }

    toggleCurrentPlayer = () => {
        // switch player nb variable and init view according to current player
        this.currentPlayerNb = (this.currentPlayerNb === 1) ? 2 : 1;
        this.setCurrentPlayer(this.currentPlayerNb);
    }

    initButtonsState = () => {
        this.rollButtonEnabled = false;
        this.holdButtonEnabled = false;
        //rollButtonDisable();
        //holdButtonDisable();
    }

    newRoundButtonsState = () => {
        this.rollButtonEnabled = true;
        this.holdButtonEnabled = false;
        //rollButtonEnable();
        //holdButtonDisable();
    }

    retryRoundButtonsState = () => {
        this.rollButtonEnabled = true;
        this.holdButtonEnabled = true;
        //rollButtonEnable();
        //holdButtonEnable();
    }

    isWinner = (player) => {
        // If a player win
        if (player.score === 'WIN') {
            // show winner 
            //showModal(`Player ${player.nb} win`);
            // game ending
            this.resetGame();
            return true;
        } else {
            return false;
        }
    }

    resetGame = () => {
        // reinit state, ready for a new game
        this.initButtonsState();
        this.setCurrentPlayerNb(0);
        this.inGame = false;
    }
}

module.exports = DiceGame;