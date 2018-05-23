!function () {

  // variables from HTML
  const start = document.getElementById("start");
  const board = document.getElementById("board");
  const win = document.getElementById("finish");
  const startButton = document.querySelector(".button");
  const playerOne = document.getElementById("player1");
  const playerTwo = document.getElementById("player2");
  const ul = document.querySelector(".boxes");
  let boxes = document.querySelectorAll(".box");

  // empty arrays to hold each player's moves
  let player1Selections = [];
  let player2Selections = [];

  // variable to capture index number of each square
  let boxNumber;

  // array that holds all possible winning combinations
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

// function for player one moves
function playerOneMoves(event) {
  if (playerOne.classList.contains("active") && event.target.className === "box") {
    event.target.classList.add("box-filled-1");
    event.target.classList.add("disabled");

    // add each move to player ones'array
    player1Selections.push(event.target);

    // after each turn, check to see if there is a win or tie
    gameOver(playerTwo, player1Selections);
    noWinner(player1Selections);

    // switch to player two
    playerTwo.classList.add("active");
    playerOne.classList.remove("active");
  }
}

// function to control computer play
let computerMoves = function() {
  do {
    // get random number and assign as index number
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

    // switch to player one
    playerOne.classList.add("active");
    playerTwo.classList.remove("active");
  }
}

// checks each player's moves array with the winCombinations array and returns true if a match is found
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

// check for a tie
const noWinner = function(playerMoves) {
  if ((playerMoves.length === 5) && (board.style.display === "")) {
      board.style.display = "none";
      win.style.display = "";
      $("#finish").addClass("screen-win-tie");
      $(".message").text("It's a draw");
  }
}

// attach click event to each square
// player 1 and computer's move functions are called
ul.onclick = (event) => {
  playerOneMoves(event);

  if (showWinner(winCombinations, player1Selections) !== true && board.style.display !== "none") {
    setTimeout(computerMoves, 1000);
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

// when "new game" button is clicked, reset the board
  $(".button:contains('New game')").on("click", function() {
    window.location.reload(true);
  });

} ();
