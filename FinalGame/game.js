let canvas = document.querySelector("canvas");
const graphics = canvas.getContext("2d");

let screen = "Home";

function animate(){
    if(screen=="Home"){
        createHome();
    }
}

function createHome(){
    graphics.fillStyle = "White";
    graphics.fillRect(canvas.width/2-30,canvas.height/2+30,60,15);
    graphics.fillRect(canvas.width/2-30,canvas.height/2+50,60,15);
    graphics.fillStyle = "Black";
    graphics.fillText("Play",canvas.width/2-10,canvas.height/2+41);
    graphics.fillText("Upgrades",canvas.width/2-21,canvas.height/2+61)
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
                console.log("Game")
            }
            if(y>canvas.height/2+50&&y<canvas.height/2+65){
                screen="Upgrade";
                graphics.clearRect(0,0,canvas.width,canvas.height);
                console.log("Upgrade")
            }
        }
    }
}

let game = setInterval(animate,1000/60);