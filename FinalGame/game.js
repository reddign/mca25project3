let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");

let screen = "Home";

//General
function animate(){
    if(screen=="Home"){
        createHomePage();
    }
    if(screen=="Upgrade"){
        createUpgradePage();
    }
}

function press(event){
    let canvasrect = canvas.getBoundingClientRect();
    let x = (event.clientX-canvasrect.x)/3.35;
    let y = (event.clientY-canvasrect.y)/2.75;
    if(screen=="Home"){
        if(x>canvas.width/2-30&&x<canvas.width/2+30){
            if(y>canvas.height/2+30&&y<canvas.height/2+45){
                screen="Game";
                graphics.clearRect(0,0,canvas.width,canvas.height);
            }
            if(y>canvas.height/2+50&&y<canvas.height/2+65){
                screen="Upgrade";
                graphics.clearRect(0,0,canvas.width,canvas.height);
            }
        }
    }else if(screen=="Upgrade"){
        if(x>canvas.width-60){
            buttonPress(x,y);
        }else if(x<60&&y<20){
            backPage();
        }
    }
}

//Home
function createHomePage(){
    graphics.fillStyle = "White";
    graphics.fillRect(canvas.width/2-30,canvas.height/2+30,60,15);
    graphics.fillRect(canvas.width/2-30,canvas.height/2+50,60,15);
    graphics.fillStyle = "Black";
    graphics.font = "10px arial";
    graphics.fillText("Play",canvas.width/2-10,canvas.height/2+41);
    graphics.fillText("Upgrades",canvas.width/2-21,canvas.height/2+61)
    graphics.fillStyle = "White";
    graphics.font = "20px arial";
    graphics.fillText("Generic Medieval", canvas.width/2-75, canvas.height/2-20);
    graphics.fillText("Fighting Game", canvas.width/2-62, canvas.height/2);
    
}

//Upgrades
let stat = [0,0,0,0,0];
let statNames = ["Health","DMG","Mana","P","P"];
let upgradeCost = [1,1,1,1,1];
let upgradeAmount = [1,1,1,1,1];
let coins = 50;
let buttons=[];

function createUpgradePage(){
    createAllUpgradeButtons();
    createButton(0,0,60,20,"Back");
    showCoins();
}

function backPage(){
    screen="Home";
    graphics.clearRect(0,0,canvas.width,canvas.height);
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
            graphics.clearRect(x,y,canvas.width,canvas.height);
            createAllUpgradeButtons();
        }else{
            alert("Too expensive");
        }
    }
}

function showCoins(){
    createButton(60,0,60,20,"Coins: " + coins)
}

let game = setInterval(animate,1000/60);