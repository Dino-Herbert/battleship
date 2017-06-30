(function (){
var randomSpot = Math.floor(Math.random() * 9);
var location1 = randomSpot;
var location2 = location1 + 1;
var location3 = location1 + 2;
var alreadyPicked = [];
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while(isSunk == false)
{
  guess = prompt("Ready, Aim, Fire! (Enter a number 0-10):  ");

  if (guess < 0 || guess > 10 || isNaN(guess))
  {
    alert("Please enter a valid cell number...");
  }
  else {
    guesses++;

    if (guess == location1 || guess == location2 || guess == location3)
    {
      hits++;
      alert("HIT!");

      if (hits == 3)
      {
        isSunk = true;
        alert("Hey! You sank my battleship!");
      }
    }
    else {
      alert ("MISS!");
    }
  }
}

var stats = "You took " + guesses + " guesses to sink the battleship - your shooting accuracy was "
+ ((3/guesses) * 100).toFixed(2) + " %";

alert(stats);





})();
