class Player {
    constructor(nb) {
        this.nb = nb;
        this.roundScore = 0;
        this.score = 0;
    }

    rollDice = (diceFaces) => { 
        return Math.floor(Math.random() * (diceFaces)) + 1;
    }

    setScore = (score) => {
        this.score = score;
        /*
        if (this.nb === 1) {
            setPlayer1Score(score);
        } else {
            setPlayer2Score(score);
        }
        */
    }

    setRoundScore = (score) => {
        this.roundScore = score;
        /*
        if (this.nb === 1) {
            setPlayer1RoundScore(score);
        } else {
            setPlayer2RoundScore(score);
        }
        */
    }

    holdScore = () => {
        this.score += this.roundScore;
        this.setRoundScore(0);
    }
}

module.exports = Player;