// set up start page and activate button to set up game
// trying to put all code inside this one immediately invoked function but we'll see

!function () {
  // first, hide game board and show start screen
  const start = document.getElementById("start");
  const board = document.getElementById("board");
  const win = document.getElementById("finish");
  const startButton = document.querySelector(".button");
  const playerOne = document.getElementById("player1");
  const playerTwo = document.getElementById("player2");
  const ul = document.querySelector(".boxes");
  const boxes = document.querySelectorAll(".box");

  board.style.display = "none";
  finish.style.display = "none";

  // when the button is clicked, display the game board
  startButton.onclick = function() {
    board.style.display = "";
    start.style.display = "none";

  // automatically set first player to O
    playerOne.className += " active";
  }

  // players trade turns
  // each time a square is clicked, it becomes disabled

  ul.addEventListener("click", (event) => {
    if (playerOne.classList.contains("active")) {
      playerTwo.className += " active";
      playerOne.className = "players";
      event.target.className += " box-filled-1 disabled";
    } else if (playerTwo.classList.contains("active")) {
      playerOne.className += " active";
      playerTwo.className = "players";
      event.target.className += " box-filled-2 disabled";
    }
  });

  // highlight current player's symbol when mouse hovers over squares?

$(".box").hover(function(event) {
  console.log("Working");
  $(this).addClass(" box-1");
}, function(event) {
  console.log("Removing");
  $(this).removeClass(" box-1");
});

} ();
