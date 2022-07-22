const totalTilesEachAxis = 10;
let sizeWidth;
let sizeHeight;

const size = 500;

let entities;
let button;

var GAME_OVER = false;

function setup(){
    sizeWidth = size / totalTilesEachAxis;
    sizeHeight = size / totalTilesEachAxis;
    
    button = createButton("Restart");
    //button.position(190,225);
    button.hide();
    button.mousePressed(() =>{
        startGame();
    });
    
    startGame();

    createCanvas(size,size);
    frameRate(60);
}
function startGame(){
    GAME_OVER = false;
    button.hide();
    entities = new Array();

    entities.push(new Player(4,4));
    entities.push(new Food(getRandomInt(0,9),getRandomInt(0,9)));
}

function draw(){
    if(!GAME_OVER){
        update();
    }

    background(0);
    for(i = 0;i<=10;i++){
        stroke(255);
        line(i*sizeWidth,0,i*sizeWidth,windowHeight);
    }
    for(i = 0;i<=10;i++){
        stroke(255);
        line(0,i*sizeHeight,windowWidth,i*sizeHeight);
    }
    entities.forEach(e => e.draw());
    if(GAME_OVER){
        fill(243, 100, 68,200);
        rect(125,100,250,250);
        textSize(30);
        textAlign(CENTER);
        fill(255,0,0);
        text("Game Over",250,175);

        textSize(15);
        textAlign(CENTER);
        fill(0,0,0);
        text("Total points: "+entities[0].getPoints(),250,200);
    }
}
function update(){
    let preState = GAME_OVER;
    entities.forEach(e => e.update());
    if(GAME_OVER && !preState){
        button.show();
    }
    checkFoodCollisions();
}
function keyPressed() {
    if (keyCode === 87) { // W
        entities.forEach(e =>{
            if(e instanceof Player){
                e.setDirection("up");
            }
        });
    } else if (keyCode === 65) { // A
        entities.forEach(e =>{
            if(e instanceof Player){
                e.setDirection("left");
            }
        });
    } else if (keyCode === 68) { // D
        //
        entities.forEach(e =>{
            if(e instanceof Player){
                e.setDirection("right");
            }
        });
    } else if (keyCode === 83) { // S
        //
        entities.forEach(e =>{
            if(e instanceof Player){
                e.setDirection("down");
            }
        });
    }
}
function checkFoodCollisions(){
    let i;
    for (i = entities.length - 1; i >= 1; i--) {
        if(entities[i] instanceof Food){
            if (entities[i].getPosition().x == entities[0].getPosition().x && entities[i].getPosition().y == entities[0].getPosition().y){
                let preX = entities[i].getPosition().x;
                let preY = entities[i].getPosition().y;
                food = new Food(getRandomInt(0,9),getRandomInt(0,9));
                while((food.getPosition().x == preX && food.getPosition().y == preY)
                 || entities[0].doesNotColidePlayer(food.getPosition().x,food.getPosition().y)){
                    food.setPosition(getRandomInt(0,9),getRandomInt(0,9));
                }
                entities.splice(i,1);
                entities.push(food);
                entities[0].addPoint();
                i++;
            }
        }
    }
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*function windowResized() {
    sizeWidth = windowWidth / totalTilesEachAxis;
    sizeHeight = windowHeight / totalTilesEachAxis;
    resizeCanvas(windowWidth, windowHeight);
}*/