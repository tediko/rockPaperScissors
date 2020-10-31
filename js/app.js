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

const win = (userChoice, cpuChoice) => {
    userScore++;
    playerScore.textContent = userScore;
    result.textContent = `${userChoice} smashes ${cpuChoice}. Player win!`;
    playerScore.classList.add('active');
    setTimeout(() => {
        playerScore.classList.remove('active');
    }, 150)
}
const lose = (userChoice, cpuChoice) => {
    computerScore++;
    cpuScore.textContent = computerScore;
    result.textContent = `${cpuChoice} smashes ${userChoice}. Cpu win!`;
    cpuScore.classList.add('active');
    setTimeout(() => {
        cpuScore.classList.remove('active');
    }, 150)
}
const tie = () => {
    result.textContent = `It's a tie!`;
}

function game() {
    const userChoice = this.dataset.choice;
    const cpuChoice = getComputerChoice();

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
            tie();
            break;
    }
}

userChoices.forEach(choice => {
    choice.addEventListener('click', game);
})