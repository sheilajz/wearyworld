var sketchProc=function(processingInstance){ with (processingInstance){
frameRate(60);

var gamemode = "start";
var rnum = random(2500);
var font = createFont("monotype corsiva Bold", 15); // use monostype corsiva font if available
var wide = 800;
var high = 600;
size(wide, high); 

var cloudpatch = function(type, speed) { // create clouds of varying opacities, levels of noise, and movement speeds
    if (type === "a") {
        this.maxop = 205;
        this.xnoise = 0.03;
        this.ynoise = 0.05;
    }
    else {
        this.maxop = 85;
        this.xnoise = 0.06;
        this.ynoise = 0.1;
    }
    this.speed = speed;
    this.rnuma = 0;
    this.rfact = random(-0.05, 0.05);
};
cloudpatch.prototype.draw = function() { // draw perlin noise clouds
    // cloudpatch
    var n1 = rnum;
    for (var x = 0; x <= wide; x += 6) {        
        var n2 = this.rnuma;
        for (var y = 0; y <= high - 200; y += 6) {    
            var c = map(noise(n1,n2), 0, 1, 0, this.maxop);           
            fill(220, 220, 220, c);            
            rect(x,y,6,6);          
            n2 += this.ynoise; // step size in noise         
        }         
        n1 += this.xnoise; // step size in noise  
    }    
    rnum -= this.speed;  // speed of clouds
    this.rnuma -= this.rfact;
};

var startScrn = function() { // start screen is full of shifting clouds
    this.frm = frameCount;
    this.clouds = [];
    this.init();
    this.grower = 20;
    this.boxw = 0;
    this.stloc = new PVector(200, 350);
    this.inloc = new PVector(200, 200);
};
startScrn.prototype.init = function() { // add two layers of clouds to the starting screen
    this.clouds.push(new cloudpatch(0, 0.005));
    this.clouds.push(new cloudpatch(1, 0.01));
};
var starter = new startScrn();

var playStart = function() { // starting screen has clouds and menus
    background(0, 0, 0);
    noStroke();
    for (var i = 0; i < starter.clouds.length; ++i) {
        starter.clouds[i].draw();
    }
    if (starter.frm <= frameCount - 120) {
        for (var j = 0; j < starter.clouds.length; ++j) {
            starter.clouds[j].rfact = random(-0.05, 0.05);
            starter.frm = frameCount;
        }
    }
	fill(0, 10, 0);
	rect(0, high - 200, wide, 200);
	arc(wide/2, high - 200, wide + 200, 200, PI, 2*PI);
    textFont(font, 75);
    if (((mouseX > starter.stloc.x) && (mouseX < starter.stloc.x + 150)) && ((mouseY > starter.stloc.y - 45) && (mouseY < starter.stloc.y + 4))) {
        fill(255, 255, 255, 30);
        rect(0, starter.stloc.y - 50, starter.boxw, 60);
        fill(255, 255, 255, 60);
        text("start", starter.stloc.x, starter.stloc.y);
        if (starter.boxw < starter.stloc.x + 160) {
            starter.boxw += starter.grower;
        }
    }
    else {
        starter.boxw = 0;
        fill(255, 255, 255, 60);
        text("start", starter.stloc.x, starter.stloc.y);
    }
};

mousePressed = function() {
    if (gamemode === "start") {
        if (((mouseX > starter.stloc.x) && (mouseX < starter.stloc.x + 150)) && ((mouseY > starter.stloc.y - 45) && (mouseY < starter.stloc.y + 4))) {
        gamemode = "init";
    }
    }
};

var update = function() {
    switch (gamemode) {
        case "start":
            playStart();
            break;
        default:
            break;
    
    }
};
draw = function() {
    update();
    
};

}};
