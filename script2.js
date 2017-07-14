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
  var grid = $('#tableGrid');
  var table = $('<table></table>').addClass('table');

//create table using jquery
  for (var i = 0; i < 7; i++)
  {
    var row = $('<tr></tr>').addClass('tbl-row');
    for (var j = 0; j < 10; j++)
    {
      var cell = $('<td></td>').addClass('tbl-data').attr("id", i + "" + j);
      row.append(cell);
    }
    table.append(row);
  }
  grid.append(table);

//create table using basic javascript
  var tbl = document.createElement('TABLE');
  tbl.setAttribute('id', 'Table');
  board.append(tbl);

  for (i = 0; i < 7; i++)
  {
    var row = tbl.insertRow(i);
    for (var j = 0; j < 7; j++)
    {
      var cell = row.insertCell(j);
      cell.innerHTML = i + "" + j;
      cell.setAttribute('id', i + "" + j);
    }
  }

  squareTableCells();
} //end of createTable

function squareTableCells() {
  var width = $('.tbl-data').width();
  $('.tbl-data').height(width);
}

createTable();
//model.generateShipLocations(); //can't be here; model undefined
//above done after page load

$('#inputButton').on('click', function() {
  var input = $('#guessInput'); //document.getElementbyId('guessInput').value
  var guess = input.val();
  controller.processGuess(guess);
  input.val('');
});

$('#guessInput').on('keypress', function(e) {
  var button = $('#inputButton');
  if (e.keyCode === 13) {
    button.click();
    return false;
  }
});

var view = {
  displayMessage: function(msg) {
    var area = $('#messageArea'); //document.getElementbyId('messageArea'); - basic js
    area.html(msg); //area.innerHTML - basic js
  },
  displayHit: function(location) {
    var cell = $('#' + location); //document.getElementbyId(location)
    cell.attr('class', 'hit'); //cell.setAttribute('class', 'hit')
    cell.html('HIT!');
  },
  displayMiss: function(location) {
    var cell = $('#' + location);
    cell.attr('class', 'miss');
    cell.text('MISS!');
  }
};

var model = {
  numRows: 7,
  numCols: 10,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,
  allShipsSunk: false,
  ships: [
    { locations: ["0", "0", "0"], hits: ["", "", ""]},
    { locations: ["0", "0", "0"], hits: ["", "", ""]},
    { locations: ["0", "0", "0"], hits: ["", "", ""]}
  ],
  shotOnTarget: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i]
      var index = ship.locations.indexOf(guess);

      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("You got me!");

        if (this.shipIsSunk(ship)) {
          view.displayMessage("You sank my battleship!");
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage("You missed me!");
    return false;
  },
  shipIsSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++){
      if (ship.hits[i] !== "hit") {
        return false;
      }
    }
    return true;
  },
  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));

      this.ships[i].locations = locations;
    }
  },
  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row;
    var col;
    var numR = this.numRows;
    var numC = this.numCols;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.numRows);
      col = Math.floor(Math.random() * (this.numCols - this.shipLength));
    } else {
      row = Math.floor(Math.random() * (this.numRows - this.shipLength));
      col = Math.floor(Math.random() * this.numCols);
}
    var newShipLocations = [];

    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push((row + i) + "" + col);
      }
    }
    return newShipLocations;
  },
  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

}; //end of model

var controller = {
  guesses: 0,
  processGuess: function(guess) {
    var location;

    if(this.allShipsSunk){
      //view.displayMessage("GAME OVER.  Wanna play again?");
      confirm("GAME OVER. Wanna play again?");
      location.reload();
    } else {
      location = parseGuess(guess);
    }

    if(location) {
      this.guesses++;
      var isOnTarget = model.shotOnTarget(location);

      if(isOnTarget && model.shipsSunk === model.numShips) {
        view.displayMessage("You sank ALL my battleships in " +
        this.guesses + " guesses.");
        this.allShipsSunk = true;
      }
    }
  }
};

function parseGuess(guess) {
  var alpha = [ "A", "B", "C", "D", "E", "F", "G" ];

  if (guess === null || guess.length !== 2) {
    alert("Oops! Please enter a letter and number.");
  }
  else {
    var firstChar = guess.charAt(0);
    var row = alpha.indexOf(firstChar);
    var column = guess.charAt(1);
//CHECK IF USER GUESSES SAME CELL
    if(isNaN(row) || isNaN(column)) {
      alert("That is not on the board");
    }
    else if (row < 0 || row >= model.boardRows
      || column < 0 || column >= model.boardCols) {
        alert("That is off the board");
    }
    else {
      return row + column;
    }
  }
  return null;
}

model.generateShipLocations();
/*testing */
/*
view.displayHit('00');
view.displayHit('34');
view.displayMiss('05');
view.displayMiss('43');
*/
/*
model.shotOnTarget("06");
model.shotOnTarget("16");
model.shotOnTarget("26");
model.shotOnTarget("34");
model.shotOnTarget("24");
model.shotOnTarget("44");
model.shotOnTarget("12");
model.shotOnTarget("11");
model.shotOnTarget("10");
*/
/*
console.log(parseGuess("A0"));
console.log(parseGuess("B6"));
console.log(parseGuess("G3"));
console.log(parseGuess("H0"));
console.log(parseGuess("A7"));
*/
/*
controller.processGuess("A0");
controller.processGuess("A1");
controller.processGuess("A2");
controller.processGuess("A3");
controller.processGuess("A4");
controller.processGuess("A5");
controller.processGuess("A6");
controller.processGuess("A7");
controller.processGuess("A8");
controller.processGuess("A9");

controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");
controller.processGuess("B3");
controller.processGuess("B4");
controller.processGuess("B5");
controller.processGuess("B6");
controller.processGuess("B7");
controller.processGuess("B8");
controller.processGuess("B9");

controller.processGuess("B6");
controller.processGuess("C6");
controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");
controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");

*/


//add code above here
})();
