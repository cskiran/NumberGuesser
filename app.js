// player must guess number btw min max
// player get certain number of guesses
// notify of the guess remaining
// notify correct num if he loose
// play agian

let min = 1,
  max = 10,
  winningnumber = getWinningNum(min, max),
  guessLeft = 3;


//UI element

const game = document.getElementById('game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

//Play again event listner
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

//listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);
  console.log(isNaN(guess));
  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`please enter a number between ${min} and ${max}`, 'red');
  }

  //check for win
  else if (guess === winningnumber) {

    gameOver(true, `${winningnumber} is correct,U WIN!`)
  } else {
    //wrong number 
    guessLeft -= 1;

    console.log(guessLeft);
    if (guessLeft === 0) {

      gameOver(false, `game over correct answer is ${winningnumber}`);

    } else {
      //game continues
      guessInput.style.borderColor = 'red';

      guessInput.value = '';

      setMessage(`${guess} is not correct,${guessLeft} guesses left`, 'red');
    }
  }
});

function gameOver(won, msg) {

  let color;

  won === true ? color = 'green' : color = 'red';

  //disable input
  guessInput.disabled = true;

  //change border color
  guessInput.style.borderColor = color;

  setMessage(msg, color);

  guessBtn.value = 'Play Again';

  guessBtn.className += 'play-again';
}

function getWinningNum(min, max) {

  return (Math.floor(Math.random() * (max - min + 1) + min));
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

