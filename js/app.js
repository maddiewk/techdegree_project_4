
!function () {
  // HTML variables
  const start = document.getElementById("start");
  const board = document.getElementById("board");
  const title = document.getElementById("tictactoe");
  const win = document.getElementById("finish");
  const startButton = document.querySelector(".button");
  const playerOne = document.getElementById("player1");
  const playerTwo = document.getElementById("player2");
  const ul = document.querySelector(".boxes");
  let boxes = document.querySelectorAll(".box");
  let message = document.querySelector(".message");

// array to hold all possible winning combinations
  let winCombinations = [
    [boxes[0], boxes[1], boxes[2]],
    [boxes[3], boxes[4], boxes[5]],
    [boxes[6], boxes[7], boxes[8]],
    [boxes[0], boxes[3], boxes[6]],
    [boxes[1], boxes[4], boxes[7]],
    [boxes[2], boxes[5], boxes[8]],
    [boxes[0], boxes[4], boxes[8]],
    [boxes[2], boxes[4], boxes[6]]
  ];


// arrays to hold each player's moves
// let playerOneMoves = [];
// let playerTwoMoves = [];

  // hide game board and show start screen
  board.style.display = "none";
  win.style.display = "none";

  // user input
  $("#player1name").focus();

  function getName(event) {
    let inputValue = document.getElementById("player1name").value;
    $("#player1").append(inputValue);
    $("#player2").append("Player Two");
  }
  // when the start button is clicked, display the game board and player one's name
  startButton.onclick = function() {
    board.style.display = "";
    start.style.display = "none";
    getName();
  // automatically set first player to O
    playerOne.className += " active";
  }

  // players trade turns
  // each time a square is clicked, it becomes disabled
  ul.addEventListener("click", (event) => {
    if (playerOne.classList.contains("active") && event.target.className === "box") {
      playerTwo.classList.add("active");
      playerOne.classList.remove("active");
      event.target.classList.add("box-filled-1");
      event.target.classList.add("disabled");
      playerOneMoves.push(event.target);
    } else  if (playerTwo.classList.contains("active")) {
      playerOne.classList.add("active");
      playerTwo.classList.remove("active");
      event.target.classList.add("box-filled-2");
      event.target.classList.add("disabled");
      playerTwoMoves.push(event.target);
    }
  });

  // highlight current player's symbol when mouse hovers over squares
ul.onmouseover = (event) => {
  if (event.target.className === "box box-filled-1 disabled" || event.target.className === "box box-filled-2 disabled") {
    return;
  }
  if (playerOne.className === "players active") {
    event.target.style.backgroundImage = 'url("./img/o.svg")';
  } else {
    event.target.style.backgroundImage = 'url("./img/x.svg")';
  }
};

ul.onmouseout = (event) => {
  if (event.target.className === "box box-filled-1 disabled" || event.target.className === "box box-filled-2 disabled") {
    return;
  }
  if (playerOne.className === "players active") {
    event.target.style.backgroundImage = "";
  } else {
    event.target.style.backgroundImage = "";
  }
};





// different strategy for win, lose, or tie

// let winner = [];
//
// function decideWinner() {
//   winner.push([0,1,2]);
//   winner.push([3,4,5]);
//   winner.push([6,7,8]);
//   winner.push([0,3,6]);
//   winner.push([1,4,7]);
//   winner.push([2,5,8]);
//   winner.push([0,4,8]);
//   winner.push([2,4,6]);
// }

let playerOneMoves = [];
let playerTwoMoves = [];
let size = 3;


function calculate() {
  let isWin = checkForWinner();
  if (isWin) {
    board.style.display = "none";
    win.style.display = "";
  }
}


function checkForWinner() {
  let win = false;
  let playerSelections = [];

  if (playerOne.classList.contains("active")) {
    playerSelections = playerOneMoves;
  } else {
    playerSelections = playerTwoMoves;
  }
  if (playerSelections.length === size) {
    for (let i = 0; i < winCombinations.length; i++) {
      let sets = winCombinations[i];
      let setFound = true;
    }
    for (let j = 0; j < sets.length; j++) {
      let found = false;
    }
    for (let k = 0; k < playerSelections.length; k++) {
      if (sets[j] === playerSelections[k]) {
        found = true;
        break;
      }
    }
    if (setFound == true) {
      win = true;
      break;
    }
  }
  return win;
}



















// add programming for win, lose, or draw
// const winGame = (winCombinations, checkedBoxes) => {
//   for (let i = 0; i < winCombinations.length; i++) {
//     if (winCombinations[i].every(move => checkedBoxes.indexOf(move) != -1)) {
//       return true;
//     }
//     return false;
//     }
//   }
//
// // show winner
// const showWinner = (player, playerMoves) => {
//   if (winGame(winCombinations, playerOneMoves) === true) {
//     board.style.display = "none";
//     win.style.display = "";
//     message.textContent = "Player 1 wins!";
//   } else if (winGame(winCombinations, playerTwoMoves) === true) {
//     board.style.display = "none";
//     win.style.display = "";
//     message.textContent = "Player 2 wins!";
//   }
// }




} ();
