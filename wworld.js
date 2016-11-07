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


var son = function(x, y) {
    this.pos = new PVector(x, y);
    
};
son.prototype.draw = function() {
    noStroke();
    fill(14, 0, 41);
    pushMatrix();
    rotate(PI/10);
    ellipse(this.pos.x + 85, this.pos.y + -62, 12, 15);
    popMatrix();
    stroke(14, 0, 41);
    strokeWeight(3);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 16);
    line(this.pos.x, this.pos.y + 4, this.pos.x - 5, this.pos.y - 10);
    line(this.pos.x, this.pos.y - 17, this.pos.x - 5, this.pos.y - 10);
    line(this.pos.x, this.pos.y + 4, this.pos.x + 5, this.pos.y + 10);
    line(this.pos.x + 9, this.pos.y + 7, this.pos.x + 5, this.pos.y + 10);
    line(this.pos.x, this.pos.y + 18, this.pos.x - 10, this.pos.y + 27);
    line(this.pos.x, this.pos.y + 18, this.pos.x + 10, this.pos.y + 27);
};
var myson = new son(wide/2, high - 100);

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
    fill(255, 255, 255, 150);
    text("A Weary World", 100, 100);
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
    textFont(font, 15);
    text("Life simulation game by: Sheila Zhu", wide - 220, high - 10);
	myson.draw();
};

var initSeq = function() {
	background(10, 10, 100);
};

var infoscrn = function(x, y) {
	this.pos = new PVector(x, y);
	this.scrollfact = new PVector(0, 0);
	this.scrlact = 0;
	this.textarr = [];
	this.textarr.push("Constant war, famine, and disease has created a barren land. Strange creatures began appearing");
	this.textarr.push("around cities, pillaging and destroying. As the people could never know what tomorrow would bring,");
	this.textarr.push("many desperates flocked to religion, including the church and various religious cults for the ");
	this.textarr.push("promise of miracles and salvation. As more died, the church grew into an ever-stronger, yet");
	this.textarr.push("ever-more polarizing entity. It began to raise its own armies, monopolize resources, and even form");
	this.textarr.push("its own states. In these trying times, leaders struggled to provide for their people, and with the");
	this.textarr.push("church's power rising daily, began to seek counsel from travelling advisors known as Meyhers.");
	this.textarr.push("These individuals studied many arts, and had the background suited to assist with a wide range of");
	this.textarr.push("situations. You will play as one of these Meyhers, called to the aide of rulers, community and ");
	this.textarr.push("company leaders, and even pastors. A desperate mother at a village you often visit has asked you to");
	this.textarr.push("save her son. He is afflicted with a disease that no doctor in the village could diagnose, and was");
	this.textarr.push("projected to soon die in the village. Though at first unwilling, you eventually relent, and agree to");
	this.textarr.push("bring him with you in your travels to show him different scenes and vistas before his time ends.");
	this.textarr.push("The story begins here... Taking the boy under your care, you have adopted him as your son. His life");
	this.textarr.push("and future has been entrusted to you. Every action you take will decide his future.");
};
infoscrn.prototype.draw = function() {
    background(22, 0, 84);
	fill(105, 80, 194, 40);
	rect(this.pos.x, this.pos.y, wide - 20 - this.pos.x, high - 20 - this.pos.y);
	if (this.scrlact === 0) {
		fill(22, 0, 84);
	}
	else {
		fill(100, 80, 164);
	}
	rect(wide - this.pos.x - 12, this.scrollfact.y + this.pos.y + 2, 10, 100);
	fill(255, 255, 255, 100);
    textFont(font, 20);
	for (var i = 0; i < this.textarr.length; ++i) {
		var y = (i + 1)*40 - this.scrollfact.y;
		if ((y > 25) && (y < high - 45)) {
			text(this.textarr[i], this.pos.x + 10, this.pos.y + 10 + ((i + 1)*40 - this.scrollfact.y));
		}
	}
};

var intros = new infoscrn(20, 20);
var introSeq = function() {
	intros.draw();
};

mousePressed = function() {
    if (gamemode === "start") {
        if (((mouseX > starter.stloc.x) && (mouseX < starter.stloc.x + 150)) && ((mouseY > starter.stloc.y - 45) && (mouseY < starter.stloc.y + 4))) {
        gamemode = "init";
		}
		else if (((mouseX > starter.inloc.x + 5) && (mouseX < starter.inloc.x + 141)) && ((mouseY > starter.inloc.y - 48) && (mouseY < starter.inloc.y + 1))) {
			gamemode = "intro";
		}
    }
	else if (gamemode === "intro") {
	    if (((mouseX > wide - intros.pos.x - 12) && (mouseX < wide - intros.pos.x - 2)) && ((mouseY > (intros.scrollfact.y + intros.pos.y + 2)) && (mouseY < (intros.scrollfact.y + intros.pos.y + 102)))) {
		    intros.scrlact = 1;
	    }
	}
};
mouseDragged = function() {
	if (gamemode === "intro") {
		if (intros.scrlact === 1) {
		    if (((mouseY - pmouseY < 0) && (intros.scrollfact.y > 3)) || ((mouseY - pmouseY > 0) && (intros.scrollfact.y < high - (intros.pos.y + 127)))) {
				if ((mouseY - pmouseY < -1) || (mouseY - pmouseY > 1)) {
			        intros.scrollfact.add(0, mouseY - pmouseY);
		        }
		    }
		}
	}
};
mouseReleased = function() {
    if (gamemode === "intro") {
        intros.scrlact = 0;
    }
};
mouseOut = function() {
    if (gamemode === "intro") {
        intros.scrlact = 0;
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
