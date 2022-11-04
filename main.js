'use strict'

var sBut;
var PBut;
var NBut;
var colPoints;
var gameСourse = [];
var currStep = 0;
var playVar = [];
var bordColor;

window.onload = function() {
	sBut = document.getElementById("startBut"); 
	sBut.onclick = window.onload;
	PBut = document.getElementById("prevBut");
	PBut.onclick = stepBack;
	NBut = document.getElementById("nextBut");
	NBut.onclick =stepUp;

	colPoints = document.getElementsByClassName('blackHorse');
	for (var i=0; i<64; i++){
		colPoints.item(i).onclick = function(){
			for (var k=0; k<64; k++){
				colPoints.item(k).onclick = function(){
					if (this.style.opacity==0.3){ 
						for (var t=0; t<playVar.length; t++){
							document.getElementById(playVar[t]).style.opacity=0;
						};
						playVar.length = 0;
						document.getElementById(gameСourse[currStep]).parentElement.style.borderColor = bordColor;
						this.style.opacity=1;
						bordColor = this.parentElement.style.borderColor;
						this.parentElement.style.borderColor="red";
						gameСourse[++currStep] = this.id;
						gameСourse.length = currStep+1; 

						choisePosition(this.id);	
					};
				};

				colPoints.item(k).onmousemove = undefined;
				colPoints.item(k).onmouseout = undefined;
			};
			this.style.opacity=1;
			bordColor = this.parentElement.style.borderColor;
			this.parentElement.style.borderColor='red';
			gameСourse[0] = this.id;
			choisePosition(this.id);
		};
		
		colPoints.item(i).onmousemove = function(){
			this.style.opacity=0.3;
		};

		colPoints.item(i).onmouseout = function (){
			this.style.opacity=0;
		};

		colPoints.item(i).style.opacity=0;
	};
	document.getElementById(gameСourse[currStep]).parentElement.style.borderColor = bordColor;
	gameСourse.length = 0;
	currStep = 0;
	playVar.length = 0;
};	

function choisePosition(idAttr){
    if ((idAttr[1]<8)&&(idAttr[0]!="a")&&(idAttr[0]!="b")){  //1
		mkdPos(-2, 1);
    };
    if ((idAttr[1]<7)&&(idAttr[0]!="a")){	//2
    	mkdPos(-1, 2);
    };
    if ((idAttr[1]<7)&&(idAttr[0]!='h')){	//3
		mkdPos(1, 2);
    };
    if ((idAttr[1]<8)&&(idAttr[0]!='h')&&(idAttr[0]!='g')){	//4
    	mkdPos(2, 1);
    };
    if ((idAttr[1]>1)&&(idAttr[0]!='h')&&(idAttr[0]!='g')){	//5
    	mkdPos(2, -1);
    };
    if ((idAttr[1]>2)&&(idAttr[0]!='h')){	//6
    	mkdPos(1, -2);
    };
    if ((idAttr[1]>2)&&(idAttr[0]!="a")){	//7
    	mkdPos(-1, -2);
    };
    if ((idAttr[1]>1)&&(idAttr[0]!="a")&&(idAttr[0]!="b")){	//8
    	mkdPos(-2, -1);
    };

	function  mkdPos(inc1, inc2){
		var codes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		var tmpElem; 
		var tmpIdAttr = [];

		tmpIdAttr[0] = codes[idAttr.charCodeAt(0) - 97 +inc1];
		tmpIdAttr[1] = idAttr[1]-(-inc2);
		
		tmpElem = document.getElementById(tmpIdAttr[0]+tmpIdAttr[1]);
		
		if (tmpElem.style.opacity!=1){
			tmpElem.style.opacity=0.3;
			playVar[playVar.length]=tmpIdAttr[0]+tmpIdAttr[1];
		};	
	};
};

function stepBack(){
	var Elem;
	if (currStep>0) {
		Elem = document.getElementById(gameСourse[currStep]);
		Elem.style.opacity=0;
		Elem.parentElement.style.borderColor = bordColor;

		for (var i=0; i<playVar.length; i++){
			document.getElementById(playVar[i]).style.opacity=0;
		};
		playVar.length = 0;

		choisePosition(gameСourse[--currStep]);
		Elem = document.getElementById(gameСourse[currStep]);
		bordColor = Elem.parentElement.style.borderColor;
		Elem.parentElement.style.borderColor = 'red';

	};
};

function stepUp(){
	var Elem;
	if (currStep<gameСourse.length-1) {

		for (var i=0; i<playVar.length; i++){
			Elem = document.getElementById(playVar[i]);
			if (Elem.style.opacity!=1) {
				Elem.style.opacity=0;
			};
		};
		playVar.length = 0;
		
		Elem = document.getElementById(gameСourse[currStep]);
		Elem.parentElement.style.borderColor = bordColor;

		choisePosition(gameСourse[++currStep]);
		Elem = document.getElementById(gameСourse[currStep]);
		Elem.style.opacity=1;
		bordColor = Elem.parentElement.style.borderColor;
		Elem.parentElement.style.borderColor = 'red';
		
	};
};
