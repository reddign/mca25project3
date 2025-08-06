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

createUpgradeBasic("Health",1,[]);
createUpgradeBasic("Health",3,[0]);
createUpgradeBasic("Dmg",1,[0]);
createUpgradeBasic("Mana",1,[1,2]);
newDesign();
console.log(imgPos)

function createUpgradeBasic(stat,amount,prerequisite){
    upgrades.push([stat,amount]);
    prerequisites.push(prerequisite);
    upgradeOwned.push(false);
}

function newDesign(){
    for(let i=0; i<upgrades.length; i++){
        let paramHeight = 0;
        for(let j=0; j<prerequisites[i].length; j++){
            if(paramHeight<=imgPos[prerequisites[i][j]]){
                paramHeight = imgPos[prerequisites[i][j]]+1;
            }
        }
        imgPos.push(paramHeight);
    }
    let height = 0;
    for(let i=0; i<imgPos.length; i++){
        height = Math.max(height,imgPos[i]);
    }
    for(let i=0; i<=height; i++){
        for(let j=0; j<count(imgPos,i); j++){
            graphics.fillStyle = "white";
            graphics.fillRect(canvas.width/2-((j-count(imgPos,i)/2+.5)*25),i*25,21,21);
            graphics.fillStyle = "black";
            graphics.fillText(upgrades[i][0],canvas.width/2-((j-count(imgPos,i)/2+.45)*25),(i+0.4)*25,19)
            graphics.fillText(upgrades[i][1],canvas.width/2-((j-count(imgPos,i)/2+.45)*25),(i+0.8)*25,19)
        }
    }
}

function count(arr,key){
    let counter =0
    for(let i=0; i<arr.length; i++){
        if(arr[i]==key){
            counter++;
        }
    }
    return counter;
}

function getUpgrade(x,y){
    if(points>0){
        let upgradeSelect;
        let height = 0;
        for(let i=0; i<imgPos.length; i++){
            height = Math.max(height,imgPos[i]);
        }
        let prev =0;
        for(let i=0; i<=height; i++){
            for(let j=0; j<count(imgPos,i); j++){
                if(x>canvas.width/2-((j-count(imgPos,i)/2+.5)*25)&&x<canvas.width/2-((j-count(imgPos,i)/2+.5)*25)+21&&y>i*25&&y<i*25+21){
                    upgradeSelect = prev;
                }
                prev++
            }
        }
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