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
    if(screen=="Game"){
        createGamePage();
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
    }else if(screen=="Game"){
        if (!(battleActive && playersAction)) return
    for (let i = 0; i < actionRects.length; i++) {
        let round = actionRects[i]
        if (x >= round.x && x <= round.x + round.w && y >= round.y && y <= round.y + round.h) {
            action(round.action)
            break
        }
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
    graphics.font = "10px arial";
    
}

//Upgrades
let stat = [0,0,0];
let statNames = ["Health","DMG","Mana"];
//HP: No Buff, DMG&Mana: Debuff
let upgradeCost = [1,1,1];
let upgradeAmount = [1,1,1];
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

//Game

function createGamePage(){
    clear()
    player()
    enemy()
    movement()
    checkCollision()
    endScreen()
    // Draw the message on the canvas
    if (message) {
        graphics.fillStyle = "white"
        graphics.font = "10px Arial"
        graphics.fillText(message, 20, 20)
    }
    // Draw action options if in battle
    if (battleActive && playersAction) {
        drawActionOptions()
    }
}
// WARNING: This code is a work in progress and may not function as intended.
let message = "" // Holds the current game message
let battleActive = false // Tracks if a battle is ongoing

let playerHealth = 100
let monsterHealth = 100
let fps = 1

let knightimg = document.getElementById('knight')
let goblinimg = document.getElementById('goblin')

movingUp = false
movingDown = false
movingLeft = false
movingRight = false
askedPlayAgain = false

let enemyX = 100
let enemyY = 100 
let enemyRadius = 10 

let playerX = canvas.width / 2 // Initial X position
let playerY = canvas.height / 2 // Initial Y position
const playerRadius = 10
const moveSpeed = 1

function clear(){
    if(!askedPlayAgain){
        graphics.fillStyle = 'black'
        graphics.fillRect(0,0,canvas.width,canvas.height)
    }
}


//randomly, while the player is romping around, a battle will start


function startBattle(){
    if (battleActive) return
    battleActive = true
    message = "A wild monster appears!"
    playerHealth = 100+stat[0] // reset player health for the battle
    monsterHealth = 100 // reset monster health for the battle
    setTimeout(() => battleLoop(), 1000)
}

//if fuction where if the player is in a certain area, a battle will start
function checkForBattle(){
    if(Math.random > 0.01){
        startBattle()
    }
}


function monsterAttack(){
    let damage = Math.floor(Math.random() * 20) + 1 // random damage between 1 and 20
    playerHealth -= damage
    message = `Monster attacks! Player takes ${damage} damage. Player health: ${playerHealth}`
}

// Refactored battle loop to use canvas for choices
let actionOptions = [
    { label: "Fight", action: "1" },
    { label: "Magic", action: "2" },
    { label: "Item", action: "3" },
    { label: "Flee", action: "4" }
]
let actionRects = []
let playersAction = false

function battleLoop(){
    playersAction = true
    // Hide HTML buttons if present
    let huh = document.getElementById("playerChoice")
    if (huh) huh.style.display = "none"
}

function drawActionOptions() {
    if (!playersAction) return
    actionRects = []
    let startX = 20
    let startY = 30
    let width = 60
    let height = 20
    let gap = 10
    graphics.font = "bold 10px Arial"
    for (let i = 0; i < actionOptions.length; i++) {
        let x = startX
        let y = startY + i * (height + gap)
        // Draw button background
        graphics.fillStyle = "#333"
        graphics.fillRect(x, y, width, height)
        // Draw button border
        graphics.strokeStyle = "white"
        graphics.strokeRect(x, y, width, height)
        // Draw label
        graphics.fillStyle = "white"
        graphics.fillText(actionOptions[i].label, x + 10, y + 27/2)
        // Store rect for click detection
        actionRects.push({ x, y, w: width, h: height, action: actionOptions[i].action })
    }
}

function action(option) {
    if (playerHealth <= 0 || monsterHealth <= 0) return
    playersAction = false
    if (option === "1") {
        let damage = Math.floor(Math.random() * 20) + 1 + stat[1]
        monsterHealth -= damage
        message = `You attack! Monster takes ${damage} damage. Monster health: ${monsterHealth}`
    } else if (option === "2") {
        let heal = Math.floor(Math.random() * 15) + 1 + stat[2];
        playerHealth += heal
        message = `You heal for ${heal}. Player health: ${playerHealth}`
    } else if (option === "3") {
        message = "You rummage for an item, but your bag is empty!"
    } else if (option === "4") {
        message = "You try to flee, but the monster blocks your path!"
    } else {
        message = "Invalid action. Try again."
        playersAction = true
        return
    }

    if (monsterHealth <= 0) {
        message = "You defeated the monster!"
        setTimeout(() => endScreen(), 1500)
        return
    }

    setTimeout(() => {
        monsterAttack()
        if (playerHealth <= 0) {
            message = ""
            setTimeout(() => endScreen(), 1500)
        } else {
            playersAction = true
        }
    }, 1000)
}

//Produces the end screen text

function endScreen(){
    coverUp();
    if (playerHealth <= 0) {
        graphics.fillStyle = "white";
        graphics.font = "bold 24px 'Arial', serif";
        // Draw text in the center of the canvas
        const text = "Game Over";
        const x = canvas.width / 2 - graphics.measureText(text).width / 2;
        const y = canvas.height / 2;
        graphics.fillText(text, x, y);
        if (!askedPlayAgain) {
            askedPlayAgain = true;
            setTimeout(() => {
                if (confirm("Return to title")) {
                    screen="Home"
                    graphics.clearRect(0,0,canvas.width,canvas.height)
                    reset();
                }
            }, 2000);
        }
    }
}

//covers the game and stops the game from being playable
function coverUp() {
    if (playerHealth <= 0) {
        graphics.fillStyle = "black"
        graphics.fillRect(0, 0, 10000, 10000)
    }
}


//if player touches enemy, start battle

function checkCollision(){
    if (battleActive) return
    let dx = playerX - enemyX
    let dy = playerY - enemyY
    let distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < playerRadius + enemyRadius) {
        startBattle()
    }
}


// Creates the player
function player(){
    graphics.drawImage(knight, playerX, playerY, 50, 50)
}
// Creates the enemy
function enemy(){ 
    graphics.drawImage(goblin, enemyX, enemyY, 50, 50)
}
// Movement for the player
document.addEventListener("keydown", (event)=>{
    if(event.key === "ArrowUp"){
        movingUp = true
    }else if(event.key === "ArrowDown"){
        movingDown = true
    }
})

document.addEventListener("keyup",(event)=>{
    if(event.key === "ArrowUp"){
        movingUp = false
    }else if(event.key === "ArrowDown"){
        movingDown = false
    }
})

document.addEventListener("keydown",(event)=>{
    if(event.key === "ArrowLeft"){
        movingLeft = true
    }else if(event.key === "ArrowRight"){
        movingRight = true
    }
})
document.addEventListener("keyup",(event)=>{
    if(event.key === "ArrowLeft"){
        movingLeft = false
    }else if(event.key === "ArrowRight"){
        movingRight = false
    }
})

function movement(){
    if(movingUp){
        playerY -= moveSpeed + fps
    }

    if(movingDown){
        playerY +=moveSpeed + fps
    }

    if(movingLeft){
        playerX -= moveSpeed + fps
    }

    if(movingRight){
        playerX += moveSpeed + fps
    }
}

function reset(){
    message = "" // Holds the current game message
    battleActive = false // Tracks if a battle is ongoing

    playerHealth = 100
    monsterHealth = 100
    fps = 1

    movingUp = false
    movingDown = false
    movingLeft = false
    movingRight = false
    askedPlayAgain = false

    enemyX = 100
    enemyY = 100 
    enemyRadius = 10 

    playerX = canvas.width / 2 // Initial X position
    playerY = canvas.height / 2 // Initial Y position
    actionRects = []
    playersAction = false
}


let game = setInterval(animate,1000/60);