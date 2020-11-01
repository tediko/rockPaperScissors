const userChoices = document.querySelectorAll('[data-choice]');
const playerScore = document.querySelector('[data-score-player]');
const cpuScore = document.querySelector('[data-score-cpu]');
const result = document.querySelector('[data-result]');
const playerHand = document.querySelector('.game__player-hand');
const cpuHand = document.querySelector('.game__cpu-hand');
const hands = document.querySelectorAll('.game__result-hands > img')
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

const win = (userChoice, cpuChoice) => {
    handDrawAnimation();
    setTimeout(() => {
        userScore++;
        playerScore.textContent = userScore;
        result.textContent = `${userChoice} smashes ${cpuChoice}. Player win!`;
        // Update images
        playerHand.src = `assets/img/result-${userChoice}.png`;
        cpuHand.src = `assets/img/result-${cpuChoice}.png`;
        playerScore.classList.add('active');
        result.classList.add('win');
    }, 1000)    
}

const lose = (userChoice, cpuChoice) => {
    handDrawAnimation();
    setTimeout(() => {
        computerScore++;
        cpuScore.textContent = computerScore;
        result.textContent = `${cpuChoice} smashes ${userChoice}. Cpu win!`;
        // Update images
        playerHand.src = `assets/img/result-${userChoice}.png`;
        cpuHand.src = `assets/img/result-${cpuChoice}.png`;
        cpuScore.classList.add('active');
        result.classList.add('lose');
    }, 1000)
}

const tie = (userChoice, cpuChoice) => {
    handDrawAnimation();    
    setTimeout(() => {
        result.textContent = `It's a tie!`;
        // Update images
        playerHand.src = `assets/img/result-${userChoice}.png`;
        cpuHand.src = `assets/img/result-${cpuChoice}.png`;
    }, 1000)
}

function game(event) {
    const eventTarget = event.target.parentElement;
    eventTarget.pointerEvents = 'none'; // Prevent clicking on userChoice buttons
    const userChoice = this.dataset.choice;
    const cpuChoice = getComputerChoice();

    // Disable all animations when handDraw animation ends
    hands.forEach(hand => {
        hand.addEventListener('animationend', () => {
            hand.style.animation = '';
            e.target.parentElement.style.pointerEvents = 'auto'; // Enable clicking on userChoice buttons after animation ends
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