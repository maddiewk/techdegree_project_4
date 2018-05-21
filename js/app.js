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
  let playCounter = 0;
  // variable to hold index number of each square
  let boxNumber;

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

    // switch to player two
    playerTwo.classList.add("active");
    playerOne.classList.remove("active");
  }
  // after each turn, check to see if there is a win
  let gameWon = checkForWinner();
  gameOver(gameWon);
}

// function to control computer play
let computerMoves = function() {
  do {
    boxNumber = Math.floor(Math.random() * 9);
  } while ((playerTwo.classList.contains("active") && boxes[boxNumber].className !== "box") && showWinner !== true);
  if (playerTwo.classList.contains("active") && boxes[boxNumber].className === "box") {
    boxes[boxNumber].classList.add("box-filled-2");
    boxes[boxNumber].classList.add("disabled");

    // switch to player one
    playerOne.classList.add("active");
    playerTwo.classList.remove("active");
  }
  // after each turn, check to see if there is a win
  let gameWon = checkForWinner();
  gameOver(gameWon);
}

// attach click event to each square
// player 1 and computer's move functions are called
ul.onclick = (event) => {
  playerOneMoves(event);

  if (checkForWinner !== true && board.style.display !== "none" ) {
    setTimeout(computerMoves, 1500);
  }
}

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

// function to test for any possible win combinations
const checkForWinner = function() {
  playCounter++;
  const winCombinations = [
    showWinner(getClass(1), getClass(2), getClass(3)),
    showWinner(getClass(4), getClass(5), getClass(6)),
    showWinner(getClass(7), getClass(8), getClass(9)),
    showWinner(getClass(1), getClass(4), getClass(7)),
    showWinner(getClass(2), getClass(5), getClass(8)),
    showWinner(getClass(3), getClass(6), getClass(9)),
    showWinner(getClass(1), getClass(5), getClass(9)),
    showWinner(getClass(3), getClass(5), getClass(7)),
  ];

  let winner = false;
  winCombinations.forEach(function(winCombo) {
    if (playCounter === 9 && !showWinner) {
      winner = "draw";
    }
    if (winCombo) {
      winner = winCombo;
    }

  });
  return winner;
}

// get the class name of each square
const getClass = function(boxNumber) {
  let boxNum = $(".box").eq(boxNumber - 1).attr("class").split(" ")[1];
  return boxNum;
}

// check to see if any 3 squares are the same
const showWinner = function(box1, box2, box3) {
  if ((box1 === box2) && (box2 === box3)) {
    return box1;
  } else {
    return false;
  }
}

// use switch function to check for win, lose, or draw
const gameOver = function(winningPlayer) {
  switch (winningPlayer) {
    case "box-filled-1" :
    board.style.display = "none";
    win.style.display = "";
    $("#finish").addClass("screen-win-one");
    $(".message").text(`${$('#player1name').val()} is the winner!`);
    break;

    case "box-filled-2" :
    board.style.display = "none";
    win.style.display = "";
    $("#finish").addClass("screen-win-two");
    $(".message").text("WINNER");
    break;

    case "draw" :
    board.style.display = "none";
    win.style.display = "";
    $("#finish").addClass("screen-win-tie");
    $(".message").text("It's a draw");
    break;

    default:
    break;
  }
}

// when "new game" button is clicked, reset the board
  $(".button:contains('New game')").on("click", function() {
    window.location.reload(true);
  });

}();
