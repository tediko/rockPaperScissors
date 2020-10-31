const userChoices = document.querySelectorAll('[data-choice]');
const playerScore = document.querySelector('[data-score-player]');
const cpuScore = document.querySelector('[data-score-cpu]');
const result = document.querySelector('[data-result]');
let userScore = 0;
let computerScore = 0;


userChoices.forEach(choice => {
    choice.addEventListener('click', game);
})