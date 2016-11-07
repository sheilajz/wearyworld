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
    this.stboxw = 0;
    this.inboxw = 0;
    this.stloc = new PVector(250, 450);
    this.inloc = new PVector(450, 550);
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
        fill(255, 255, 255, 50);
        rect(0, starter.stloc.y - 50, starter.stboxw, 60);
        fill(255, 255, 255, 60);
        text("start", starter.stloc.x, starter.stloc.y);
        if (starter.stboxw < starter.stloc.x + 160) {
            starter.stboxw += starter.grower;
        }
    }
    else {
        starter.stboxw = 0;
        fill(255, 255, 255, 60);
        text("start", starter.stloc.x, starter.stloc.y);
    }
    if (((mouseX > starter.inloc.x + 5) && (mouseX < starter.inloc.x + 141)) && ((mouseY > starter.inloc.y - 48) && (mouseY < starter.inloc.y + 1))) {
        fill(255, 255, 255, 50);
        rect(wide - starter.inboxw, starter.inloc.y - 53, starter.inboxw, 60);
        fill(255, 255, 255, 60);
        text("intro", starter.inloc.x, starter.inloc.y);
        if (starter.inboxw < wide - starter.inloc.x + 10) {
            starter.inboxw += starter.grower;
        }
    }
    else {
        starter.inboxw = 0;
        fill(255, 255, 255, 60);
        text("intro", starter.inloc.x, starter.inloc.y);
    }
};

var initSeq = function() {
	background(10, 10, 100);
};

var introSeq = function() {
    background(22, 0, 84);
    textFont(font, 20);
    /*text("Constant war, famine, and disease has created a barren land. Strange creatures began appearing around cities, pillaging", 10, 40);
    text("and destroying. As the people could never know what tomorrow would bring, many desperates", 10, 80);
    text("flocked to religion, including the church and various religious cults for the promise of miracles", 10, 120);
    text("and salvation. As more died, the church grew into an ever-stronger, yet ever-more polarizing", 10, 160);
    text("entity. It began to raise its own armies, monopolize resources, and even form its own states.", 10, 200); */
    text("In these trying times, leaders struggled to provide for their people, and with the", 10, 320); /*
    text("church's power rising daily, began to seek counsel from travelling advisors known as Meyhers.", 10, 240);
    text("These individuals studied many arts, and had the background suited to assist with", 10, 280);
    text("a wide range of situations. You will play as one of these Meyhers, called", 10, 320);
    text("to the aide of many rulers, community and company leaders, and even pastors. A desperate", 10, 360);
    text("mother at a village you often visit has asked you to save her son. He is afflicted with", 10, 400);
    text("a disease that no doctor in the village could diagnose, and was projected to soon die in the village. Though", 10, 440);
    text("refusing at first, you eventually relent, and agree to bring him with you in your travels to show him different scenes and vistas before his time ends.", 10, 480);
    text("The story begins here... Taking the boy under your care, you have adopted him as your son. His life and future has been entrusted to you. Every action you take will decide his future.", 10, 520);*/
};

mousePressed = function() {
    if (gamemode === "start") {
        if (((mouseX > starter.stloc.x) && (mouseX < starter.stloc.x + 150)) && ((mouseY > starter.stloc.y - 45) && (mouseY < starter.stloc.y + 4))) {
        gamemode = "init";
		else if (((mouseX > starter.inloc.x + 5) && (mouseX < starter.inloc.x + 141)) && ((mouseY > starter.inloc.y - 48) && (mouseY < starter.inloc.y + 1))) {
			gamemode = "intro";
		}
    }
    }
};

var update = function() {
    switch (gamemode) {
        case "start":
            playStart();
            break;
		case "init":
			initSeq();
			break;
		case "intro":
			introSeq();
			break;
        default:
            break;
    
    }
};
draw = function() {
    update();
    
};

}};
