//////////
// MAIN //
//////////

// INIT
const player1 = new Player(1);
const player2 = new Player(2);
const diceGame = new DiceGame(player1, player2);

// EVENTS 

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

modalButton.addEventListener('click', () => {
    hideModal();
});
