// Assigning all variables
const playerGreen = 'green'
const playerBlue = 'blue'
const playerToken1 = 'player1'
const playerToken2 = 'player2'
const threeInALine = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const ResetRoundBtn = document.querySelector('.refresh-game')
const refreshPage = document.querySelector('.refresh-page')
const startGameBtn = document.querySelector('.start-game')
const boxesGrid = document.querySelectorAll('[data-box]')
const gameMessage = document.querySelector('.game-message')
const topMessage = document.querySelector('.top-message')
const boxTicTacToe = document.querySelectorAll('.box-tictactoe')
const popUp = document.querySelector('.popup-page')
let keepScoreGreen = document.querySelector('.score-green')
let keepScoreBlue = document.querySelector('.score-blue')
let player1Name = document.querySelector('.score-name1')
let player2Name = document.querySelector('.score-name2')
let img = document.createElement('img')
let playerTurn = false
let scoreBlue = 0
let scoreGreen = 0
img.src = 'Aiman Icon.png'

// block.appendChild('img')
// Bottom up function - program starts only with a click of button
// the result of the game with messages and upgrading of score
function resultGame(result) {
  if (result) {
    gameMessage.textContent = 'its a draw'
  } else {
    if (playerTurn) {
      scoreBlue++
      keepScoreBlue.textContent = scoreBlue
    } else {
      scoreGreen++
      keepScoreGreen.textContent = scoreGreen
    }
  }
  gameMessage.innerHTML = `${playerTurn ? "Blue" : "Green"} wins!<br>Continue Playing to Round ${scoreBlue + scoreGreen + 1}`
  topMessage.textContent = `Round ${scoreBlue + scoreGreen}`
  endRound()
}
// checks any player with three in a line > to win, everytime
function checkWin(player) {
  return threeInALine.some(combination => {
    return combination.every(i => {
      return boxesGrid[i].classList.contains(player)
    })
  })
}
// checks board whether its fully clicked
function checkDraw() {
  return [...boxesGrid].every(box => {
    return box.classList.contains(playerGreen) || box.classList.contains(playerBlue)
  })
}
// changes turn evertime if theres no win or draw
function changeTurns() {
  playerTurn = !playerTurn
}
// message after pressing Start or Reset
function playerTurnStartMessage(greenOrBlue) {
  if (greenOrBlue) {
    gameMessage.innerHTML = 'Blues Turn<br>Good Luck!'
  } else {
    gameMessage.innerHTML = 'Greens Turn<br>Good Luck!'
  }
  topMessage.textContent = `Round ${scoreBlue + scoreGreen}`
}
//  show the player's turn
function playerTurnMessage(greenOrBlue) {
  if (greenOrBlue) {
    gameMessage.textContent = 'Greens Turn'
  } else {
    gameMessage.textContent = 'Blues Turn'
  }
}
// blue and green appearing in targeted boxes
function fillTicTac(boxClicked, player) {
  if (player == 'player 1') {
    boxClicked.getElementsByClassName('.box-tictactoe').innerHTML = '<img width="100" height="100" src="Aiman Icon.png">'
  } else if (player == 'player2') {
    // boxClicked.classList.innerHTML(player) = '<img width="100" height="100" src="Aiman Icon.png">'
  } else {
    boxClicked.classList.add(player)
    console.log(player)
  }
}
  // = '<img width="100" height="100" src="Aiman Icon.png">';
// can only click once in box
function playerClickOnce(boxClicked, player) {
  if (boxClicked.classList.contains(player)) {
    gameMessage.innerHTML = 'TicTac Taken!'
    changeTurns()
  } else if (boxClicked.classList.contains(player)) {
    gameMessage.innerHTML = 'TicTac Taken!'
    changeTurns()
  } else {
    fillTicTac(boxClicked, player)
    playerTurnMessage(playerTurn)
  }
}
// the boards function is here
// So theres no additional clicks after a finished round
function endRound() {
  boxesGrid.forEach(box => {
    box.classList.remove(playerGreen)
    box.classList.remove(playerBlue)
  })
}

function handleClick(event) {
  const boxClicked = event.target
  let player
  if (token1.value == 'on') {
    player = playerTurn ? playerToken1 : playerToken2
  } else {
    player = playerTurn ? playerBlue : playerGreen
  }

  playerClickOnce(boxClicked, player)
  if (checkWin(player)) {
    resultGame(false)
  } else if (checkDraw()) {
    resultGame(true)
  } else {
    changeTurns()
  }
}
// Start button once and also refreshes board everytime is pressed"
function startTicTacToe() {
  playerTurnStartMessage(playerTurn)
  boxesGrid.forEach(box => {
    box.classList.remove(playerToken1)
    box.classList.remove(playerToken2)
    box.classList.remove(playerGreen)
    box.classList.remove(playerBlue)
    scoreBlue = 0
    scoreGreen = 0
    keepScoreGreen.textContent = scoreGreen
    keepScoreBlue.textContent = scoreBlue
    box.addEventListener('click', handleClick)
  })
}
// autoplay audio
function alertPlay() {
  console.log('audio started')
}
//Buttons
ResetRoundBtn.addEventListener('click',
  startTicTacToe)

startGameBtn.addEventListener('click',
  function () {
    popUp.classList.remove('on')
    startTicTacToe()
  })

refreshPage.addEventListener('click', function () {
  location.reload()
})

