// VIEW CONSTANTS

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
const darkDiceImage = document.getElementById('dark-dice-img');

const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalButton = document.getElementById('modal-button');


// VIEW FUNCTIONS

const setRollButtonEnable = (enable) => {
    if (enable) {
        rollButton.removeAttribute('disabled');
        rollButton.classList.add('group', 'transition', 'ease-in-out', 'duration-200', 'hover:scale-105');
        rollButtonIcon.classList.remove('stroke-gray');
        rollButtonIcon.classList.remove('dark:stroke-light-gray');
        rollButtonIcon.classList.add('stroke-red'); 
        rollButtonIcon.classList.add('dark:stroke-red');
    } else {
        rollButton.setAttribute('disabled', '');
        rollButton.classList.remove('group', 'transition', 'ease-in-out', 'duration-200', 'hover:scale-105');
        rollButtonIcon.classList.add('stroke-gray');
        rollButtonIcon.classList.add('dark:stroke-light-gray');
        rollButtonIcon.classList.remove('stroke-red'); 
        rollButtonIcon.classList.remove('dark:stroke-red');
    }
    
}

const setHoldButtonEnable = (enable) => {
    if (enable) {
        holdButton.removeAttribute('disabled');
        holdButton.classList.add('group', 'transition', 'ease-in-out', 'duration-200', 'hover:scale-105');
        holdButtonIcon.classList.remove('stroke-gray');
        holdButtonIcon.classList.remove('dark:stroke-light-gray');
        holdButtonIcon.classList.add('stroke-red'); 
        holdButtonIcon.classList.add('dark:stroke-red');
    } else {
        holdButton.setAttribute('disabled', '');
        holdButton.classList.remove('group', 'transition', 'ease-in-out', 'duration-200', 'hover:scale-105');
        holdButtonIcon.classList.add('stroke-gray');
        holdButtonIcon.classList.add('dark:stroke-light-gray');
        holdButtonIcon.classList.remove('stroke-red'); 
        holdButtonIcon.classList.remove('dark:stroke-red');
    }
    
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
    diceImage.srcset = `./images/dice/Dice-${nb}.svg`;
    darkDiceImage.srcset = `./images/dice/Dice-dark-${nb}.svg`;
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
