var drawingCanvas = document.getElementById('myDrawing');
var context= drawingCanvas.getContext("2d");
var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;
var y=460;
var x=40;
var w = $('#myDrawing').width();
var h = $('#myDrawing').height();
var heroWidth = 40;
var heroHeight= 40;
var hurdleX=250;
var vy = (Math.random() * 10)+5;
var dirHolder=''

function onKeyDown(evt) {
  if (evt.keyCode == 39) rightKey = true;
  else if (evt.keyCode == 37) leftKey = true;
  if (evt.keyCode == 38) upKey = true;
  if (evt.keyCode == 40) downKey = true;
}


function onKeyUp(evt) {
  if (evt.keyCode == 39) rightKey = false;
  else if (evt.keyCode == 37) leftKey = false;
  if (evt.keyCode == 38) upKey = false;
  else if (evt.keyCode == 40) downKey = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function Hero () {
	this.create= function (){
	  context.clearRect(0,0, 800,800);
	  context.strokeStyle='#000000';
	  context.fillStyle= '#FFFF00';
	  context.beginPath();
	  context.lineWidth="4";
	  context.rect(x,y,heroWidth,heroHeight); 
	  context.closePath();
	  context.stroke();
	  context.fill();
  },

  this.draw= function () {
  if (rightKey) x += 10
  if(rightKey && upKey){
  	dirHolder = 'right'
  }
   if(leftKey && upKey){
  	dirHolder = 'left'
  }
   if (leftKey) x -=10; 
  if (upKey){
   y -=10;
	}
  if(!upKey){
   y +=5
	}
  if(!upKey && dirHolder==='right'){ 
  	x +=5
  	y +=5;
  	if(y>=455){
  		dirHolder=''
  	}
  }
   if(!upKey && dirHolder==='left'){ 
  	x -=5
  	y +=5;
  	if(y>=455){
  		dirHolder=''
  	}
  }
  else if (downKey) y += 10;
  if (x <= 0) x = 0;  
  if (x >= 760) x = 760;
  if (y <= 0)  y = 0
  if (y >= 460) y = 460;
	},
this.hitDetection = function (){	
  	if ( x + heroWidth === hurdleX ){
  		console.log('hello')
  	
  	x=hurdleX
  }
}

}



function Hurdle (xPlace,yPlace,height,width) {
	this.create = function () {
	  context.strokeStyle='#000000';
	  context.fillStyle= 'black';
	  context.beginPath();
	  context.lineWidth="5";
	  context.rect(xPlace,yPlace,height,width); 
	  context.closePath();
	  context.stroke();
	  context.fill();
	}
}




var hero = new Hero();
var hurdle = new Hurdle(hurdleX,240,20,260);



$('#start').click(function gl() {
	window.setTimeout(gl,20);
	
  	hero.create()
  	hurdle.create();
  	hero.draw()
  	hero.hitDetection();
  	hero.draw();
  
   $('#start').hide();
})









