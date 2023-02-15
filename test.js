const Player = require('./src/js/player.test');
const DiceGame = require('./src/js/diceGame.test');
const assert = require('assert');

const testIntInRange = (value,min,max) => {
    if (value >= min && value <= max) {
        return true;
    } else {
        return false;
    }
}

describe(`test testIntInRange function`, () => {
    it(`should return true if value between min (included) and max (included)`, () => {
        assert.equal(testIntInRange(0,0,5), true);
        assert.equal(testIntInRange(1,0,5), true);
        assert.equal(testIntInRange(2,0,5), true);
        assert.equal(testIntInRange(3,0,5), true);
        assert.equal(testIntInRange(4,0,5), true);
        assert.equal(testIntInRange(5,0,5), true);
    });
    it(`should return false if value isn't between min (included) and max (included)`, () => {
        assert.equal(testIntInRange(-1,0,5), false);
        assert.equal(testIntInRange(6,0,5), false);
    });
});

// Tests Player Class - Start /////////////////////

describe(`test player constructor`, () => {
    const player = new Player(0);
    it(`should create a new player with player.nb equal to value (nb) in parameter`, () => {   
        assert.equal(player.nb, 0);
        assert.notEqual(player.nb, 1);
        assert.notEqual(player.nb, -1);
    });
    it(`should create a new player with player.roundScore equal to 0`, () => {
        assert.equal(player.roundScore, 0);
        assert.notEqual(player.roundScore, 1);
        assert.notEqual(player.roundScore, -1);
    });
    it(`should create a new player with player.score equal to 0`, () => {
        assert.equal(player.score, 0);
        assert.notEqual(player.score, 1);
        assert.notEqual(player.score, -1);
    });
});

describe(`test player roll dice method`, () => {
    const player = new Player(0);
    it(`should return a value is between 1 (included) and nb of dice faces (included)`, () => {
        const diceFaces = 6;
        assert.equal(testIntInRange(player.rollDice(1, diceFaces),1,diceFaces), true);
    });
});

describe(`test player score method`, () => {
    const player = new Player(0);
    it(`should player.score equal to value (score) in parameter`, () => {
        player.setScore(0);
        assert.equal(player.score, 0);
        player.setScore(2);
        assert.equal(player.score, 2);
        player.setScore(100);
        assert.equal(player.score, 100);
    });
});

describe(`test player roundScore method`, () => {
    const player = new Player(0);
    it(`should player.roundScore equal to value (score) in parameter`, () => {
        player.setRoundScore(0);
        assert.equal(player.roundScore, 0);
        player.setRoundScore(2);
        assert.equal(player.roundScore, 2);
        player.setRoundScore(100);
        assert.equal(player.roundScore, 100);
    });
});

describe(`test player holdScore method`, () => {
    const player = new Player(0);
    it(`should player.score equal to score + roundScore`, () => {
        player.holdScore();
        assert.equal(player.score, 0);

        let score = 0;
        let roundScore = 2; 
        player.setRoundScore(roundScore);
        player.setScore(score)
        player.holdScore();
        assert.equal(player.score, score + roundScore);

        score = 3;
        roundScore = 4; 
        player.setRoundScore(roundScore);
        player.setScore(score)
        player.holdScore();
        assert.equal(player.score, score + roundScore);
    });
    it(`should player.roundScore reinit to 0`, () => {
        player.holdScore();
        assert.equal(player.roundScore, 0);
    });
});

// Tests Player Class - End /////////////////////

// Tests DiceGame Class - Start /////////////////////

describe(`test diceGame constructor`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    
    it(`should set two new players`, () => {
        assert.equal(diceGame.player1, player1);
        assert.equal(diceGame.player2, player2);
    });
    it(`should set diceFaces to 6`, () => {
        assert.equal(diceGame.diceFaces, 6);
    });
    it(`should set maxScore to 100`, () => {
        assert.equal(diceGame.maxScore, 100);
    });
    it(`should set currentPlayerNb to 0`, () => {
        assert.equal(diceGame.currentPlayerNb, 0);
    });
    it(`should set currentPlayer to undefined`, () => {
        assert.equal(diceGame.currentPlayer, undefined);
    });
    it(`should set diceValue to 0`, () => {
        assert.equal(diceGame.diceValue, 0);
    });
    it(`should set inGame to false`, () => {
        assert.equal(diceGame.inGame, false);
    });
    it(`should set newGameButton to enabled`, () => {
        assert.equal(diceGame.newGameButtonEnabled, true);
    });
    it(`should set rollButton to enabled`, () => {
        assert.equal(diceGame.rollButtonEnabled, false);
    });
    it(`should set holdButton to enabled`, () => {
        assert.equal(diceGame.holdButtonEnabled, false);
    });
});

describe(`test diceGame startGame method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    it(`should set in game to true`, () => {
        assert.equal(diceGame.inGame, true);
    });
    it(`should set dice value to 0`, () => {
        assert.equal(diceGame.diceValue, 0);
    });
    it(`should reset players score`, () => {
        assert.equal(diceGame.player1.score, 0);
        assert.equal(diceGame.player1.roundScore, 0);
        assert.equal(diceGame.player2.score, 0);
        assert.equal(diceGame.player2.roundScore, 0);
    });
    it(`should set current player nb to player 1`, () => {
        assert.equal(diceGame.currentPlayerNb, 1);
    });
    it(`should set currentPlayer to player1`, () => {
        assert.equal(diceGame.currentPlayer, player1);
    });
    it(`should set newGameButton to enabled`, () => {
        assert.equal(diceGame.newGameButtonEnabled, true);
    });
    it(`should set rollButton to enabled`, () => {
        assert.equal(diceGame.rollButtonEnabled, true);
    });
    it(`should set holdButton to enabled`, () => {
        assert.equal(diceGame.holdButtonEnabled, false);
    });
});

describe(`test diceGame roll method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    diceGame.roll();
    
    it(`should diceValue in range 1-6 (included)`, () => {
        if (diceGame.diceValue === 0) {
            assert.equal(testIntInRange(diceGame.diceValue, 1, 6), false);
        } else {
            assert.equal(testIntInRange(diceGame.diceValue, 1, 6), true);
        }
    });
    it(`should current player round score equal to dice value, if diceValue != 0 -> 0`, () => {
        if (diceGame.diceValue === 0) {
            assert.equal(diceGame.currentPlayer.roundScore, 0);
        } else {
            assert.equal(diceGame.currentPlayer.roundScore, diceGame.diceValue);
        }
    });
    it(`should set rollButton to enabled`, () => {
        assert.equal(diceGame.rollButtonEnabled, true);
    });
    it(`should set holdButton to enabled, if diceValue != 0 -> false`, () => {
        if (diceGame.diceValue === 0) {
            assert.equal(diceGame.holdButtonEnabled, false);
        } else {
            assert.equal(diceGame.holdButtonEnabled, true);
        }
    });
    it(`should toggle current player if diceValue == 0`, () => {
        if (diceGame.diceValue === 0) {
            assert.equal(diceGame.currentPlayer, player2);
        } else {
            assert.equal(diceGame.currentPlayer, player1);
        }
    });
});

describe(`test diceGame hold method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();

    it(`should current player score equal to score + round score`, () => {
        diceGame.currentPlayer = player1;
        diceGame.player1.score = 0;
        diceGame.player1.roundScore = 0;
        diceGame.hold();
        assert.equal(diceGame.player1.score, 0);
        diceGame.currentPlayer = player1;
        diceGame.player1.score = 1;
        diceGame.player1.roundScore = 3;
        diceGame.hold();
        assert.equal(diceGame.player1.score, 4);
        diceGame.currentPlayer = player1;
        diceGame.player1.score = 98;
        diceGame.player1.roundScore = 1;
        diceGame.hold();
        assert.equal(diceGame.player1.score, 99);
    });

    it(`should current player change if player don't win`, () => {
        diceGame.currentPlayer = player1;
        diceGame.player1.score = 0;
        diceGame.player1.roundScore = 2;
        diceGame.hold();
        //assert.equal(diceGame.currentPlayer, player2);
        //assert.equal(diceGame.player1.score, 'WIN');
        //assert.equal(diceGame.currentPlayerNb, 2);
    });
    
    it(`should current player score equal to 'WIN' (if score >= maxscore)`, () => {
        diceGame.currentPlayer = player1;
        diceGame.player1.score = 94;
        diceGame.player1.roundScore = 6;
        diceGame.hold();
        assert.equal(diceGame.player1.score, 'WIN');
        diceGame.currentPlayer = player1;
        diceGame.player1.score = 99;
        diceGame.player1.roundScore = 2;
        diceGame.hold();
        assert.equal(diceGame.player1.score, 'WIN');
    });
});

describe(`test diceGame initDiceValue method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    diceGame.diceValue = 2;
    
    it(`should diceValue equal to 0`, () => {
        diceGame.initDiceValue();
        assert.equal(diceGame.diceValue, 0);
    });
});

describe(`test diceGame initPlayersScore method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    diceGame.player1.score = 1;
    diceGame.player1.roundScore = 2;
    diceGame.player2.score = 3;
    diceGame.player2.roundScore = 4;
    diceGame.initPlayersScore();

    it(`should all players scores equal to 0`, () => {
        assert.equal(diceGame.player1.score, 0);
        assert.equal(diceGame.player1.roundScore, 0);
        assert.equal(diceGame.player2.score, 0);
        assert.equal(diceGame.player2.roundScore, 0);
    });
});

describe(`diceGame setCurrentPlayer method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();

    it(`should set currentPlayerNb and currentPlayer relative to value nb(in parameter)`, () => {
        diceGame.setCurrentPlayer(1);
        assert.equal(diceGame.currentPlayerNb, 1);
        assert.equal(diceGame.currentPlayer, player1);
        diceGame.setCurrentPlayer(2);
        assert.equal(diceGame.currentPlayerNb, 2);
        assert.equal(diceGame.currentPlayer, player2);
    });
});

describe(`test diceGame toggleCurrentPlayer method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    
    it(`should change currenPlayert to player2 if player1`, () => {
        diceGame.currentPlayer = player1;
        diceGame.toggleCurrentPlayer();
        assert.equal(diceGame.currentPlayerNb, 2);
        assert.equal(diceGame.currentPlayer, player2);
    });

    it(`should change currentPlayer to player1 if player2`, () => {
        diceGame.currentPlayer = player2;
        diceGame.toggleCurrentPlayer();
        assert.equal(diceGame.currentPlayerNb, 1);
        assert.equal(diceGame.currentPlayer, player1);
        
    });
});

describe(`test diceGame initButtonsState method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    diceGame.rollButtonEnabled = true;
    diceGame.holdButtonEnabled = true;

    it(`should set roll and hold buttons state to false`, () => {
        diceGame.initButtonsState();
        assert.equal(diceGame.rollButtonEnabled, false);
        assert.equal(diceGame.holdButtonEnabled, false);
    });
});

describe(`test diceGame newRoundButtonsState method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    diceGame.rollButtonEnabled = false;
    diceGame.holdButtonEnabled = true;
    
    it(`should set roll and hold buttons state to false`, () => {
        diceGame.newRoundButtonsState();
        assert.equal(diceGame.rollButtonEnabled, true);
        assert.equal(diceGame.holdButtonEnabled, false);
    });
});

describe(`test diceGame retryRoundButtonsState method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    diceGame.rollButtonEnabled = false;
    diceGame.holdButtonEnabled = false;
    
    it(`should set roll and hold buttons state to false`, () => {
        diceGame.retryRoundButtonsState();
        assert.equal(diceGame.rollButtonEnabled, true);
        assert.equal(diceGame.holdButtonEnabled, true);
    });
});

describe(`test diceGame isWinner method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    
    it(`should return true if player1 win`, () => {
        diceGame.player1.score = 'WIN';
        diceGame.player2.score = 75;
        assert.equal(diceGame.isWinner(player1), true);
        assert.equal(diceGame.isWinner(player2), false);
    });
    it(`should return true if player2 win`, () => {
        diceGame.player1.score = 83;
        diceGame.player2.score = 'WIN';
        assert.equal(diceGame.isWinner(player1), false);
        assert.equal(diceGame.isWinner(player2), true);
    });
    it(`should reset game state if a player win`, () => {
        diceGame.player1.score = 'WIN';
        diceGame.isWinner(player1);
        assert.equal(diceGame.rollButtonEnabled, false);
        assert.equal(diceGame.holdButtonEnabled, false);
        assert.equal(diceGame.currentPlayer, undefined);
        assert.equal(diceGame.currentPlayerNb, 0);
        assert.equal(diceGame.inGame, false);
    });
});

describe(`test diceGame resetGame method`, () => {
    const player1 = new Player(1);
    const player2 = new Player(2);
    const diceGame = new DiceGame(player1, player2);
    diceGame.startGame();
    diceGame.player1.score = 83;
    diceGame.player1.roundScore = 0;
    diceGame.player2.score = 'WIN';
    diceGame.player2.roundScore = 0;
    diceGame.initPlayersScore();
    diceGame.rollButtonEnabled = true;
    diceGame.holdButtonEnabled = true;

    diceGame.resetGame();
    it(`should roll and hold buttons state is false`, () => {
        assert.equal(diceGame.rollButtonEnabled, false);
        assert.equal(diceGame.holdButtonEnabled, false);
    });

    it(`should current player undefined`, () => {
        assert.equal(diceGame.currentPlayer, undefined);
        assert.equal(diceGame.currentPlayerNb, 0);
    });

    it(`should inGame false`, () => {
        assert.equal(diceGame.inGame, false);
    });
});

// Tests DiceGame Class - End /////////////////////