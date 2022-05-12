// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function menuDisplayGame() {

  game = document.getElementById("game");
  menu = document.getElementById("menu");
  menu.style.display = "none";
  game.style.display = "block";

}

function menuDisplayMenu() {
  game = document.getElementById("game");
  menu = document.getElementById("menu");
  menu.style.display = "block";
  game.style.display = "none";
  resetGameState();
  document.getElementById("winner").innerHTML = "";
  document.getElementById("winner").background = "none";
  document.getElementById("playerMoney").style.color = "white";
}


function makeBet(index) {
  updateColor(index);
  loadPlayerInfo();
  // When the user clicks on the button, open the modal
  // btn.onclick = function() {
    modal.style.display = "block";
  // }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  loadPlayerInfo()
}
