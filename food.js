class Food extends Entity{
    constructor(x,y){
        super(x,y);
    }
    draw(){
        fill(255,0,0);
        circle(this.getPosition().x*50+25,this.getPosition().y*50+25, 40);
    }

    update(){
    }
}