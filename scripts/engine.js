var blueBlocks =  document.getElementsByClassName("blueBlock");
var redBlocks =  document.getElementsByClassName("redBlock");
var greenBlocks =  document.getElementsByClassName("greenBlock");
var blocks = [blueBlocks, redBlocks, greenBlocks];

var playerMoney = document.getElementById("playerMoney");
var playerColor = document.getElementById("playerColor");
var playerBetAmount = document.getElementById("playerBet");
var playerBetMult = document.getElementById("playerBetMult");
var bettingRows = ["Blue","Red","Green"];

var blockPose = [0,0,0];
var dice = [];
var gameFlag = false;

var multipliers = document.getElementsByClassName("multCheck");
var modalr1 = document.getElementById("myModalR1");
var modalr2 = document.getElementById("myModalR2");
var modalr3 = document.getElementById("myModalR3");
var modals = [modalr1, modalr2, modalr3];

player = {
  "money": 1000,
  "color": 2,
  "bet": 0,
  "multiplier": 2
}

function loadPlayerInfo() {
  playerBetAmount.innerHTML = "Your bet: " + player["bet"];
  playerBetMult.innerHTML = "Your Multiplier: " + player["multiplier"];
  playerMoney.innerHTML = "Your money: " + player["money"];
  playerColor.innerHTML = "Color: " + bettingRows[player["color"]];
}

function multiplierFunction(index) {
  // for (var i = 0; i < multipliers.length; i++) {
  //   if(multipliers[i].checked == true){
  //     multipliers[i].click();
  //   }
  // }
  // multipliers[index].click()    ;

  if (index == 0) {
    player["multiplier"] = 8;
  }else if (index == 1) {
    player["multiplier"] = 4;
  }else if (index == 2) {
    player["multiplier"] = 2;
  }
  loadPlayerInfo();
}

function updateBet() {
  betAmount = document.getElementById("betField");
  if ((player["money"] < betAmount.value) || (parseInt(betAmount.value) < -player["bet"] ) ) {
    betAmount.value = 0;
    alert("invalid value");
  }else {
    player["money"] -= betAmount.value;
    player["bet"] += parseInt(betAmount.value);
  }
  console.log(player["money"])
  console.log(player["bet"])
  betAmount.value = 0;
  loadPlayerInfo();
}

function updateColor(index) {
  player["color"] = index;
  multiplierFunction(index);
  loadPlayerInfo();
}

function loadBlocks() {
  blockPose = [0,0,0];
  filterBlocks(blueBlocks, 0)
  filterBlocks(redBlocks, 0)
  filterBlocks(greenBlocks, 0)
  gameFlag = true;
}

function updateBlock(block, pos) {
  block[pos].style.filter = "grayscale(0%)";
}

function resetBlock(block, pos) {
  block[pos].style.filter = "grayscale(100%)";
}

function filterBlocks(blocks, option) {
  if (option == 0) {
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].style.filter = "grayscale(100%)";
    }
  } else if (option == 1) {
    for (var i = 0; i < blocks.length; i++) {
      blocks[i].style.filter = "grayscale(0%)";
    }
  }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startGame() {

  loadPlayerInfo();
  loadBlocks();
  document.getElementById("playerMoney").style.color = "white";
  document.getElementById("winner").innerHTML = "";
  document.getElementById("winner").background = "none";
  await sleep(1000);
  do {
    testGame();
    await sleep(1000);
  } while (gameFlag == true);
  player["bet"] = 0;
  loadPlayerInfo();
}

function playerWin() {
  player["money"] += player["bet"] * player["multiplier"];
}


function victoryScreen(idx) {

  var modality = modals[idx];
  var spans = document.getElementsByClassName("close");
  console.log(modals);
  console.log(modality);
  // When the user clicks on the button, open the modal
  // btn.onclick = function() {
    modality.style.display = "block";
  // }

  // When the user clicks on <span> (x), close the modal
  spans[idx+1].onclick = function() {
    modality.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modality) {
      modality.style.display = "none";
    }
  }
}

function resetGameState(){
  for (var i = 0; i < blocks.length; i++) {
    for (var j = 0; j < 4; j++) {
      updateBlock(blocks[i], j);
    }
  }
}

function victoryRowState(idx){
  for (var i = 0; i < blocks.length; i++) {
    if (i != idx) {
      for (var j = 0; j < 4; j++) {
        resetBlock(blocks[i], j);
      }
    }
  }
}

function testGame() {
  b = Math.floor((Math.random() * 10) + 1);
  r = Math.floor((Math.random() * 10) + 1);
  g = Math.floor((Math.random() * 10) + 1);

  maxVal = Math.max(b, r, g);
  dice = [b, r, g];
  for (var i = 0; i < dice.length; i++) {
    if (dice[i] == maxVal) {
      updateBlock(blocks[i], blockPose[i]);
      blockPose[i]++;
    }
  }

  winConditionCheck = Math.max.apply(null, blockPose);
  if (winConditionCheck > 3) {
    index = blockPose.indexOf(winConditionCheck) + 1;
    document.getElementById("winner").innerHTML = "<h3>Row: " + index + " wins!</h3>";
    console.log(index-1);
    victoryRowState(index-1);
    gameFlag = false;

    if (blockPose.indexOf(winConditionCheck) == player["color"]) {
      playerWin();
      victoryScreen(index-1);
      document.getElementById("playerMoney").style.color = "green";
    }else {
      document.getElementById("playerMoney").style.color = "red";
    }
  }

}
