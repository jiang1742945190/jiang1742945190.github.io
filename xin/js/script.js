var RUN_AS_ANIMATION=true,

wrapper, canvas, context, width=600, height=600, Tau=Math.PI*2,
systems=[],
mouseX=0, mouseY=0, repelMouse = true,
copyCount=1, sequenceCount=0, maxSequenceCount=22, sequenceDelay=2000,
orbitting=false, orbitAngle, orbitDegrees=0, orbitSpeed=1, orbitalRadius=10, PI180=Math.PI/180, orbitVX, orbitVY,
colourInterval,
repaintColour="rgba(0,0,0, .05)",
pathObjects=[];
pathObjects.push( {pLength:0, dom:null, pcStep:0, pt:null, id:"heart", shape:"M 209.95 88.4 Q 210 86.85 210 86.5 210 86.05 210 85.6 210.65 27.5 177.7 7.25 143.7 -13.75 104.9 26 66.3 -13.75 32.3 7.25 -1.85 28.2 0.1 89.75 2.05 151.35 104.9 230 207.95 151.35 209.9 89.75 209.9 89.05 209.95 88.4 Z"} ),
pathObjects.push( {pLength:0, dom:null, pcStep:0, pt:null, id:"star", shape:"M 0 115.05 L 81.35 86.25 83.55 0 136 68.5 218.7 43.95 169.8 115.05 218.7 186.1 136 161.55 83.55 230 81.35 143.8 0 115.05 Z"} ),
pathObjects.push( {pLength:0, dom:null, pcStep:0, pt:null, id:"circle", shape:"M 220 110 Q 220 155.6 187.75 187.8 155.6 220 110 220 64.4 220 32.15 187.8 0 155.6 0 110 0 64.4 32.15 32.2 64.4 0 110 0 155.6 0 187.75 32.2 220 64.4 220 110 Z"} ),
pathObjects.push( {pLength:0, dom:null, pcStep:0, pt:null, id:"smallHeart", shape:"M 174.15 97.5 Q 174.2 96.45 174.2 96.25 174.2 95.95 174.2 95.65 174.6 57.35 152.9 44.05 130.5 30.2 104.95 56.4 79.55 30.2 57.15 44.05 34.65 57.85 35.9 98.35 37.2 138.95 104.95 190.75 172.85 138.95 174.15 98.35 174.15 97.9 174.15 97.5 Z"} ),
pathObjects.push( {pLength:0, dom:null, pcStep:0, pt:null, id:"hallow", shape:"M 220 188.7 L 219.5 187.75 Q 219.25 188.25 219.05 188.7 L 220 188.7 Z M 219.5 187.75 L 107.3 0.95 107.3 63.075 Q 107.85 63.05 108.4 63.05 116.65 63.05 124.15 64.95 140.05 68.9 152.5 81.3 170.75 99.6 170.75 125.4 170.75 139.9 165 152.05 M 219.05 188.7 L 106.95 188.7 0 188.7 107 0.45 107.3 0.95 M 106.95 188.7 L 106.95 187.75 106.9 187.75 Q 82 187.25 64.3 169.5 46 151.25 46 125.4 46 111.2 51.55 99.3 56.1 89.5 64.3 81.3 82 63.55 106.9 63.1 L 106.95 63.1 Q 107.125 63.087890625 107.3 63.075 L 107.3 187.75 Q 107.480859375 187.75 107.65 187.75 108 187.75 108.4 187.75 134.2 187.75 152.5 169.5 160.3 161.7 164.75 152.5 M 107.3 187.75 Q 107.1302734375 187.75 106.95 187.75"} ),
pathObjects.push( {pLength:0, dom:null, pcStep:0, pt:null, id:"kiss", shape:"M 220 111.85 Q 219.6 112.1 219.2 112.35 187.4 131.35 162.3 153.55 141.15 172.15 110.5 173.35 79.15 172.4 57.8 153.55 32.6 131.3 0.6 112.2 0.3 112.05 0.05 111.85 M 219.2 112.35 Q 215.5 113.85 202.2 106.5 187.95 98.5 165 71 142.4 43.9 109.9 62.05 77.35 43.9 54.75 71 31.8 98.5 17.55 106.5 4.25 113.85 0.6 112.2 M 36.3 113.85 Q 65.95 119.15 84.55 120.75 109.25 111.8 130.8 120.05 151.35 118.9 179.7 113.85 M 84.55 120.75 Q 109.25 127.95 130.8 120.05"} ),


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var ParticleSystem = function(id){
    Object.defineProperty(this, 'colour', { value:'#FF1515', writable:true });
    Object.defineProperty(this, 'friction', { value:.9, writable:true });                // f < 1 == slows;  f > 1 == speeds up
    Object.defineProperty(this, 'height', { value:100, writable:true });
    Object.defineProperty(this, 'id', { value:id, writable:true} );
    Object.defineProperty(this, 'maxSpeed', { value:10, writable:true });
    Object.defineProperty(this, 'mouseRepelDist', { value:100, writable:true });         // Size of repel circle
    Object.defineProperty(this, 'mouseForce', { value:.05, writable:true });             // dist particle moves when influenced by mouse. lower number: blends shape more: .05 - n
    Object.defineProperty(this, 'numParticles', { value:50, writable:true }); 
    Object.defineProperty(this, 'particles', { value:[], writable:true });
    Object.defineProperty(this, 'repelMouse', { value:true, writable:true });
    Object.defineProperty(this, 'springTo', { value:true, writable:true });
    Object.defineProperty(this, 'springForce', { value:.01, writable:true });           // speed of return to spring point. tightness
    Object.defineProperty(this, 'wandering', { value:true, writable:true });
    Object.defineProperty(this, 'wander', { value:.05, writable:true });                  // bigger number - fuzzier .05 just perceptible
    Object.defineProperty(this, 'wanderMod', { value:this.wander*.5, writable:true });
    Object.defineProperty(this, 'width', { value:100, writable:true });
    Object.defineProperty(this, 'x', { value:0, writable:true });
    Object.defineProperty(this, 'y', { value:0, writable:true });
}
ParticleSystem.prototype.setWander = function(value){ this.wander = value; this.wanderMod = value*.5 }

ParticleSystem.prototype.generate = function(){
    for(var j=0; j<pathObjects.length; j+=1){
        pathObjects[j].pcStep = pathObjects[j].pLength / this.numParticles;
    }
    var pShapeArrayX, pShapeArrayY;
    for(var i=0; i<this.numParticles; i++){
        // pass in pattern points
        pShapeArrayX = [];
        pShapeArrayY = [];
        for(var p=0; p<pathObjects.length; p+=1){
            pathObjects[p].pt = pathObjects[p].dom.getPointAtLength(i*pathObjects[p].pcStep);
            pShapeArrayX.push(pathObjects[p].pt.x + ((this.width-220)/2));
            pShapeArrayY.push(pathObjects[p].pt.y + ((this.height-230)/2));
        }
        var p = new Particle("p"+i, pShapeArrayX, pShapeArrayY, this);
        this.particles.push(p);
    }
}

ParticleSystem.prototype.update = function(){
    var particle;
    for(var i=0; i<this.numParticles; i++){
        particle = this.particles[i];
        particle.pUpdate();
    }
}

ParticleSystem.prototype.pShapeMorph = function(value){
    var particle;
    for(var i=0; i<this.numParticles; i++){
        particle = this.particles[i];
        particle.pChangeSpringPoint(value);
    }
}

var Particle = function(id, x, y, parentSystem){
    Object.defineProperty(this, 'id', { value:id, writable:true });
    Object.defineProperty(this, 'shapesX', { value:x, writable:true });
    Object.defineProperty(this, 'shapesY', { value:y, writable:true });
    Object.defineProperty(this, 'x', { value:this.shapesX[0], writable:true });
    Object.defineProperty(this, 'y', { value:this.shapesY[0], writable:true });
    Object.defineProperty(this, 'sx', { value:this.x, writable:true });
    Object.defineProperty(this, 'sy', { value:this.y, writable:true });
    Object.defineProperty(this, 'vx', { value:0, writable:true });
    Object.defineProperty(this, 'vy', { value:0, writable:true });
    Object.defineProperty(this, 'densityScore', { value:1, writable:true });
    Object.defineProperty(this, 'parentSystem', { value:parentSystem, writable:true });
    return this;
}

Particle.prototype.pChangeSpringPoint = function(value){
    // change spring point - causes morph
    if(value < 0) value = 0;
    if(value >= this.x.length) value = this.x.length-1;
    this.sx = this.shapesX[value];
    this.sy = this.shapesY[value];
}

Particle.prototype.pUpdate = function(){
    
    // randomise movement slightly
    if(this.parentSystem.wandering){
        this.vx += Math.random() * this.parentSystem.wander - this.parentSystem.wanderMod;
        this.vy += Math.random() * this.parentSystem.wander - this.parentSystem.wanderMod;
    }

    // apply friction
    this.vx *= this.parentSystem.friction;
    this.vy *= this.parentSystem.friction;

    // constrain to speed bounds
    var speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
    if (speed > this.parentSystem.maxSpeed) {
        this.vx = this.parentSystem.maxSpeed * this.vx / speed;
        this.vy = this.parentSystem.maxSpeed * this.vy / speed;
    }

    // stay attached to point
    if(this.parentSystem.springTo){
        this.vx += (this.sx - this.x) * this.parentSystem.springForce;
        this.vy += (this.sy - this.y) * this.parentSystem.springForce;
    }

    // avoid the mouse
    if(this.parentSystem.repelMouse){
        var dx = mouseX - this.x;
        var dy = mouseY - this.y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < this.parentSystem.mouseRepelDist) {
            var tx = mouseX - this.parentSystem.mouseRepelDist * dx / dist;
            var ty = mouseY - this.parentSystem.mouseRepelDist * dy / dist;
            this.vx += (tx - this.x) * this.parentSystem.mouseForce;
            this.vy += (ty - this.y) * this.parentSystem.mouseForce;
        }
    }

    // update position
    this.x += this.vx;
    this.y += this.vy;
}

function get(id) {
    return document.getElementById(id);
}

function createCanvas(id, w, h){
    var tCanvas = document.createElement("canvas");
    tCanvas.width = w;
    tCanvas.height = h;
    tCanvas.id = id;
    return tCanvas;
}

function init(){
    var tPath;
    for(var i=0; i<pathObjects.length; i+=1){
        tPath = document.createElementNS('http://www.w3.org/2000/svg','path');
        tPath.setAttribute('d', pathObjects[i].shape);
        pathObjects[i].dom = tPath;
        pathObjects[i].pLength = tPath.getTotalLength();
    }

    wrapper = get("wrapper");
    canvas =  createCanvas("canvas", width, height);
    wrapper.appendChild(canvas);
    context = canvas.getContext("2d");

    /* Define new ParticleSystem and set values */
    var system1 = new ParticleSystem('pSys1');
    systems.push(system1);
    system1.width = width;
    system1.height = height;
    system1.maxSpeed = 3;
    system1.scalar = .3;
    system1.numParticles = 100;
    system1.x = 150;
    system1.y = 150;
    system1.setWander(1);
    system1.generate();
}

function update(){
    for(var i=0; i<systems.length; i++){
        systems[i].update();
    }
    if(orbitting){
        doOrbit();
    }
}

function draw(){
    var system;
    for(var i=0; i<systems.length; i++){
        system = systems[i];
        context.fillStyle = system.colour;
        var particle;
        for(var j=0; j<system.numParticles; j+=1) {
            particle = system.particles[j];
            context.beginPath();
            if(particle.densityScore > 0){
                context.arc(particle.x, particle.y, particle.densityScore, 0, Tau, false);
            }
            context.fill();
        }
    }
}

function animate(){
    context.fillStyle = repaintColour;
    context.fillRect(0, 0, width, height);
    update();
    draw();
    requestAnimFrame(animate);
}

function setUpEvents(){
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        mouseX = mousePos.x;
        mouseY = mousePos.y;
    }, false);
}

function doOrbit(){
    orbitAngle = orbitDegrees * PI180;
    orbitDegrees += orbitSpeed;
    orbitVX = orbitalRadius * Math.cos(orbitAngle);
    orbitVY = orbitalRadius * Math.sin(orbitAngle);
    mouseX = orbitVX + width*.5;
    mouseY = orbitVY + height*.5;
    // expand orbit
    orbitSpeed*=1.003;
    orbitalRadius*=1.003;
}

function randomColour(){
    var r = Math.round(Math.random()*125)+130,
    g = Math.round(Math.random()*155)+100,
    b = Math.round(Math.random()*155)+100;
    return 'rgb('+r+','+g+','+b+')';
}

function clickHandler(evt){
    switch(evt.target.id){
        case "heart":
            systems[0].pShapeMorph(0);
            break;
        case "star":
            systems[0].pShapeMorph(1);
            break;
        case "circle":
            systems[0].pShapeMorph(2);
            break;
        case "hallow":
            systems[0].pShapeMorph(4);
            break;
        case "kiss":
            systems[0].pShapeMorph(5);
            break;
        case "wander":
            systems[0].setWander(evt.target.value);
            break;
        case "friction":
            systems[0].friction = evt.target.value;
            break;
        case "mouseDistance":
            systems[0].mouseRepelDist = evt.target.value;
            break;
        case "mouseForce":
            systems[0].mouseForce = evt.target.value;
            break;
        case "springForce":
            systems[0].springForce = evt.target.value;
            break;
        default:
            /* [[-_-]] */
    }
}

function enableUI(){
    get("heart").addEventListener("click", clickHandler, false);
    get("star").addEventListener("click", clickHandler, false);
    get("circle").addEventListener("click", clickHandler, false);
    get("hallow").addEventListener("click", clickHandler, false);
    get("kiss").addEventListener("click", clickHandler, false);
//
//    get('wander').addEventListener("change", clickHandler, false);
//    get('friction').addEventListener("change", clickHandler, false);
//    get('mouseDistance').addEventListener("change", clickHandler, false);
//    get('mouseForce').addEventListener("change", clickHandler, false);
//    get('springForce').addEventListener("change", clickHandler, false);
    get('UI').style.display = "block";
}

function sequencer(){
    sequenceCount++;
    switch(sequenceCount){
        case 2:
            sequenceDelay=3000;
            systems[0].colour = '#CACAF8';
            get("w"+(copyCount++)).style.display="none";
            get("w"+copyCount).style.display="block";
            systems[0].pShapeMorph(1);
            break;
        case 3:
            sequenceDelay=3000;
            systems[0].colour = '#FF1515';
            get("w"+(copyCount++)).style.display="none";
            get("w"+copyCount).style.display="block";
            systems[0].pShapeMorph(0);
            break;
        case 4:
            sequenceDelay=500;
            systems[0].colour = '#69359c';
            systems[0].pShapeMorph(3);
            break;
        case 5:
            sequenceDelay=500;
            systems[0].colour = '#FF1515';
            systems[0].pShapeMorph(0);
            break;
        case 6:
            sequenceDelay=500;
            systems[0].colour = '#69359c';
            get("w"+(copyCount++)).style.display="none";
            get("w"+copyCount).style.display="block";
            systems[0].pShapeMorph(3);
            break;
        case 7:
            sequenceDelay=600;
            systems[0].colour = '#FF1515';
            systems[0].pShapeMorph(0);
            break;
        case 8:
            sequenceDelay=500;
            systems[0].colour = '#69359c';
            systems[0].pShapeMorph(3);
            break;
        case 9:
            sequenceDelay=1000;
            systems[0].colour = '#FF1515';
            systems[0].pShapeMorph(0);
            break;
        case 10:
            sequenceDelay=3500;
            systems[0].pShapeMorph(2);
            get("w"+(copyCount++)).style.display="none";
            get("w"+copyCount).style.display="block";
            break;
        case 11:
            sequenceDelay=1200;
            get("w"+(copyCount++)).style.display="none";
            get("w"+copyCount).style.display="block";
            mouseX = width * .5;
            mouseY = height * .5;
            systems[0].mouseForce = 7;
            systems[0].mouseRepelDist = 175;
            systems[0].springForce = .1;
            systems[0].setWander(.05);
            break;
        case 12:
            sequenceDelay=9000;
            orbitting=true;
            break;
        case 13:
            sequenceDelay=10000;
            systems[0].colour = randomColour();
            colourInterval = setInterval( function(){systems[0].colour = randomColour();}, 500 );
            get("w"+(copyCount++)).style.display="none";
            get("w"+copyCount).style.display="block";
            break;
        case 14:
            sequenceDelay=2000;
            clearInterval(colourInterval);
            systems[0].colour = '#FFFFFF';
            break;
        case 15:
            sequenceDelay=300;
            systems[0].colour = '#FF1515';
            get("w"+(copyCount++)).style.display="none";
            get("w"+copyCount).style.display="block";
            orbitting=false;
            systems[0].pShapeMorph(0);
            mouseX = width * .5;
            mouseY = height * .5;
            break;
        case 16:
            sequenceDelay=300;
            systems[0].mouseForce = 6;
            systems[0].mouseRepelDist = 150;
            break;
        case 17:
            sequenceDelay=300;
            systems[0].mouseForce = 4;
            systems[0].mouseRepelDist = 100;
            break;
        case 18:
            sequenceDelay=7000;
            systems[0].mouseForce = 0.05;
            systems[0].mouseRepelDist = 100;
            systems[0].friction = 1.01;
            mouseX = 0;
            mouseY = 0;
            break;
        case 19:
            sequenceDelay=300;
            get("w"+(copyCount++)).style.display="none";
            get("w"+copyCount).style.display="block";
            systems[0].friction = .9;
            systems[0].springForce = .01;
            setUpEvents();
            break;
        case 20:
            sequenceDelay=2000;
            break;
        case 21:
            sequenceDelay=5000;
            enableUI();
            break;
        case 22:
            get("w"+copyCount).style.display="none";
            break;
        default:
            /* [[-_-]] */
    }
    if(sequenceCount < maxSequenceCount){
        setTimeout(function(){ sequencer(); }, sequenceDelay);
    }
}

init();
animate();
if(!RUN_AS_ANIMATION){
    setUpEvents();
    enableUI();
}
else{
    setTimeout(function(){ sequencer(); }, sequenceDelay);
}