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

const toggleModal = () => {
    modal.setAttribute('hidden');
    modal.toggleAttribute('hidden');
}

const setModalText = (text) => {
    modalText.innerText = text;
}

const showModal = (text) => {
    modal.removeAttribute('hidden');
    modalText.innerText = text;
}

const hideModal = () => {
    modal.setAttribute('hidden', '');
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

modalButton.addEventListener('click', () => {
    hideModal();
});