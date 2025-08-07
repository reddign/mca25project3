// WARNING: This code is a work in progress and may not function as intended.


let mainCanvas = document.getElementById("mainCanvas")
let battleCanvas = document.getElementById("battleCanvas")
let canvas = mainCanvas // default to mainCanvas
let graphics = canvas.getContext('2d')


let message = "" // Holds the current game message
let battleActive = false // Tracks if a battle is ongoing

let playerHealth = 10
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



function animate(){
    if (battleActive) {
        // Switch to battle canvas
        mainCanvas.style.display = "none";
        battleCanvas.style.display = "block";
        canvas = battleCanvas;
        graphics = canvas.getContext('2d');
        clearBattle();
        drawBattleScene();
        endScreen();
        if (message) {
            graphics.fillStyle = "white";
            graphics.font = "20px Arial";
            graphics.fillText(message, 20, 40);
        }
        if (playersAction) {
            drawActionOptions();
        }
    } else {
        // Switch to main canvas
        battleCanvas.style.display = "none";
        mainCanvas.style.display = "block";
        canvas = mainCanvas;
        graphics = canvas.getContext('2d');
        clear();
        player();
        enemy();
        movement();
        checkCollision();
        endScreen();
        if (message) {
            graphics.fillStyle = "white";
            graphics.font = "20px Arial";
            graphics.fillText(message, 20, 40);
        }
    }
}

function clearBattle() {
    graphics.fillStyle = 'darkred';
    graphics.fillRect(0,0,canvas.width,canvas.height);
}

function drawBattleScene() {
    // Draw player and monster in battle positions
    graphics.drawImage(knight, 200, 300, 100, 100);
    graphics.drawImage(goblin, 700, 100, 100, 100);
    // Draw health bars
    graphics.fillStyle = "white";
    graphics.font = "bold 18px Arial";
    graphics.fillText("Player HP: " + playerHealth, 200, 280);
    graphics.fillText("Monster HP: " + monsterHealth, 700, 90);
}

//randomly, while the player is romping around, a battle will start


function startBattle(){
    if (battleActive) return
    battleActive = true
    message = "A wild monster appears!"
    playerHealth = 100 // reset player health for the battle
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
    let startX = 40
    let startY = 80
    let width = 120
    let height = 40
    let gap = 20
    graphics.font = "bold 22px Arial"
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
        graphics.fillText(actionOptions[i].label, x + 20, y + 27)
        // Store rect for click detection
        actionRects.push({ x, y, w: width, h: height, action: actionOptions[i].action })
    }
}

function action(option) {
    if (playerHealth <= 0 || monsterHealth <= 0) return
    playersAction = false
    if (option === "1") {
        let damage = Math.floor(Math.random() * 20) + 1
        monsterHealth -= damage
        message = `You attack! Monster takes ${damage} damage. Monster health: ${monsterHealth}`
    } else if (option === "2") {
        let heal = Math.floor(Math.random() * 15) + 1
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
        message = "You defeated the monster!";
        setTimeout(() => {
            battleActive = false;
            mainCanvas.style.display = "block";
            battleCanvas.style.display = "none";
            canvas = mainCanvas;
            graphics = canvas.getContext('2d');
            // Move enemy off screen so player doesn't instantly re-trigger battle
            enemyX = -100;
            enemyY = -100;
            animate(); // Force redraw to update canvas
            // Clear message after 1 second
            setTimeout(() => { message = ""; }, 1000);
        }, 1500);
        return;
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
                    window.location.href = "http//:127.0.0.1/mca/mca25project3/webDesign/homePage.php";
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



// Always listen for clicks on both canvases, but only process if in battle
battleCanvas.addEventListener("mousedown", function(event) {
    if (!(battleActive && playersAction)) return;
    let rect = battleCanvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    for (let i = 0; i < actionRects.length; i++) {
        let round = actionRects[i];
        if (mouseX >= round.x && mouseX <= round.x + round.w && mouseY >= round.y && mouseY <= round.y + round.h) {
            action(round.action);
            break;
        }
    }
});


window.setInterval(animate,fps/10000)