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


let canvas = document.querySelector("canvas")
const graphics = canvas.getContext('2d')

let playerHealth = 100
let monsterHealth = 100
let fps = 1

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


const choice1 = document.getElementById("Option1")
const choice2 = document.getElementById("Option2")
const choice3 = document.getElementById("Option3")
const choice4 = document.getElementById("Option4")


function clear(){
    graphics.fillStyle = 'black'
    graphics.fillRect(0,0,canvas.width,canvas.height)

}


function animate(){
    clear()
    player()
    enemy()
    movement()
    startBattle()
}
// The choices the player will have during the fight
function Fight(){

}




//randomly, while the player is romping around, a battle will start
function startBattle(){
    console.log("A wild monster appears!")
    playerHealth = 100 // reset player health for the battle
    monsterHealth = 100 // reset monster health for the battle
    battleLoop()
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
    console.log(`Monster attacks! Player takes ${damage} damage. Player health: ${playerHealth}`)
}

function battleLoop(){
    while(playerHealth > 0 && monsterHealth > 0){
        let playerAction = prompt("Choose your action: (1) Attack (2) Heal")
        if(playerAction === "1"){
            let damage = Math.floor(Math.random() * 20) + 1 // randomdamage between 1 and 20
            monsterHealth -= damage
            console.log(`You attack! Monster takes ${damage} damage. Monster health: ${monsterHealth}`)
        } else if(playerAction === "2"){
            let heal = Math.floor(Math.random() * 15) + 1 // randomly heals between 1 and 15
            playerHealth += heal
            console.log(`You heal for ${heal}. Player health: ${playerHealth}`)
        } else{
            console.log("Invalid action. Try again.")
            continue
        }
        if(playerHealth >= 0){
            endScreen()
        }

        if(monsterHealth <= 0){
            console.log("You defeated the monster!")
            break
        }

        monsterAttack()

        if(playerHealth <= 0){
            console.log("You were defeated by the monster.")
            break
        }
    }
}
//Produces the end sreen text
function endScreen() {
    coverUp()
    if (playerHealth <= 0) {
        graphics.fillStyle = "yellow"
        graphics.font = "bold 24px 'Arial', serif"
        graphics.fillText("Game Over")
        if (!askedPlayAgain) {
            askedPlayAgain = true
            setTimeout(() => {
                if (confirm("Play Again? Click OK to restart, Cancel to exit.")) {
                    resetGame()
                }
            }, 2000)
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

function resetGame() {
    //sends them to a webpage
    window.location.href = "homePage.html"
    askedPlayAgain = false
}

//if player touches enemy, start battle
function checkCollision(){
    let dx = playerX - enemyX
    let dy = playerY - enemyY
    let distance = Math.sqrt(dx * dx + dy * dy)
    if(distance < playerRadius + enemyRadius){
        startBattle()
    }
}


// Creates the player
function player(){ 
    graphics.fillStyle= "yellow"
    graphics.beginPath()
    graphics.arc(playerX, playerY, playerRadius, 0, Math.PI*2)
    graphics.fill()
    graphics.closePath()
}
// Creates the enemy
function enemy(){ 
    graphics.fillStyle= "red"
    graphics.beginPath()
    graphics.arc(enemyX, enemyY, enemyRadius, 0, Math.PI*2)
    graphics.fill()
    graphics.closePath()
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







window.setInterval(animate,fps/10000)