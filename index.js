var listColor = ["blue", "red", "yellow", "green"];
var gameSequence = [];
var userSequence = [];

//Start Game by clicking one key
$(document).keypress(event, function()
{
  if (gameSequence.length === 0)
    nextLevel();
});

function nextLevel()
{
  userSequence = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = listColor[randomNumber];
  gameSequence.push(randomColor);
  $("#level-title").text("Level " + gameSequence.length);
  $("#" + randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

$(".btn").on("click", function()
{
  var userColor = $(this).attr("id");
  userSequence.push(userColor);
  $(this).addClass("pressed");
  setTimeout(function(){
    $("#" + userColor).removeClass("pressed");
  }, 100);
  playSound(userColor);
  checkColor(userSequence.length - 1);
});

function checkColor(level)
{
  if (gameSequence[level] == userSequence[level])
  {
    if (gameSequence.length === level + 1)
    {
      setTimeout(function(){
        nextLevel();
      }, 1000);
    }
  }
  else
  {
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100);
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Start");
    gameSequence = [];
  }
}

function playSound(sound)
{
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}
