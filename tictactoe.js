const threeInALine = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ]
]
const refreshPage = document.querySelector('.refresh-page')
const startGameBtn = document.querySelector('.start-game')
const gameMessage = document.querySelector('.game-message')
const topMessage = document.querySelector('.top-message')
const boxTicTacToe = document.querySelectorAll('.box-tictactoe')
const newGameBtn = document.querySelector('.new-game-btn')
const newGamePopUp = document.querySelector('.new-game')
const player1 = document.querySelector('#player1-input')
const player2 = document.querySelector('#player2-input')
const noOfRounds = document.querySelector('#total-rounds')
const closePage = document.querySelector('.close-page')
const audioOn = document.querySelector('.audio-controls')
const winRoundCelebration = document.querySelector('.win-round')
const winPagePop = document.querySelector('.winning-page')
let player1Display = document.querySelector('.display-player1')
let player2Display = document.querySelector('.display-player2')
let keepScoreGreen = document.querySelector('.score-green')
let keepScoreBlue = document.querySelector('.score-blue')
let keepScoreDraw = document.querySelector('.score-draw')
let isGreen = false

function resultGame(result) {
  if (result) {
    gameMessage.textContent = 'its a draw'
    scoreDraw++
    keepScoreDraw.textContent = scoreDraw
  } else {
    if (isGreen) {
      scoreGreen++
      keepScoreGreen.textContent = scoreGreen
    } else {
      scoreBlue++
      keepScoreBlue.textContent = scoreBlue
    }
    let countNextRound = scoreBlue + scoreGreen + scoreDraw + 1
    gameMessage.innerHTML = `${isGreen ? player1.value : player2.value} wins!<br>Continue Playing to Round ${countNextRound}`
  }
  endRound(scoreBlue, scoreGreen, scoreDraw)
}

function checkWin() {
  return threeInALine.some(combination => {
    return combination.every(i => {
      return boxTicTacToe[ i ].classList.contains(isGreen ? 'green' : 'blue')
    })
  })
}

function checkDraw() {
  return [ ...boxTicTacToe ].every(box => {
    return box.classList.contains('green') || box.classList.contains('blue')
  })
}

function changeTurns() {
  isGreen = !isGreen
}

function isGreenStartMessage() {
  gameMessage.textContent = isGreen ? `${player1.value}'s Turn. Good Luck!` : `${player2.value}'s Turn. Good Luck!`
  topMessage.textContent = 'Starting Round'
  startGameBtn.textContent = 'Reset'
}

function isGreenMessage() {
  gameMessage.textContent = isGreen ? `${player2.value}'s Turn` : `${player1.value}'s Turn`
}

function fillTicTac(boxClicked) {
  boxClicked.classList.add(isGreen ? 'green' : 'blue')
}

function playerClickOnce(boxClicked) {
  if (boxClicked.classList.length > 1) {
    gameMessage.textContent = 'TicTac Taken!'
    changeTurns()
  } else {
    isGreenMessage()
    fillTicTac(boxClicked)
  }
}

function handleGame(event) {
  const boxClicked = event.target
  playerClickOnce(boxClicked)
  if (checkWin()) resultGame(false)
  if (checkDraw()) resultGame(true)
  changeTurns()
}

function endRound(scoreBlue, scoreGreen, scoreDraw) {
  let countRounds = scoreBlue + scoreGreen + scoreDraw
  topMessage.textContent = `Round ${countRounds}`
  if (countRounds == totalRounds) {
    winPagePop.textContent = (scoreGreen == scoreBlue) ? `Its a Draw!!!`
      : scoreBlue > scoreGreen ? `Yay ${player2.value} wins the game!!!`
        : `Yay ${player1.value} wins the game!!!`
    winRoundCelebration.classList.add('on')
    audioOn.classList.remove('on')
  }
  removeFill()
}

function removeFill() {
  boxTicTacToe.forEach(box => {
    box.classList.remove('green')
    box.classList.remove('blue')
  })
}

function startBtnTicTacToe() {
  isGreenStartMessage()
  boxTicTacToe.forEach(box => {
    removeFill()
    scoreBlue = 0
    scoreGreen = 0
    scoreDraw = 0
    keepScoreGreen.textContent = scoreGreen
    keepScoreBlue.textContent = scoreBlue
    keepScoreDraw.textContent = scoreDraw
    box.addEventListener('click', handleGame)
  })
}

startGameBtn.addEventListener('click', startBtnTicTacToe)

refreshPage.addEventListener('click', function () {
  location.reload()
})

newGameBtn.addEventListener('click', function () {
  player1Display.textContent = player1.value
  player2Display.textContent = player2.value
  totalRounds = noOfRounds.value
  newGamePopUp.classList.remove('on')
  audioOn.classList.add('on')
})

closePage.addEventListener('click', function () {
  winRoundCelebration.classList.remove('on')
})