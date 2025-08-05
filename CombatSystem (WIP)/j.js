// making a turn in the combat system
// this code will be integraded into other files later

let canvas = document.querySelector("canvas")
const graphics = canvas.getContext('2d')

let playerHealth = 100
let monsterHealth = 100
let fps = 60


let x = 20
let y =100
let speed = 1



let playerX = canvas.width / 2 // Initial X position
let playerY = canvas.height / 2 // Initial Y position
const playerRadius = 20
const moveSpeed = 5


function clear(){
    graphics.fillStyle = 'black'
    graphics.fillRect(0,0,canvas.width,canvas.height)

}


function battle(){
    clear()
    player()
    
}

//randomly, while the player is romping around, a battle will start
function startBattle(){
    console.log("A wild monster appears!")
    playerHealth = 100 // reset player health for the battle
    monsterHealth = 100 // reset monster health for the battle
    battleLoop()
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
            let damage = Math.floor(Math.random() * 20) + 1 // random damage between 1 and 20
            monsterHealth -= damage
            console.log(`You attack! Monster takes ${damage} damage. Monster health: ${monsterHealth}`)
        } else if(playerAction === "2"){
            let heal = Math.floor(Math.random() * 15) + 1 // random heal between 1 and 15
            playerHealth += heal
            console.log(`You heal for ${heal}. Player health: ${playerHealth}`)
        } else {
            console.log("Invalid action. Try again.")
            continue
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


// Creates the player
function player(){

    graphics.fillStyle= "yellow"
    graphics.beginPath()
    graphics.arc(x,y,playerRadius,0,Math.PI*2)
    graphics.fill()
    graphics.closePath()
}

// Movement for the player
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            playerY -= moveSpeed
            break
        case "ArrowDown":
            playerY += moveSpeed
            break
        case "ArrowLeft":
            playerX -= moveSpeed
            break
        case "ArrowRight":
            playerX += moveSpeed
            break
        }
        player()
    }
)


window.setInterval(animate,fps/1000)