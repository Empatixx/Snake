class Entity{

    constructor(x,y){
        //this.x = x;
        //this.y = y;
        this.position = {x: x, y: y};
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    setPosition(x,y){
        this.position = {x: x, y: y};
    }
    getPosition(){
        return this.position;
    }
    // returns true if entity was out of bound
    checkBounds(){
        let maxTiles = 10;
        let correction = false;
        if(this.position.x >= maxTiles){
            this.position.x = maxTiles - 1;
            correction = true;
        } 
        if(this.position.y >= maxTiles){
            this.position.y = maxTiles - 1;
            correction = true;
        }
        if(this.position.x < 0){
            this.position.x = 0;
            correction = true;
        }
        if(this.position.y < 0){
            this.position.y = 0;
            correction = true;
        }
        return correction;
    }
}