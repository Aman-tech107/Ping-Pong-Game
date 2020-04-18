var SERVE = 2;
var PLAY = 0;
var PAUSE = 1;
var gameState = SERVE;

var score = 0;

var ball, ballimg, paddle, paddleimg, computerPaddle, computerPaddleImg;

var Frame = 0;
function preload() {
  ballimg = loadImage('ball.png');
  paddleimg=loadImage("paddle.png");
  computerPaddleImg = loadImage("paddle.png");
}
function setup() {
  createCanvas(400, 400);
  ball=createSprite(200,200,20,20);
  ball.addImage (ballimg);
  //ball.velocityY = random(-8,-5);
  //ball.velocityX = 4;  
  paddle=createSprite(350,200,20,100);
  paddle.addImage(paddleimg);
  paddle.setCollider("rectangle",0,0,20,92);
  computerPaddle = createSprite(50,200,10,100);
  computerPaddle.addImage(computerPaddleImg);
  computerPaddle.setCollider("rectangle",0,0,20,92);
}

function draw() {
  background(205,153,0);
  Frame = Frame + 1;
  if(gameState===SERVE){
    ball.x = 200;
    ball.y = 200;
    score = 0;
    text("PRESS SPACE TO START PLAYING!",100,200);
  }
  if(gameState==SERVE && keyDown("space")){
    serve();
    gameState = PLAY;
  }
  edges = createEdgeSprites();
  //Bounce Off the Left Edge only
  ball.bounceOff(edges[0]); 
  
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  
  if(gameState===PLAY){
    score = Frame/20;
    score = parseInt(score);
    ball.bounceOff(paddle);
    ball.bounceOff(computerPaddle);
    computerPaddle.y = ball.y;
    if(keyDown(UP_ARROW))
    {
      paddle.y=paddle.y-20;
    }

    if(keyDown(DOWN_ARROW))
    {
      paddle.y=paddle.y+20;
    }
    if(ball.x>400 || ball.x<0){
      gameState = PAUSE;
    }
  }
  if(gameState===PAUSE){
    text("PRESS SPACE TO RETRY",130,150);
  }
  if(gameState===PAUSE && keyDown("space")){
    ball.x = 200;
    ball.y = 200;
    paddle.y = 200;
    Frame = 0;
    gameState = PLAY;
  }
  text("Score : "+score,180,20);
  //explosion();
  drawSprites();
  
}

function serve(){
  ball.velocityX = -5;
  ball.velocityY = 4;
  score = 0;
}

function explosion()
{
  ball.velocityY=random(-8,8);
}

