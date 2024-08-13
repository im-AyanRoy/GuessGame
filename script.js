let targetNumber;
let attempts = 0;
const maxTrials = 15;
let remainingTrials = maxTrials;

const container = document.querySelector('.container');
let highestScore = localStorage.getItem('highestScore') ? parseInt(localStorage.getItem('highestScore')) : Infinity;

function startGame() {
	document.getElementById('guessInput').value = '';
	targetNumber = Math.floor(Math.random() * 100) + 1;
	attempts = 0;
	remainingTrials = maxTrials;
	document.getElementById('result').textContent = '';
	document.getElementById('restartButton').style.display = 'none';
	updateCounters();
}

function checkGuess() {
	const guess = parseInt(document.getElementById('guessInput').value);
	if (isNaN(guess) || guess < 1 || guess > 100) {
		document.getElementById('result').textContent = 'Please enter a number between 1 and 100.';
		return;
	}

	attempts++;
	remainingTrials--;
	updateCounters();

	if (guess === targetNumber) {
		document.getElementById('result').textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
		container.computedStyleMap.color = `blue`;


		if (attempts < highestScore) {
			highestScore = attempts;
			localStorage.setItem('highestScore', highestScore);
			updateHighestScoreDisplay();
		}

		document.getElementById('restartButton').style.display = 'block';
	} else if (guess < targetNumber) {
		document.getElementById('result').textContent = 'Too low! Try again.';
	} else {
		document.getElementById('result').textContent = 'Too high! Try again.';
	}

	if (remainingTrials <= 0 && guess !== targetNumber) {
		document.getElementById('result').textContent = `Game Over! The number was ${targetNumber}.`;
		document.getElementById('restartButton').style.display = 'block';
	}
}

function updateCounters() {
	document.getElementById('trialsCount').textContent = remainingTrials;
	updateHighestScoreDisplay();
}

function updateHighestScoreDisplay() {

	const adjustedHighestScore = highestScore <= maxTrials ? highestScore : 'N/A';
	document.getElementById('highestScoreDisplay').textContent = adjustedHighestScore === 'N/A' ? 'No high scores yet.' : `${maxTrials - adjustedHighestScore}`;
}

function restartGame() {
	startGame();
}

startGame();
