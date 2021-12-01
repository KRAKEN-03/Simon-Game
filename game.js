var userClickedBtn = [];
var gamePattern = [];
var btnColors = ["red", "blue", "green", "yellow"];

var level = 0;
var gameStarted = false;

$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSeq();
    gameStarted = true;
  }
});

var buttons = $(".btn");
buttons.on("click", function () {
  var userChosenColor = this.id;
  userClickedBtn.push(userChosenColor);
  playSound(userChosenColor);
  clickAnimation(userChosenColor);
  checkAnswer(userClickedBtn.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedBtn[currentLevel]) {
    if (gamePattern.length === userClickedBtn.length) {
      setTimeout(function () {
        nextSeq();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function nextSeq() {
  userClickedBtn = [];
  level++;
  $("#level-title").text("Level " + level);
  var ranNum = Math.floor(Math.random() * 4);
  var ranCol = btnColors[ranNum];
  gamePattern.push(ranCol);
  var selectedBtn = gamePattern;
  $("#" + ranCol)
    .fadeOut(100)
    .fadeIn(100);
  playSound(ranCol);
}

function clickAnimation(button) {
  $("." + button).addClass("pressed");
  setTimeout(function () {
    $("." + button).removeClass("pressed");
  }, 100);
}

function playSound(nameOfSound) {
  var audio = new Audio("sounds/" + nameOfSound + ".mp3");
  audio.play();
}
