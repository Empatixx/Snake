class Player extends Entity{
    constructor(x,y){
        super(x,y);
        this.direction = "none";
        this.points = 0;
        this.previousLocations = new Array();
        this.lastMoveTime = Date.now();
    }
    draw(){
        fill(255,255,255);
        circle(this.getPosition().x*50+25,this.getPosition().y*50+25, 40);
        let index = 0;
        this.previousLocations.forEach(loc =>{
            fill(255,255,255);
            if(index < 4){
                circle(loc.x*50+25,loc.y*50+25, floor(35*(index+1)/4));
            } else {
                circle(loc.x*50+25,loc.y*50+25, floor(35));
            }
            index++;
        });
    }
    setDirection(dir){
        this.direction = dir;
    }
    addPoint(){
        this.points++;
    }
    getPoints(){
        return this.points;
    }

    update(){
        if(Date.now() - this.lastMoveTime > 100){
            this.lastMoveTime = Date.now(); 
            this.#previousLocation();
            if(this.direction == "up"){
                this.position.y--;
            } else if(this.direction == "down"){
                this.position.y++;
            }

            if(this.direction == "left"){
                this.position.x--;
            } else if(this.direction == "right"){
                this.position.x++;
            }
            let deadOutOfBounds = this.checkBounds();
            let deadSelfCollision = this.#checkSelfCollisions();
            if(deadOutOfBounds || deadSelfCollision){
                GAME_OVER = true;
            }
        }
    }
    #checkSelfCollisions(){
        return this.previousLocations.some(loc =>{
            return (loc.x == this.position.x && loc.y == this.position.y);
        });
    }
    #previousLocation(){
        this.previousLocations.push({x: this.position.x, y: this.position.y});
        if(this.previousLocations.length > this.points){
            this.previousLocations.shift();
        }
    }
    doesNotColidePlayer(x,y){
        return this.previousLocations.some(loc =>{
            return loc.x == x && y == loc.y;
        }) || (this.position.x == x && this.position.y == y);
    }
    getPoints(){
        return this.points;
    }
}