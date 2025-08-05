let canvas = document.querySelector("canvas");
//Gets Graphics
const graphics = canvas.getContext("2d");

let upgrades = [];
let upgradeOwned = [];
let prerequisites = [];
let Health = 0;

createUpgradeBasic("Health",1,[])
createUpgradeBasic("Health",3,[1])
createUpgradeBoxes();

function createUpgradeBasic(stat,amount,prerequisite){
    upgrades.push([stat,amount]);
    prerequisites.push([prerequisite]);
    upgradeOwned.push([false]);
}

function createUpgradeBoxes(){
    let row=0;
    let rowLength=0;
    for(let i=0; i<upgrades.length; i++){
        if(row==0&&i*20>canvas.width){
            row++;
            rowLength=i;
        }
        if(rowLength!=0&&i-rowLength*row>=rowLength){
            row++
        }
        graphics.fillStyle = "white";
        graphics.fillRect((i-row*rowLength)*20,row*20,20,20);
        graphics.fillStyle = "black";
        graphics.fillText(upgrades[i][0],(i-row*rowLength)*20,(row+0.4)*20,20)
        graphics.fillText(upgrades[i][1],(i-row*rowLength)*20,(row+0.9)*20,20)
    }
}

function getUpgrade(){

}

function press(event){
    let canvasrect = canvas.getBoundingClientRect();
    let x = (event.clientX-canvasrect.x)/3.35;
    let y = (event.clientY-canvasrect.y)/3.35;
    if(x>canvas.width-60){
        buttonPress(x,y);
    }else if(x<60&&y<20){
        backPage();
    }
}