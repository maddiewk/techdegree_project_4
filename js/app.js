!function () {
  // HTML variables
  const start = document.getElementById("start");
  const board = document.getElementById("board");
  const win = document.getElementById("finish");
  const startButton = document.querySelector(".button");
  const playerOne = document.getElementById("player1");
  const playerTwo = document.getElementById("player2");
  const ul = document.querySelector(".boxes");
  let boxes = document.querySelectorAll(".box");
  // keep track of moves made during the game
  // let playCounter = 0;

  let player1Selections = [];
  let player2Selections = [];
  // variable to hold index number of each square
  let boxNumber;
  // all winning combinations
  const winCombinations = [
    [boxes[0], boxes[1], boxes[2]],
    [boxes[3], boxes[4], boxes[5]],
    [boxes[6], boxes[7], boxes[8]],
    [boxes[0], boxes[3], boxes[6]],
    [boxes[1], boxes[4], boxes[7]],
    [boxes[2], boxes[5], boxes[8]],
    [boxes[0], boxes[4], boxes[8]],
    [boxes[2], boxes[4], boxes[6]]
  ];

  // hide game board and show start screen
    board.style.display = "none";
    win.style.display = "none";

  // bring focus to the user name input field
  $("#player1name").focus();

  // when the start button is clicked, display the game board and player one's name
  startButton.onclick = function(event) {
    let inputValue = document.getElementById("player1name").value;

    // if no name is entered, prevent game page from loading
    if (inputValue === "") {
      $("#player1name").css("border-color", "red");
      return false;
    } else if (inputValue.length >= 1) {
      board.style.display = "";
      start.style.display = "none";
      $("#player1").prepend(inputValue).css("color", "black");
      $("#player2").prepend("Player Two").css("color", "black");

      // automatically set first player to O
      playerOne.className = "players active";
    }
  }











// function to follow player one moves
function playerOneMoves(event) {
  if (playerOne.classList.contains("active") && event.target.className === "box") {
    event.target.classList.add("box-filled-1");
    event.target.classList.add("disabled");

    player1Selections.push(event.target);
    // playCounter++;

    // after each turn, check to see if there is a win
    gameOver(playerTwo, player1Selections);
    noWinner(player1Selections);
    // let gameWon = checkForWinner();
    // gameOver(gameWon);
console.log(player1Selections);
    // switch to player two
    playerTwo.classList.add("active");
    playerOne.classList.remove("active");
  }
}

// function to control computer play
let computerMoves = function() {
  do {
    boxNumber = Math.floor(Math.random() * 9);
  } while ((playerTwo.classList.contains("active") && boxes[boxNumber].className !== "box") && (showWinner(winCombinations, player1Selections)) !== true);
  if (playerTwo.classList.contains("active") && boxes[boxNumber].className === "box") {
    boxes[boxNumber].classList.add("box-filled-2");
    boxes[boxNumber].classList.add("disabled");

    player2Selections.push(boxes[boxNumber]);
    // playCounter++;

    // after each turn, check to see if there is a win
    gameOver(playerOne, player2Selections);
    noWinner(player2Selections);
    // let gameWon = checkForWinner();
    // gameOver(gameWon);
    console.log(player2Selections);
    // switch to player one
    playerOne.classList.add("active");
    playerTwo.classList.remove("active");
  }
}

// attach click event to each square
// player 1 and computer's move functions are called
ul.onclick = (event) => {
  playerOneMoves(event);
  // let gameWon = checkForWinner();
  // gameOver(gameWon);
  if (showWinner(winCombinations, player1Selections) !== true && board.style.display !== "none") {
    setTimeout(computerMoves, 1000);
  }
}

const showWinner = function(winCombinations, playerMoves) {
  for (let i = 0; i < winCombinations.length; i++) {
    if (winCombinations[i].every(selectedBox => playerMoves.indexOf(selectedBox) != -1))
    return true;
  }
  return false;
}


// function to check for winner
const gameOver = function(player, playerMoves) {

  if (showWinner (winCombinations, player1Selections)) {
    board.style.display = "none";
    win.style.display = "";
    $("#finish").addClass("screen-win-one");
    $(".message").text(`${$('#player1name').val()} is the winner!`);
  } else if (showWinner(winCombinations, player2Selections)) {
    board.style.display = "none";
    win.style.display = "";
    $("#finish").addClass("screen-win-two");
    $(".message").text("WINNER");
  }
}

const noWinner = function(playerSelections) {
  if ((playerSelections.length === 5) && (board.style.display === "")) {
      board.style.display = "none";
      win.style.display = "";
      $("#finish").addClass("screen-win-tie");
      $(".message").text("It's a draw");
  }
}

  // highlight current player's symbol when mouse hovers over squares
ul.onmouseover = (event) => {
  if (event.target.className === "box box-filled-1 disabled" || event.target.className === "box box-filled-2 disabled") {
    return;
  }
  if (playerOne.className === "players active") {
    event.target.style.backgroundImage = 'url("./img/o.svg")';
  }
};

ul.onmouseout = (event) => {
  if (event.target.className === "box box-filled-1 disabled" || event.target.className === "box box-filled-2 disabled") {
    return;
  }
  if (playerOne.className === "players active") {
    event.target.style.backgroundImage = "";
  }
}


// ---------------------------OLD ATTEMPTS AT GAME PLAY ----------------------


// function to test for any possible win combinations
// const checkForWinner = function() {
//   playCounter++;
//   const winCombinations = [
//     showWinner(getClass(1), getClass(2), getClass(3)),
//     showWinner(getClass(4), getClass(5), getClass(6)),
//     showWinner(getClass(7), getClass(8), getClass(9)),
//     showWinner(getClass(1), getClass(4), getClass(7)),
//     showWinner(getClass(2), getClass(5), getClass(8)),
//     showWinner(getClass(3), getClass(6), getClass(9)),
//     showWinner(getClass(1), getClass(5), getClass(9)),
//     showWinner(getClass(3), getClass(5), getClass(7))
//   ];
//
//   let winner;

  // for (let i = 0; i < winCombinations.length; i++) {
  //   console.log(winCombinations)[i];
  //   // if (showWinner === true) {
  //   //   winner = showWinner;
  //   //   console.log(showWinner);
  //   //   console.log("if statement");
  //   // } else if (playCounter === 9 && showWinner === false) {
  //   //   winner = "draw";
  //   //   console.log(showWinner);
  //   //   console.log("else statement");
  //   // }
  //   // return winner;
  // }


  // winCombinations.forEach(function(winCombo) {
  //  if (winCombo) {
  //     winner = winCombo;
  //     console.log(winCombo);
  //     console.log("if statement returned");
  //   }
  //   else if (playCounter === 9 && !winCombo) {
  //  winner = "draw";
  //  console.log(winCombo);
  //  console.log ("else statement");
  //   }
  // });
  // return winner;
// }

// get the class name of each square
// const getClass = function(boxNumber) {
//   return $(".box").eq(boxNumber - 1).attr("class").split(" ")[1];
// }

// check to see if any 3 squares are the same
// const showWinner = function(box1, box2, box3) {
//   if ((box1 === box2) && (box2 === box3)) {
//     return box1;
//   } else {
//     return false;
//   }
// }

// use switch function to check for win, lose, or draw
// const gameOver = function(winningPlayer) {
//   switch (winningPlayer) {
//
//     case "box-filled-1":
//     board.style.display = "none";
//     win.style.display = "";
//     $("#finish").addClass("screen-win-one");
//     $(".message").text(`${$('#player1name').val()} is the winner!`);
//     break;
//
//     case "box-filled-2":
//     board.style.display = "none";
//     win.style.display = "";
//     $("#finish").addClass("screen-win-two");
//     $(".message").text("WINNER");
//     break;
//
//     case "draw":
//     board.style.display = "none";
//     win.style.display = "";
//     $("#finish").addClass("screen-win-tie");
//     $(".message").text("It's a draw");
//     break;
//
//     default:
//     break;
//   }
// }

// when "new game" button is clicked, reset the board
  $(".button:contains('New game')").on("click", function() {
    window.location.reload(true);
  });

} ();
