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
