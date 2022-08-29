
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var backgroundImg;
var bucket,broom;
var paperBall, paperBalll2;
var ground;
var success,fail;

var scoreSound, gameoverSound;

function preload()
{
  backgroundImg = loadImage("background.webp");
  paperballImg = loadImage("paperball.png");
  bucketImg = loadImage("bucket.png");
  broomImg = loadImage("broom.png");
  successImg = loadImage("success.png");
  failImg = loadImage("fail.png")

  scoreSound = loadSound("score_sound.mp3")
  gameoverSound = loadSound("gameover_sound.wav")
}


function setup() {
  createCanvas(600,400);

  backGround = createSprite(260,200)
  backGround.addImage("bg",backgroundImg)
  backGround.scale = 1.50

  ground = createSprite(300,395,600,10);
  ground.visible = false

  success = createSprite(300,200)
  success.addImage("su",successImg);
  success.scale = 0.42
  success.visible = false

  fail = createSprite(300,200)
  fail.addImage("fl",failImg);
  fail.scale = 0.25
  fail.visible = false

  paperBall = createSprite(400,165)
  paperBall.addImage("ball",paperballImg);
  paperBall.scale = 0.1

  paperBall2 = createSprite(200,165)
  paperBall2.addImage("ball2",paperballImg)
  paperBall2.scale = 0.1

  bucket = createSprite(550,350)
  bucket.addImage("bc",bucketImg)
  bucket.scale= 0.3

  broom = createSprite(540,150);
  broom.addImage("br",broomImg);
  broom.scale = 0.2
  broom.velocityX = -0.5

  engine = Engine.create();
  world = engine.world;
  
}


function draw() 
{
  background(51);

  if(keyIsDown(LEFT_ARROW)){
    bucket.position.x = bucket.position.x -1
  }

  if(broom.isTouching(paperBall)){
    paperBall.velocityY = 2 
  }

  if(broom.isTouching(paperBall2)){
    paperBall2.velocityY = 2
  }

  if(paperBall.isTouching(bucket)){
    scoreSound.play()
    paperBall.remove()
  }

  if(paperBall2.isTouching(bucket)){
    scoreSound.play()
    paperBall2.remove()
    broom.remove();
    bucket.remove();
    broom.velocityX = 0
    success.visible = true
  }

  if(paperBall.isTouching(ground)){
    paperBall.remove()
    paperBall2.remove();
    broom.remove();
    bucket.remove();
    gameoverSound.play()
    broom.velocityX = 0
    fail.visible = true
    
  }

  if(paperBall2.isTouching(ground)){
    paperBall2.remove()
    broom.remove()
    bucket.remove()
    gameoverSound.play()
    broom.velocityX = 0
    fail.visible= true
  }

  Engine.update(engine);
  
  drawSprites();
}

