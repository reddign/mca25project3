let canvas = document.querySelector("canvas");
//Gets Graphics
const graphics = canvas.getContext("2d");
let stat = [0,0,0,0,0];
let statNames = ["Health","DMG","Mana","P","P"];
let upgradeCost = [1,1,1,1,1];
let upgradeAmount = [1,1,1,1,1];
let coins = 50;
let buttons=[];


createAllUpgradeButtons();
createButton(0,0,60,20,"Back")
function backPage(){
    window.location.assign("gamemain.htm");
}

function createAllUpgradeButtons(){
    for(let i=0; i<statNames.length; i++){
        createUpgradeButton(canvas.width-60,i*20,60,20,i,statNames[i],upgradeAmount[i],upgradeCost[i]);
    }
}

function createButton(x,y,width,height,text){
    graphics.strokeStyle = "#2c3e50";
    graphics.fillStyle = "#f7f7f7";
    graphics.strokeRect(x,y,width,height)
    graphics.fillRect(x,y,width,height);
    graphics.fillStyle = "#a50034";
    graphics.fillText(text,x+10,y+13)
}

function createUpgradeButton(x,y,width,height,statNum,statName,amount,cost){
    graphics.strokeStyle = "#2c3e50";
    graphics.fillStyle = "#f7f7f7";
    graphics.strokeRect(x,y,width,height)
    graphics.fillRect(x,y,width,height);
    graphics.fillStyle = "#a50034";
    graphics.fillText(statName+": "+Math.floor(cost),x+10,y+13)
    buttons.push([statNum,amount]);
}

function buttonPress(x,y){
    if(x>canvas.width-60){
        if(coins>=Math.floor(upgradeCost[Math.floor(y/20)])){
            stat[buttons[Math.floor(y/20)][0]] += buttons[Math.floor(y/20)][1];
            coins-=Math.floor(upgradeCost[Math.floor(y/20)]);
            upgradeCost[Math.floor(y/20)] *= 1.1;
            clear();
            createAllUpgradeButtons();
            createButton(0,0,60,20,"Back")
        }else{
            console.log("Too expensive");
        }
    }
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
function clear(){
    graphics.fillStyle = "black";
    graphics.fillRect(0,0,canvas.width,canvas.height);
}