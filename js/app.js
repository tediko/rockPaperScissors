const userChoices = document.querySelectorAll('[data-choice]');
const playerScore = document.querySelector('[data-score-player]');
const cpuScore = document.querySelector('[data-score-cpu]');
const result = document.querySelector('[data-result]');
let userScore = 0;
let computerScore = 0;

const getComputerChoice = () => {
    const choices = ['rock', 'paper', 'scissors'];
    const cpuChoice = Math.floor(Math.random() * choices.length);
    return choices[cpuChoice];
}

const win = () => {
    userScore++;
    playerScore.textContent = userScore;
}
const lose = () => {
    computerScore++;
    cpuScore.textContent = computerScore;
}
const tie = () => {
    console.log('tie');
}

function game() {
    const userChoice = this.dataset.choice;
    const cpuChoice = getComputerChoice();

    switch(userChoice + cpuChoice) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            win();
            break;
        case 'scissorsrock':
        case 'rockpaper':
        case 'paperscissors':
            lose();
            break;
        default: 
            tie();
            break;
    }
}

userChoices.forEach(choice => {
    choice.addEventListener('click', game);
})