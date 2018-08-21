function Copter(pos,vel){
    this.position = pos;
    this.velocity = vel;
    this.deltaT   = 0.5;

    this.move = function(){
        for(i=0;i<2;++i)
            this.position[i] += this.velocity[i]*this.deltaT;
    }
}

function moveCopter(copter){
    //copter.move();
    //console.log(copter.position.toString());
}
