var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var birdUp = new Image();
var bg = new Image();
var fg = new Image();
var gap = 120;

var birdX = 100;
var birdY = 150;
var accel = 0;
var gravity = 0.3;
var digits = [
  ['R', 'red'],
  ['B', 'blue'],
  ['G', 'green'],
  ['Y', 'yellow']
];
var fly = new Audio();
var over = new Audio();
fly.src = 'sounds/fly.mp3';
over.src = "sounds/score.mp3";
var digitRow = [];

var jump1 = document.getElementById('jump1');
var jump2 = document.getElementById('jump2');
var jump3 = document.getElementById('jump3');
var jump4 = document.getElementById('jump4');
var button = document.getElementById('start');
var digit = document.getElementById('box');
jump1.addEventListener('mousedown', moveUp);
jump2.addEventListener('mousedown', moveUp);
jump3.addEventListener('mousedown', moveUp);
jump4.addEventListener('mousedown', moveUp);

function beginning(){
  var line = "";
  var final = "";
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  for(var i=0; i < 3; i++){
    digitRow.push(Math.floor(Math.random() * digits.length));
  }
  for(var i=0; i < digitRow.length; i++){
    line += digits[digitRow[i]][0];
  }
  for(var i=0; i < line.length; i++){
    final += line.charAt(i).fontcolor(digits[digitRow[i]][1]);
  }
  digit.innerHTML = final;
}

function initialize(){
  button.style.display = 'none';
  jump1.style.display = "block";
  jump2.style.display = "block";
  jump3.style.display = "block";
  jump4.style.display = "block";
  digit.style.display = "block";
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  if(accel <= 0){
    ctx.drawImage(bird, birdX, birdY);
  } else {
    ctx.drawImage(birdUp, birdX + 30, birdY + 12);
  }

  if(birdY + bird.height > cvs.height - fg.height){
    location.reload();
  } else {
    updateBird();
    requestAnimationFrame(initialize);
  }
}

function updateBird(){
  accel += gravity;
  birdY += accel;
}

function moveUp(e){
  if(e){
    if(e.target.textContent == digits[digitRow[0]][0]){
      var line = "";
      var final = "";
      fly.play();
      accel = -8;
      birdY -= 1;
      digitRow.splice(0, 1);
      digitRow.push(Math.floor(Math.random() * digits.length));
      for(var i=0; i < digitRow.length; i++){
        line += digits[digitRow[i]][0];
      }
      for(var i=0; i < line.length; i++){
        final += line.charAt(i).fontcolor(digits[digitRow[i]][1]);
      }
      digit.innerHTML = final;
    }
  }
}

birdUp.src = "images/bird2.png";
bird.src = "images/bird1.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
