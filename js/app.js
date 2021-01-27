/*

let DocRuolls = "The game rolls: \n 1: One pirat\'s ship come to our sea of numbers (from 0 tile 6)\n 2: You can shoot it !!! Push your shoot number \n 3: The ship have one diapason of 3 numbers on the bord";
let Hy = "If You don't want play The Game: type 'NO'";
let Shoot;
let Shoots = 0;
let HitsArr = [];
let SomeHit;
let i = 0;
let Hits = 0;
let Ships = [];
Ships[0] = Math.floor(Math.random() * 5);//generate random first number For the Ship
Ships[1] = (Ships[0] + 1);
Ships[2] = (Ships[1] + 1);
let Game = false;
Hy = prompt(Hy);
if (Hy === "NO") {
    alert('BAY!');

} else {
    Game = true;
}

function isEmpty(str){
    if(str.trim() == ''){ return true;
    }
    else {
        return false;
    }
}

while (Game !== false) {
    Shoot = prompt(DocRuolls);

    if (isEmpty(Shoot) === true){
        Shoot = "EMPTRY";
        alert(Shoot);
        continue;
    }


    if (Shoot >= 0 && Shoot <= 6 ) {
        Shoots++;
    } else {
        Shoots++;
        alert(Shoot + " - is not of your sea)\n Please shoot ! ");
        continue;
    }
    if (Shoot == Ships[0] || Shoot == Ships[1] || Shoot == Ships[2]) {
        SomeHit = Shoot;

    } else {
        alert("Wrong!!+0");
        continue;
    }


    if (SomeHit !== HitsArr[i] && SomeHit !== HitsArr[i - 1] && SomeHit !== HitsArr[i + 1]) {
        i++;
        HitsArr[i] = SomeHit;
        Hits++;

        alert("BOOM!!!+1")
    } else {
        alert("DOOBLE SHOOT to the one bord+0!!")
        continue
    }

    if (Hits >= 3) {
        alert("You are winner!!" + "\nShoots:" + Shoots + "\nHits:" + Hits + "\nResult:" + (100 * (3 / Shoots)) + "%");
        Hy = false;
        break;
    }
}
*/

//вывод данных на экран
let view = {
    displayMessage: function (msg) {
        let messenger = document.querySelector('.messenger');
        messenger.innerHTML = msg
    },
    displayHit: function (location) {
        let cell = document.querySelector(location)
        cell.setAttribute("class", "hit")
    },
    displayMiss: function (location) {
        let cell = document.querySelector(location)
        cell.setAttribute("class", "miss")

    }
};
// модель поведения игры

let model = {
    bordSize: 7,//размер игрового поля
    numShip: 3,//
    shipsLength: 3,
    shipsSunk: 0,//потопленые корабли
    ships: [
        ship1 = {location: ['.id1 .id3', '.id2 .id3', '.id3 .id3'], hits: ['', '', '']},
        ship2 = {location: ['.id1 .id5', '.id2 .id5', '.id3 .id5'], hits: ['', '', '']},
        ship3 = {location: ['.id1 .id1', '.id2 .id1', '.id3 .id1'], hits: ['', '', '']}
    ],
    fire: function (guess) {//получает коодинаты выстрела
        for (let i = 0; i < this.numShip; i++) {
            let ship = this.ships[i];

            // location=ship.location;
            // let index = location.indexOf(guess);
            let index = ship.location.indexOf(guess);
            if (index >= 0) {
                view.displayHit(guess)
                view.displayMessage("YOU HIT!!!!")
                ship.hits[index] = 'hit';
                if (this.isSunk(ship)) {
                    this.shipsSunk++
                    view.displayMessage("YOU ARE DONE MY BOOTLSHIP!!")
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("MISS)))")
        return false;
    },
    isSunk: function (ship) {// done or not
        for (let i = 0; i < this.shipsLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    }

}
let controller = {
    guesses: 0,
    processGuesses: function (guess) {

    },

}

function parsesGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G",];
    if (guess === null || guess.length !== 2) {
        view.displayMessage(guess + " wrong guess!");
        return guess = null;
    }
    let firstChar = guess.charAt(0);
    let row = alphabet.indexOf(firstChar);
    let column = guess.charAt(1);
    if (isNaN(column) || column < 0 || column >= model.bordSize || row === -1) {
        view.displayMessage(guess + " wrong guess!");
        return guess = null;
    }
    row++;
    column++;
    return ".id" + row + " " + ".id" + column;
}
console.log(parsesGuess(""))
alert(parsesGuess("0A"))
/*model.fire('.id1 .id3');
model.fire('.id2 .id3');
model.fire('.id3 .id3');
model.fire('.id3 .id6');
model.fire('.id4 .id2');
model.fire('.id7 .id7');*/
/*view.displayMessage("some masemfgfdhjgfdjh");
view.displayHit('.id3 .id6');
view.displayMiss(".id3 .id7")*/
