let canvas = document.querySelector("canvas");
//Gets Graphics
const graphics = canvas.getContext("2d");

let stat = [0,0,0,0,0];
let statNames = ["Health","DMG","Mana","P","P"];
let imgPos = [];
let upgrades = [];
let upgradeOwned = [];
let prerequisites = [];
let points=1;

createUpgradeBasic("Health",1,[])
createUpgradeBasic("Health",3,[0])
createUpgradeBoxes();
//newDesign();
//console.log(imgPos)

function createUpgradeBasic(stat,amount,prerequisite){
    upgrades.push([stat,amount]);
    prerequisites.push(prerequisite);
    upgradeOwned.push(false);
}

function newDesign(){
    for(let i=0; i<upgrades.length; i++){
        let paramHeight = 0;
        for(let j=0; j<prerequisites[i].length; j++){
            if(paramHeight<=imgPos){
                paramHeight = imgPos[prerequisites[j]]+1;
            }
        }
        if(paramHeight>=imgPos.length){
            imgPos.push([]);
        }
        imgPos[paramHeight].push(i);
    }
}

function createUpgradeBoxes(){
    let row=0;
    let rowLength=16;
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

function getUpgrade(x,y){
    let xSlot = Math.floor(x/20);
    let ySlot = Math.floor(y/20);
    if(points>0){
        let upgradeSelect = xSlot+ySlot*16;
        let canGet = true;
        for(let i=0; i<prerequisites[upgradeSelect].length; i++){
            if(!upgradeOwned[prerequisites[upgradeSelect][i]]){
                canGet = false;
            }
        }
        if(canGet&&!upgradeOwned[upgradeSelect]){
            upgradeOwned[upgradeSelect]=true;
            //stat[statNames.findIndex(upgrades[upgradeSelect][0])]+=upgrades[upgradeSelect][1];
        }else{
            console.log("failed")
        }
    }
}

function press(event){
    let canvasrect = canvas.getBoundingClientRect();
    let x = (event.clientX-canvasrect.x)/3.35;
    let y = (event.clientY-canvasrect.y)/3.35;
    getUpgrade(x,y)
}