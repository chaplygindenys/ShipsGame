let DocRuolls = "The game rolls: \n 1: one pirat\'s ship come to our sea of numbers (from 0 tile 6)\n 2: you can shoot it !!! push your shoot number \n 3: we see what the ship have 3 numbers on the bord";
let Hy = "If You Do'n want play The Game: type 'NO'";
let Shoot;
let Shoots = 0;
let Hits = 0;
let Ships = [];
Ships[0] = Math.floor(Math.random()*5);//generate random first number For the Ship
Ships[1] = (Ships[0]+1);
Ships[2] = (Ships[1]+1);
let Game = false;
Hy = prompt(Hy);
if (Hy === "NO") {
    alert('BAY!');

} else {
    alert(Ships[0]+'  '+Ships[1]+' '+Ships[2]);
    Game = true;
}
while (Game!== false) {
    Shoot = prompt(DocRuolls);
    if (Shoot >= 0 && Shoot <= 6) {
        Shoots++;
    } else { Shoots++;
        alert(Shoot + " - is not of your sea)\n Please shoot ! ");
    }
    if (Shoot == Ships[0] || Shoot == Ships[1] || Shoot == Ships[2]) {
        Hits = Hits + 1;
        alert("good shoot!!")
    } else {
        alert("Wrong!!")
    }
    if (Hits >= 3) {
        alert("You are winner!!" + "\nShoots:" + Shoots + "\nHits:" + Hits + "\nResult:" + (100* (3 /Shoots))+"%");
        Hy = false;
        break;
    }
}