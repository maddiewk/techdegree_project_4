
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
  let playCounter = 0;


  // hide game board and show start screen
    board.style.display = "none";
    win.style.display = "none";

  // user input
  $("#player1name").focus();

  function getName() {
    let inputValue = document.getElementById("player1name").value;
    $("#player1").prepend(inputValue);
    $("#player2").prepend("Player Two");
  }

  // when the start button is clicked, display the game board and player one's name
  startButton.onclick = function() {
    board.style.display = "";
    start.style.display = "none";
    getName();
  // automatically set first player to O
    playerOne.className = "players active";
  }

  // players trade turns
  // each time a square is clicked, it becomes disabled
function takeTurn(event) {
  if (playerOne.classList.contains("active")) {
    playerTwo.classList.add("active");
    playerOne.classList.remove("active");
    event.target.classList.add("box-filled-1");
    event.target.classList.add("disabled");
  } else if (playerTwo.classList.contains("active")) {
    playerOne.classList.add("active");
    playerTwo.classList.remove("active");
    event.target.classList.add("box-filled-2");
    event.target.classList.add("disabled");
  }
}

$(".boxes").on("click", takeTurn);

//another click handler?
$(".boxes").on("click", function() {
  let gameWon = checkForWinner();
  gameOver(gameWon);
})

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
    if (playCounter === 9) {
      winner = "draw";
    }
    if (winCombo) {
      winner = winCombo;
    }

  });
  return winner;

}

const getClass = function(boxNumber) {
  let boxNum = $(".box").eq(boxNumber - 1).attr("class").split(" ")[1];
  return boxNum;
}

const showWinner = function(box1, box2, box3) {
  if ((box1 === box2) && (box2 === box3)) {
    return box1;
  } else {
    return false;
  }
}

const gameOver = function(winningPlayer) {
  switch (winningPlayer) {
    case "box-filled-1" :
    board.style.display = "none";
    win.style.display = "";
    $("#finish").addClass("screen-win-one");
    $(".message").text("WINNER");
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

const resetBoard = function() {
  playCounter = 0;
  win.style.display = "none";
  start.style.display = "";
  $("#player1name").focus();
  $("#player1name").val("");
  playerTwo.className = "players";
  // $("#player1").text("");
  // $("#player2").text("");
  $(".boxes li").removeClass("box-filled-1 disabled");
  $(".boxes li").removeClass("box-filled-2 disabled");
  $(".boxes li").css("background-image", "none");
  $("#finish").removeClass("screen-win-one");
  $("#finish").removeClass("screen-win-two");
  $("#finish").removeClass("screen-win-tie");
}

$(".button:contains('New game')").on("click", resetBoard);

} ();
