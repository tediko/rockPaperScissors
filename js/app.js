const userChoices = document.querySelectorAll('[data-choice]');
const playerScore = document.querySelector('[data-score-player]');
const cpuScore = document.querySelector('[data-score-cpu]');
const result = document.querySelector('[data-result]');
const playerHand = document.querySelector('.game__player-hand');
const cpuHand = document.querySelector('.game__cpu-hand');
const hands = document.querySelectorAll('.game__result-hands > img')
let userScore = 0;
let computerScore = 0;

const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const cpuChoice = Math.floor(Math.random() * choices.length);
    return choices[cpuChoice];
}

const win = (userChoice, cpuChoice) => {
    playerHand.style.animation = `handDraw 1500ms`;
    cpuHand.style.animation = `handDrawRotate 1500ms`;
    setTimeout(() => {
        userScore++;
        playerScore.textContent = userScore;
        result.textContent = `${userChoice} smashes ${cpuChoice}. Player win!`;

        playerHand.src = `assets/img/result-${userChoice}.png`;
        cpuHand.src = `assets/img/result-${cpuChoice}.png`;
        playerScore.classList.add('active');
    }, 1000)
    

    // result text animation
    /* result.classList.remove('lose');
    result.classList.add('win');
    setTimeout(() => {
        playerScore.classList.remove('active');
    }, 150) */
}
const lose = (userChoice, cpuChoice) => {
    playerHand.style.animation = `handDraw 1500ms`;
    cpuHand.style.animation = `handDrawRotate 1500ms`;

    setTimeout(() => {
        computerScore++;
        cpuScore.textContent = computerScore;
        result.textContent = `${cpuChoice} smashes ${userChoice}. Cpu win!`;

        playerHand.src = `assets/img/result-${userChoice}.png`;
        cpuHand.src = `assets/img/result-${cpuChoice}.png`;
        cpuScore.classList.add('active');
    }, 1000)


    // result text animation
    /* result.classList.remove('win');
    result.classList.add('lose');
    setTimeout(() => {
        cpuScore.classList.remove('active');
    }, 150) */
}
const tie = (userChoice, cpuChoice) => {
    playerHand.style.animation = `handDraw 1500ms`;
    cpuHand.style.animation = `handDrawRotate 1500ms`;
    
    setTimeout(() => {
        result.textContent = `It's a tie!`;

        playerHand.src = `assets/img/result-${userChoice}.png`;
        cpuHand.src = `assets/img/result-${cpuChoice}.png`;
    }, 1000)

    // result text animation
    /* result.classList.add('active');
    setTimeout(() => {
        result.classList.remove('active');
    }, 150) */
}

function game() {
    const userChoice = this.dataset.choice;
    const cpuChoice = getComputerChoice();
    hands.forEach(hand => {
        hand.addEventListener('animationend', () => {
            hand.style.animation = '';
        })
    })

    // result text animation
    /* result.classList.remove('lose');
    result.classList.remove('win'); */

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