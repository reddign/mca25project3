// making a turn in the combat system
// this code will be integraded into other files later

/*
TODO: Fix the battle system so that it works with the combat system
      Fix the end screen so that it sends the player to the home page
      Fix the player collision with the enemy
      Fix the Option buttons so that they work with the combat system
      Take everything out of the console log and put it into the game
*/

// WARNING: This code is a work in progress and may not function as intended.




const canvas = document.querySelector("canvas")
const graphics = canvas.getContext('2d')

let message = ""
let battleActive = false
let playerHealth = 100, monsterHealth = 100
let fps = 1
let movingUp = false, movingDown = false, movingLeft = false, movingRight = false
let askedPlayAgain = false
let enemyX = 100, enemyY = 100, enemyRadius = 10
let playerX = canvas.width / 2, playerY = canvas.height / 2, playerRadius = 10, moveSpeed = 1




function clear() {
    graphics.fillStyle = 'black'
    graphics.fillRect(0, 0, canvas.width, canvas.height)
}




function animate() {
    clear()
    drawCircle(playerX, playerY, playerRadius, "yellow")
    drawCircle(enemyX, enemyY, enemyRadius, "red")
    movePlayer()
    checkCollision()
    if (message) {
        graphics.fillStyle = "white"
        graphics.font = "20px Arial"
        graphics.fillText(message, 20, 40)
    }
    if (battleActive && awaitingPlayerAction) drawActionOptions()
}

function drawCircle(x, y, r, color) {
    graphics.fillStyle = color
    graphics.beginPath()
    graphics.arc(x, y, r, 0, Math.PI * 2)
    graphics.fill()
    graphics.closePath()
}





function startBattle() {
    if (battleActive) return
    battleActive = true
    message = "A wild monster appears!"
    playerHealth = 100
    monsterHealth = 100
    setTimeout(battleLoop, 1000)
}



function monsterAttack() {
    let damage = Math.floor(Math.random() * 20) + 1
    playerHealth -= damage
    message = `Monster attacks! Player takes ${damage} damage. Player health: ${playerHealth}`
}

// Refactored battle loop to use canvas for choices

const actionOptions = [
    { label: "Fight", action: "1" },
    { label: "Magic", action: "2" },
    { label: "Item", action: "3" },
    { label: "Flee", action: "4" }
]
let actionRects = [], awaitingPlayerAction = false


function battleLoop() {
    awaitingPlayerAction = true
}


function drawActionOptions(){
    actionRects = []
    let startX = 40, startY = 80, btnW = 120, btnH = 40, gap = 20
    graphics.font = "bold 22px Arial"
    actionOptions.forEach((opt, i) => {
        let x = startX, y = startY + i * (btnH + gap)
        graphics.fillStyle = "#333"
        graphics.fillRect(x, y, btnW, btnH)
        graphics.strokeStyle = "#fff"
        graphics.strokeRect(x, y, btnW, btnH)
        graphics.fillStyle = "#fff"
        graphics.fillText(opt.label, x + 20, y + 27)
        actionRects.push({ x, y, w: btnW, h: btnH, action: opt.action })
    })
}


function handleCanvasAction(action){
    if (playerHealth <= 0 || monsterHealth <= 0) return
    awaitingPlayerAction = false
    if (action === "1"){
        let damage = Math.floor(Math.random() * 20) + 1
        monsterHealth -= damage
        message = `You attack! Monster takes ${damage} damage. Monster health: ${monsterHealth}`
    } else if (action === "2"){
        let heal = Math.floor(Math.random() * 15) + 1
        playerHealth += heal
        message = `You heal for ${heal}. Player health: ${playerHealth}`
    } else if (action === "3"){
        message = "You rummage for an item, but your bag is empty!"
    } else if (action === "4"){
        message = "You try to flee, but the monster blocks your path!"
    } else{
        message = "Invalid action. Try again."
        awaitingPlayerAction = true
        return
    }
    if (monsterHealth <= 0){
        message = "You defeated the monster!"
        setTimeout(endScreen, 1500)
        return
    }
    setTimeout(() => {
        monsterAttack()
        if (playerHealth <= 0){
            message = "You were defeated by the monster."
            setTimeout(endScreen, 1500)
        } else {
            awaitingPlayerAction = true
        }
    }, 1000)
}


function endScreen(){
    graphics.fillStyle = "black"
    graphics.fillRect(0, 0, canvas.width, canvas.height)
    graphics.fillStyle = "yellow"
    graphics.font = "bold 32px Arial"
    graphics.fillText(playerHealth <= 0 ? "Game Over" : "Victory!", 100, 200)
    battleActive = false
    if (!askedPlayAgain) {
        askedPlayAgain = true
        setTimeout(() => {
            if (confirm("Play Again? Click OK to restart, Cancel to exit.")) resetGame()
        }, 2000)
    }
}

function resetGame(){
    window.location.href = "homePage.html"
    askedPlayAgain = false
}


function checkCollision(){
    if (battleActive) return
    let dx = playerX - enemyX, dy = playerY - enemyY
    let distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < playerRadius + enemyRadius) startBattle()
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") movingUp = true
    if (e.key === "ArrowDown") movingDown = true
    if (e.key === "ArrowLeft") movingLeft = true
    if (e.key === "ArrowRight") movingRight = true
})
document.addEventListener("keyup", e => {
    if (e.key === "ArrowUp") movingUp = false
    if (e.key === "ArrowDown") movingDown = false
    if (e.key === "ArrowLeft") movingLeft = false
    if (e.key === "ArrowRight") movingRight = false
})

function movePlayer() {
    if (movingUp) playerY -= moveSpeed + fps
    if (movingDown) playerY += moveSpeed + fps
    if (movingLeft) playerX -= moveSpeed + fps
    if (movingRight) playerX += moveSpeed + fps
}


canvas.addEventListener("mousedown", evt => {
    if (!(battleActive && awaitingPlayerAction)) return
    let rect = canvas.getBoundingClientRect()
    let mouseX = evt.clientX - rect.left, mouseY = evt.clientY - rect.top
    actionRects.forEach(r => {
        if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) handleCanvasAction(r.action)
    })
})


window.setInterval(animate, fps / 10000)