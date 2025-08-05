let canvas = document.querySelector("canvas");
//Gets Graphics
const graphics = canvas.getContext("2d");
let stat = [0,0,0,0,0];
let upgradeCost = [1,1,1,1,1];
let coins = 50;
let buttons=[];

createUpgradeButton(canvas.width-60,0,60,20,0,"Health",1);
createUpgradeButton(canvas.width-60,20,60,20,1,"Dmg",1);
createUpgradeButton(canvas.width-60,40,60,20,2,"P",1);
createUpgradeButton(canvas.width-60,60,60,20,3,"P",1);
createUpgradeButton(canvas.width-60,80,60,20,4,"P",1);
function createUpgradeButton(x,y,width,height,statNum,statName,amount){
    graphics.strokeStyle = "black";
    graphics.fillStyle = "white";
    graphics.strokeRect(x,y,width,height)
    graphics.fillRect(x,y,width,height);
    graphics.fillStyle = "black";
    graphics.fillText(statName,x+10,y+13)
    buttons.push([statNum,amount]);
}

function buttonPress(x,y){
    if(x>canvas.width-60){
        if(coins>=Math.floor(upgradeCost[Math.floor(y/20)])){
            stat[buttons[Math.floor(y/20)][0]] += buttons[Math.floor(y/20)][1];
            coins-=Math.floor(upgradeCost[Math.floor(y/20)]);
            upgradeCost[Math.floor(y/20)] *= 1.1;
        }else{
            console.log("Too expensive");
        }
    }
}

function press(event){
    let canvasrect = canvas.getBoundingClientRect();
    let x = (event.clientX-canvasrect.x)/3.35;
    let y = (event.clientY-canvasrect.y)/3.35;
    buttonPress(x,y);
}