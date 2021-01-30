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
        let messenger = document.querySelector('.messenger'); //setElementById
        messenger.innerHTML = msg
    },
    displayHit: function (location) {
        let cell = document.querySelector(location);  //setElementById
        cell.setAttribute("style", "background: url(\"./img/ship.png\") no-repeat center center")
    },
    displayMiss: function (location) {
        let cell = document.querySelector(location);  //setElementById
        cell.setAttribute("style", "background: url(\"./img/miss.png\") no-repeat center center")

    }
};
// модель поведения игры

let model = {
    bordSize: 7,//размер игрового поля
    numShip: 3,//
    shipsLength: 3,
    shipsSunk: 0,//потопленые корабли
    ships: [
        ship1 = {location: ['', '', ''], hits: ['', '', '']},
        ship2 = {location: ['', '', ''], hits: ['', '', '']},
        ship3 = {location: ['', '', ''], hits: ['', '', '']}
    ],
    fire: function (guess) {//получает коодинаты выстрела
        for (let i = 0; i < this.numShip; i++) {
            let ship = this.ships[i];

            let index = ship.location.indexOf(guess); //ПРОВЕРЯЕМ БЫЛО ЛИ СОВПАДЕНИЕ С МАСИВОМ КАРАБЛЕЙ
            if (index >= 0) {
                view.displayHit(guess)
                view.displayMessage("YOU HIT!!!!")
                ship.hits[index] = 'hit';
                if (this.isSunk(ship)) {
                    this.shipsSunk++
                    view.displayMessage("YOU ARE SUNK MY BATTLESHIP!!")
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("MISS)))");
        return false;
    },
    isSunk: function (ship) {// done or not
        for (let i = 0; i < this.shipsLength; i++) {
            if (ship.hits[i] !== 'hit') {
                return false;
            }
        }
        return true;
    },
    makeNewShips: function () {
        let shipArrey;
        for (let i = 0; i < this.numShip; i++) {
            do {
                shipArrey = this.makeRandomShip();
            } while (this.collisionRandomShips(shipArrey));
            this.ships[i].location = shipArrey;

        }
        console.log("Ships array: ");
        console.log(this.ships);
    },
    makeRandomShip: function () {
        let newShip = [];
        let row, column;
        let rowOrColumn = Math.floor(Math.random() * 2)
        if (rowOrColumn === 0) {
            //row
            row = Math.floor(Math.random() * (this.bordSize - this.shipsLength));
            column = Math.floor(Math.random() * this.bordSize);
            row++;
            column++;
            for (let i = 0; i < this.shipsLength; i++) {
                newShip[i] = ".id" + (row + i) + " " + ".id" + column;
            }
        } else {
            //column
            column = Math.floor(Math.random() * (this.bordSize - this.shipsLength));
            row = Math.floor(Math.random() * this.bordSize);
            column++;
            row++;
            for (let i = 0; i < this.shipsLength; i++) {
                newShip[i] = ".id" + row + " " + ".id" + (column + i);
            }
        }
        return newShip;
    },
    collisionRandomShips: function (newShip) {
        for (let i = 0; i < this.numShip; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < newShip.length; j++) {
                if (ship.location.indexOf(newShip[j]) >= 0) {
                    return true;
                }

            }

        }
        return false;
    }

}
let controller = {

    guesses: 0,
    processGuessesWithOutParses: function (guess) {
        let location = guess; // null or guess
        if (location) {  // if location !==null
            this.guesses++
            let hit = model.fire(location) //функцию иницыализируют с координарами выстрела и ее значение записывают в переменную
            if (hit && model.shipsSunk === model.numShip) {
                view.displayMessage("YOU ARE SUNK " + model.shipsSunk + " MY BATTLESHIPS!!\n" +
                    "<p>Guesses:" + this.guesses + "</p><p>Hits:......" + (model.shipsSunk * model.shipsLength) +
                    "</p><p>Result:.." + (Math.floor(100 * ((model.shipsSunk * model.shipsLength) / this.guesses))) + "</p>")
            }
        }
    },

    processGuesses: function (guess) {
        let location = parsesGuess(guess); // null or guess
        if (location) {  // if location !==null
            this.guesses++
            let hit = model.fire(location) //функцию иницыализируют с координарами выстрела и ее значение записывают в переменную
            if (hit && model.shipsSunk === model.numShip) {
                view.displayMessage("YOU ARE SUNK " + model.shipsSunk + " MY BATTLESHIPS!!\n" +
                    "<p>Guesses:" + this.guesses + "</p><p>Hits:......" + (model.shipsSunk * model.shipsLength) +
                    "</p><p>Result:.." + (Math.floor(100 * ((model.shipsSunk * model.shipsLength) / this.guesses))) + "</p>")
            }
        }
    }
}

function parsesGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G",];
    if (guess === "SOS") {
        alert("Подсказка:\n" + model.ships[0].location + "\n" + model.ships[1].location + "\n" + model.ships[2].location)
    }
    if (guess === null || guess.length !== 2) {
        alert(guess + " wrong guess!"); // view.displayMessage
    } else {

        let firstChar = guess.charAt(0); //берем первый символ
        let row = alphabet.indexOf(firstChar); //сверяем превый символ с проверочным масивом
        let column = guess.charAt(1); // берем второй символ

        if (isNaN(column) || column < 0 || column >= model.bordSize || row === -1) {
            alert(guess + " wrong guess!"); // view.displayMessage
        } else {
            row++;
            column++;
            return ".id" + row + " " + ".id" + column;
        }

    }
    return null;
}

function init() {
    let button = document.querySelector('.button'); // getElementById
    button.onclick = heandleButton; // КЛИКУ МЫШИ ПО КНОПКЕ ПРИСВАЕВАЕТСЯ ФУНКЦИЯ
    let press = document.querySelector('.press'); // getElementById
    press.onkeypress = heandleKeyPress; //НАЖАТИЮ КЛАВИШИ ПРИСВАЕВАЕТСЯ ФУКЦИЯ
    let table = document.querySelector('table'); // getElementById
    table.onclick = heandleKeyTable;
    model.makeNewShips();

}

function heandleButton() {
    let press = document.querySelector('.press'); //getElementById
    let guess = press.value; // ПОЛУЧАЕМ ЗНАЧЕНИЕ ИЗ ФОРМЫ
    controller.processGuesses(guess);
    press.value = "";
}

function heandleKeyPress(e) { // ЗАПУСКАЕТ КЛИК ПО КНОПКЕ, УСЛИ БЫЛ НАЖАТ ЕНТЕР
    let button = document.querySelector('.button'); //getElementById
    if (e.keyCode === 13) {
        button.click();
        return false;
    }
}

function heandleKeyTable() {
    let selectedTd = "";
    let selectedTr = "";
    let ptarget = "";
    let relatedTarget = "";
    let table = document.querySelector('table');
    table.onclick = function (event) {
        ptarget = event.target; // где был клик?
        relatedTarget = event.target.parentNode;
        let classTd = ptarget.className;
        let classTr = relatedTarget.className;
        let mouseGauss = "." + classTr + " " + "." + classTd;
        controller.processGuessesWithOutParses(mouseGauss);
    };

}

window.onload = init();

