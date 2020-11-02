const userChoices = document.querySelectorAll('[data-choice]');
const playerScore = document.querySelector('[data-score-player]');
const cpuScore = document.querySelector('[data-score-cpu]');
const result = document.querySelector('[data-result]');
const playerHand = document.querySelector('.game__player-hand');
const cpuHand = document.querySelector('.game__cpu-hand');
const hands = document.querySelectorAll('.game__result-hands > img');
const playerName = document.querySelector('[data-name]');
const playerAvatar = document.querySelector('[data-avatar]');
const winnerImage = document.querySelector('[data-winner-image]');
const winnerResult = document.querySelector('[data-winner]');
const resultSection = document.querySelector('.result');
const gameSection = document.querySelector('.game');
const menuSection = document.querySelector('.menu');
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

const userWin = () => {
    setTimeout(() => {
        gameSection.classList.remove('active');
        resultSection.classList.add('active');
        winnerImage.src = `assets/img/result-win.png`;
        winnerResult.textContent = `YOU WON! CONGRATULATIONS ${playerName.textContent}!`;
    }, 1000);
}

const cpuWin = () => {
    setTimeout(() => {
        gameSection.classList.remove('active');
        resultSection.classList.add('active');
        winnerImage.src = `assets/img/result-lost.png`;
        winnerResult.textContent = `${playerName.textContent} LOST. CPU WINS!`;
    }, 1000);
}

const win = (userChoice, cpuChoice) => {
    handDrawAnimation();
    setTimeout(() => {
        userScore++;
        playerScore.textContent = userScore;
        result.textContent = `${userChoice} smashes ${cpuChoice}. Player win!`;
        userScore == pointLimit ? userWin() : '';
        updateImages(userChoice, cpuChoice);
        playerScore.classList.add('active');
        result.classList.add('win');
    }, 1000);
}

const lose = (userChoice, cpuChoice) => {
    handDrawAnimation();
    setTimeout(() => {
        computerScore++;
        cpuScore.textContent = computerScore;
        result.textContent = `${cpuChoice} smashes ${userChoice}. Cpu win!`;
        computerScore == pointLimit ? cpuWin() : '';
        updateImages(userChoice, cpuChoice);
        cpuScore.classList.add('active');
        result.classList.add('lose');
    }, 1000)
}

const tie = (userChoice, cpuChoice) => {
    handDrawAnimation();    
    setTimeout(() => {
        result.textContent = `It's a tie!`;
        updateImages(userChoice, cpuChoice);
    }, 1000)
}

function game(event) {
    const eventTarget = event.target.parentElement;
    eventTarget.style.pointerEvents = 'none'; // Prevent clicking on userChoice buttons
    const userChoice = this.dataset.choice;
    const cpuChoice = getComputerChoice();

    // Disable all animations when handDraw animation ends
    hands.forEach(hand => {
        hand.addEventListener('animationend', () => {
            hand.style.animation = '';
            eventTarget.style.pointerEvents = 'auto'; // Enable clicking on userChoice buttons after animation ends
            result.classList.remove('win');
            result.classList.remove('lose');
            playerScore.classList.remove('active');
            cpuScore.classList.remove('active');
        })
    })

    // Game logic
    switch(userChoice + cpuChoice) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            win(userChoice, cpuChoice);
            break;
        case 'scissorsrock':
        case 'rockpaper':
        case 'paperscissors':
            lose(userChoice, cpuChoice);
            break;
        default: 
            tie(userChoice, cpuChoice);
            break;
    }
}

userChoices.forEach(choice => {
    choice.addEventListener('click', game);
})


/* Settings & start game*/
const settingsButton = document.querySelector('[data-settings]');
const startButton = document.querySelector('[data-start]');
const menuStartSection = document.querySelector('.menu__start');
const settingsSection = document.querySelector('.menu__settings');
const form = document.querySelector('.menu__form');

// Disable start menu and show settings modal
const gameSettings = () => {
    menuStartSection.classList.add('disable');
    settingsSection.classList.add('active');
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