var drawingCanvas = document.getElementById('myDrawing');
var context= drawingCanvas.getContext("2d");
var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;
var y= 450;
var x = 50; 
var w = $('#myDrawing').width();
var h = $('#myDrawing').height();
var xc = ((Math.random()*(w-10)));
var yc = ((Math.random()*(h-10)));
var x_1 = ((Math.random()*(w-15)));
var y_1 = ((Math.random()*(h-15)));
var x_2 = ((Math.random()*(w-15)));
var y_2 = ((Math.random()*(h-15)));
var angle = 45;
var angle1 = 35;
var radians = angle * Math.PI/ 180;
var radians1 = angle1 * Math.PI/180;
var xunits = 0;
var yunits = 0;
var xunits2 = 0;
var yunits2 = 0;
var r = 15; // radius of enemy
var k = 50;// width hero
var f = 50;// height hero
var rc = 10// radius of coin
var points= 0;
var speed = 8;
updateBall();


function hero () {
  context.clearRect(0,0, 800,800);
  context.strokeStyle='#000000';
  context.fillStyle= '#FFFF00';
  context.beginPath();
  context.lineWidth="4";
  context.rect(x,y,k,f); 
  context.closePath();
  context.stroke();
  context.fill();
  }

function coin () {
  context.strokeStyle='#000000';
  context.fillStyle= 'blue';
  context.beginPath();
  context.lineWidth="4";
  context.arc(xc,yc,rc,0,Math.PI*2,true);
  context.closePath();
  context.stroke();
  context.fill();
}  

function enemy1 () {
  context.strokeStyle='#000000';
  context.fillStyle= 'red';
  context.beginPath();
  context.lineWidth="4";
  context.arc(x_1,y_1,r,0,Math.PI*2,true);
  context.closePath();
  context.stroke();
  context.fill();
  if (x_1 >= w-15 || x_1 < 15 ) {
        angle = 180 - angle;
       updateBall();
    } else if (y_1 >= h-15 || y_1 < 15) {
       angle = 360 - angle;
       updateBall();
     }
  }

function enemy2 () {
  context.strokeStyle='#000000';
  context.fillStyle= 'green';
  context.beginPath();
  context.lineWidth="4";
  context.arc(x_2,y_2,r,0,Math.PI*2,true);
  context.closePath();
  context.stroke();
  context.fill();
  if (x_2 >= w-15 || x_2 < 15 ) {
        angle1 = 180 - angle1;
       updateBall2();
    } else if (y_2 >= h-15 || y_2 < 15) {
       angle1 = 360 - angle1;
       updateBall2();
     }
  }



function updateBall() {
      radians = angle * Math.PI/ 180;
     
      xunits = Math.cos(radians) * speed;
      yunits = Math.sin(radians) * speed;
      
   }

function updateBall2 () {
   radians1 = angle1 * Math.PI/180;
   xunits2 = Math.cos(radians1) * speed;
    yunits2 = Math.sin(radians1) * speed; 
}


function draw () {
  if (rightKey) x += 10;
  else if (leftKey) x -=10; 
  if (upKey) y -= 10;
  else if (downKey) y += 10;
  if (x <= 0) x = 0;  
  if (x >= 750) x = 750;
  if (y <= 0) y = 0;
  if (y >= 450) y = 450;
}



function march () {
x_1 += xunits;
y_1 += yunits;
x_2 += xunits2;
y_2 += yunits2;
  }


function onKeyDown(evt) {
  if (evt.keyCode == 39) rightKey = true;
  else if (evt.keyCode == 37) leftKey = true;
  if (evt.keyCode == 38) upKey = true;
  else if (evt.keyCode == 40) downKey = true;
}


function onKeyUp(evt) {
  if (evt.keyCode == 39) rightKey = false;
  else if (evt.keyCode == 37) leftKey = false;
  if (evt.keyCode == 38) upKey = false;
  else if (evt.keyCode == 40) downKey = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function hitDetection (){
  if (x_1+r >= x && x_1-r <= x+k && y_1+r >= y && y_1-r <= y+f ){
            $('#gg').text("Game over, hit the 'Try Again' button.");
            $('#reload').css("margin", "auto");
            $('#reload').css("margin-left", "49%");
            speed= 0;
            $('#myDrawing').remove();
                    } 
  }

function hitDetection2 (){
  if (x_2+r >= x && x_2-r <= x+k && y_2+r >= y && y_2-r <= y+f ){
            $('#gg').text("Game over, hit the 'Try Again' button.");
            speed= 0;
            $('#myDrawing').remove();
                    } 
  }


function hitDetectionCoin (){
  if (xc+rc >= x && xc-rc <= x+k && yc+rc >= y && yc-rc <= y+f ){
          xc = ((Math.random()*(w-10)));
          yc = ((Math.random()*(h-10)));
          points += 5;
          $('#point').val(points);
                    } 
  }



$('#start').click(function gl() {
   window.setTimeout(gl,20);
  draw();
  hero();
  enemy1();
  coin();
  march(); 
  hitDetection();
  hitDetection2();
  hitDetectionCoin();
  $('#start').hide();
  $('#refresh').click(function(){
     window.location.reload();
      });
  if(points >= 25){
    enemy2();
    updateBall2();
  }
  if(points >= 50){
    speed = 11;
  }
  if(points >= 75){
    speed= 14;
  }
  if(points >= 100){
     $('#myDrawing').remove();
     $('#gg').text("VICTORY!!!");
  }
 })

  gl();