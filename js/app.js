const userChoices = document.querySelectorAll('[data-choice]');
const playerScore = document.querySelector('[data-score-player]');
const cpuScore = document.querySelector('[data-score-cpu]');
const drawMessage = document.querySelector('[data-draw-message]');
const playerHand = document.querySelector('.game__player-hand');
const cpuHand = document.querySelector('.game__cpu-hand');
const hands = document.querySelectorAll('.game__result-hands > img');
const playerName = document.querySelector('[data-name]');
const playerAvatar = document.querySelector('[data-avatar]');
const finalImage = document.querySelector('[data-final-image]');
const finalMessage = document.querySelector('[data-message]');
let handsEvents;
// Sections
const resultSection = document.querySelector('.result');
const gameSection = document.querySelector('.game');
const menuSection = document.querySelector('.menu');
// Points
let pointLimit = 0;
let userScore = 0;
let computerScore = 0;


// Random computer choice
const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const cpuChoice = Math.floor(Math.random() * choices.length);
    return choices[cpuChoice];
}

// Animate hands
const handDrawAnimation = () => {
    playerHand.style.animation = `handDraw 1500ms`;
    cpuHand.style.animation = `handDrawRotate 1500ms`;
}

// Update images
const updateImages = (userChoice, cpuChoice) => {
    playerHand.src = `assets/img/result-${userChoice}.png`;
    cpuHand.src = `assets/img/result-${cpuChoice}.png`;
}

// Reset scoreboard
const resetScore = () => {
    userScore = 0;
    computerScore = 0;
    playerScore.textContent = userScore;
    cpuScore.textContent = computerScore;
    drawMessage.textContent = `Rock paper scissors! Shoot!`;
    drawMessage.classList.remove('win');
    drawMessage.classList.remove('lose');
}

// Disable clicking on user choice hands when user||cpu win
const disableChoice = (state) => {
    userChoices.forEach(choice => {
        state ? choice.removeEventListener('click', game) : choice.addEventListener('click', game);
    })
}

// Fn to display total result after match is over
const finalGameResult = (winner) => {
    setTimeout(() => {
        gameSection.classList.remove('active');
        resultSection.classList.add('active');
        finalImage.src = `assets/img/result-${winner == 'user' ? 'win' : 'lose'}.png`;
        if (winner == 'user') {
            finalMessage.textContent = `YOU WON! CONGRATULATIONS ${playerName.textContent}!`;
        } else {
            finalMessage.textContent = `${playerName.textContent} LOST. CPU WINS!`;
        }
    }, 1000);
}

// Fn to update scores, and display score/draw result/update hand images
const displayResult = (userChoice, cpuChoice, winner) => {
    handDrawAnimation();
    setTimeout(() => {
        if (winner == 'user') {
            userScore++;
            playerScore.textContent = userScore;
            drawMessage.textContent = `${userChoice} smashes ${cpuChoice}. Player win!`;
            userScore == pointLimit ? (finalGameResult('user'), disableChoice(true)) : '';
            updateImages(userChoice, cpuChoice);
            playerScore.classList.add('active');
            drawMessage.classList.add('win');
        } else if (winner == 'cpu') {
            computerScore++;
            cpuScore.textContent = computerScore;
            drawMessage.textContent = `${cpuChoice} smashes ${userChoice}. Cpu win!`;
            computerScore == pointLimit ? (finalGameResult('cpu'), disableChoice(true)) : '';
            updateImages(userChoice, cpuChoice);
            cpuScore.classList.add('active');
            drawMessage.classList.add('lose');
        } else {
            drawMessage.textContent = `It's a tie!`;
            updateImages(userChoice, cpuChoice);
        }
    }, 1000);
}

function game(event) {
    const eventTarget = event.target.parentElement;
    handsEvents = eventTarget;
    eventTarget.style.pointerEvents = 'none'; // Prevent clicking on userChoice buttons
    const userChoice = this.dataset.choice;
    const cpuChoice = getComputerChoice();

    // Disable all animations when handDraw animation ends
    hands.forEach(hand => {
        hand.addEventListener('animationend', () => {
            hand.style.animation = '';
            eventTarget.style.pointerEvents = 'auto'; // Enable clicking on userChoice buttons after animation ends
            drawMessage.classList.remove('win');
            drawMessage.classList.remove('lose');
            playerScore.classList.remove('active');
            cpuScore.classList.remove('active');
        })
    })

    // Game logic
    switch(userChoice + cpuChoice) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            displayResult(userChoice, cpuChoice, 'user');
            break;
        case 'scissorsrock':
        case 'rockpaper':
        case 'paperscissors':
            displayResult(userChoice, cpuChoice, 'cpu');
            break;
        default: 
            displayResult(userChoice, cpuChoice, 'tie');
            break;
    }
}

userChoices.forEach(choice => {
    choice.addEventListener('click', game);
})


/* Settings & start game*/
const settingsButton = document.querySelector('[data-settings]');
const startButton = document.querySelector('[data-start]');
const againButton = document.querySelector('[data-play-again]');
const menuStartSection = document.querySelector('.menu__start');
const settingsSection = document.querySelector('.menu__settings');
const form = document.querySelector('.menu__form');

// Disable start menu and show settings modal
const gameSettings = () => {
    menuStartSection.classList.add('disable');
    settingsSection.classList.add('active');
}

const playAgain = () => {
    resetScore();
    disableChoice(false);
    menuSection.classList.remove('disable');
    resultSection.classList.remove('active');
}

// Disable settings and show game. Fn gets values from setting
const startGame = () => {
    const name = document.querySelector('.menu__player-name');
    const avatar = document.querySelector('input[name="avatar"]:checked');
    const limit = document.querySelector('input[name="points"]:checked');

    menuSection.classList.add('disable');
    gameSection.classList.add('active');

    playerName.textContent = name.value == "" ? 'player' : name.value;
    playerAvatar.src = `assets/img/scoreboard-player${avatar.value}.png`;
    pointLimit = parseFloat(limit.value);

    form.reset();
}

settingsButton.addEventListener('click', gameSettings);
startButton.addEventListener('click', startGame);
againButton.addEventListener('click', playAgain);