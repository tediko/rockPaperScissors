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

function game() {
    const userChoice = this.dataset.choice;
    const cpuChoice = getComputerChoice();

    switch(userChoice + cpuChoice) {
        case 'rockscissors':
        case 'paperrock':
        case 'scissorspaper':
            console.log('user win');
            break;
        case 'scissorsrock':
        case 'rockpaper':
        case 'paperscissors':
            console.log('cpu win');
            break;
        default: 
            console.log('tie');
            break;
    }
}

userChoices.forEach(choice => {
    choice.addEventListener('click', game);
})
