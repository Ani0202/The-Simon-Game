let userClickedPattern = [];
let gamePattern = [];
const buttonColours = ["colour1", "colour2", "colour3", "colour4"];
let gameStarted = false;
let level = 0;

function nextSequence() {
  level += 1;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] == userClickedPattern[currentlevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press the Start Button to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  $(".startButton").removeClass("gameStart");
}

$(".btn").on("click", function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(".startButton").on("click", function () {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
    $(this).addClass("gameStart");
  }
});
