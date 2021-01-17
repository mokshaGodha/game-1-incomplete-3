var playerImg, carriageImg, bgImg, logImg,stoneImg;
var player, carriage, bgSprite;
var appleImg, bananaImg,orangeImg, strawberyyImg, resetImg;
var invisibleSpriteRight, invisibleSpriteLeft;
var PLAY = 1;
var END = 0
var obstacleGroup;
var fruitGroup;
var gameState=PLAY;
var score = 0;

function preload()
{
playerImg=loadImage("Images/girl1.png");
carriageImg=loadImage("Images/carraigeImg.png");
logImg=loadImage("Images/log.png");
stoneImg=loadImage("Images/srone.png");
bg=loadImage("Images/bg edited 2.png");
orangeImg = loadImage("Images/orange.jpg");
appleImg = loadImage("Images/apple.jpg");
strawberryImg = loadImage("Images/strawberry.png");
bananaImg = loadImage("Images/banana.jpg");
resetImg = loadImage("Images/resetIcon.png");

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  obstacleGroup = new Group();
  bgSprite = createSprite(width/2, height/2, width, height);
  bgSprite.addImage("background", bg);
  bgSprite.velocityY=5;
  bgSprite.scale = 4.3;
  console.log(bgSprite.width);

  carriage = createSprite(width/2,350,100,100);
  carriage.addImage("carriage", carriageImg);
  carriage.scale = 2;
	
  player = createSprite(width/2,475,100,100);
  player.addImage("player", playerImg);
  player.scale=0.8

  // carriage.debug=true;
  //player.debug=true;

  carriage.setCollider("rectangle", 0, 80, 100, 150);
  player.setCollider("rectangle", 0, -100, 200,200)

  
  console.log(displayHeight);
  invisibleSpriteRight = createSprite(bgSprite.x + 400, height/2, 1, height);
  invisibleSpriteRight.visible = false;
  invisibleSpriteLeft = createSprite(bgSprite.x - 400, height/2, 1, height);
  invisibleSpriteLeft.visible = false;
  reset=createSprite(100,100,width/2, height/2 + 200);
  reset.addImage("reset",reset);
  reset.visible = false;


}

function draw() {
  background("white");

  if(gameState === PLAY) {
    if(bgSprite.y > height) {
      bgSprite.y = bgSprite.height/2;
    }
  
    if(keyDown("LEFT_ARROW")){
      carriage.x=carriage.x-20;
      player.x=player.x-20;
    }
  
    if(keyDown("RIGHT_ARROW")){
      carriage.x=carriage.x+20;
      player.x=player.x+20;
    }

    if(obstacleGroup.isTouching(carriage)){
      gameState=END;   
    }
    
    if(fruitGroup.isTouching(carriage)){
      score = score + 10;
    }
    spawnObstacles();
    spawnFruits();

  } else if(gameState === END){

      carriage.velocityY = 0;
      carriage.velocityX=0;
    
      player.velocityY = 0;
      player.velocityX = 0;
    
      obstacleGroup.setVelocityXEach = 0;
      obstacleGroup.setVelocityYEach = 0;
      reset.visible = true;
      restart();
    textSize(100);
    text("Sorry, Game over! Try again :)", width/2, height/2);
  }     

  
  drawSprites(); 
  textSize(28);
  text("Your Score :"+score, 40,70);
  text("Catch the fruits to earn points and dodge all the obstacles to stay safe and reach the maze level", 40,40)
}

function spawnObstacles() {
  if(frameCount % 190 === 0) {
    for(var i = 0; i < random(1,5); i++) {
      var obstacle = createSprite(random(0, width), 0);
      var rand = Math.round(random(1,2));
      if(rand === 1) {
      obstacle.addImage("stone", stoneImg)
      
      } else {
        obstacle.addImage("log,", logImg)
      }
      obstacle.velocityY = 3;
      obstacle.scale=0.3;

      obstacleGroup.add(obstacle);
      // score = score + 10;
      obstacle.lifetime = 300
      obstacle.debug=true
      obstacle.setCollider("rectangle", 0,0, 470 , 450)

    }    
	  
  }
  
}
function spawnFruits(){
  if(frameCount % 190 === 0){
    for(var k = 0; k< random(1,4); k++){
      var fruit = createSprite(random(0,width), 0);
      var rand = Math.round(random(1,5));
      if(rand === 1){
        fruit.addImage ("orange",orangeImg);
      } else if(rand === 2){
        fruit.addImage("banana", bananaImg);

      }else if(rand === 3){
        fruit.addImage("strawberry", strawberryImg);

      }else if(rand === 4){
        fruit.addImage("apple", appleImg)
      }
fruit.velocityY = 3;
fruit.scale = 0.3
fruitGroup.add(fruit)

    }
  }
};

function restart(){
  if(mousePressedOver(reset)){
    gameState = PLAY;
  }
}
