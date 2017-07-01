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

function createTable () {
  var board = $('#board');
  var table = $('<table></table>').addClass("table");

  for (var i = 0; i < 7; i++)
  {
    var row = $('<tr></tr>').addClass("tbl-row");
    for (var j = 0; j < 10; j++)
    {
      var cell = $('<td></td>').addClass("tbl-data").attr("id", i + "" + j);
      cell.text(i + "" + j);
      row.append(cell);
    }
    table.append(row);
  }
  board.append(table);

  var tbl = document.createElement("TABLE");
  tbl.setAttribute("id", "Table");
  board.append(tbl);

  for (i = 0; i < 7; i++)
  {
    var row = tbl.insertRow(i);
    for (var j = 0; j < 7; j++)
    {
      var cell = row.insertCell(j);
      cell.innerHTML = i + "" + j;
      cell.setAttribute("id", i + "" + j);
    }
  }
}

function squareTableCells() {
  var width = $('.tbl-data').width();
  $('.tbl-data').height(width);
}

createTable();
squareTableCells();

while(isSunk)
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
