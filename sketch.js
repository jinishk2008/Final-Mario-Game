var mario, marioImg, marioLost, loadingScreen;
var goombaImg, goombaImg, block, grassGround, ground, invisibleGround, backgroundImg, boxImg, bg;
var goombaGroup, boxGroup, wallGroup, plantsGroup;
var wall1, wall1Image;
var wall2;
var wall3;
var wall4;
var rockwallImg, plant;
var redDiamond, blueDiamond, bomb;
var redDiamondGroup, blueDiamondGroup, bombGroup;
var redDiamondImg, blueDiamondImg, bombImg, explosion;


var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;
var diamondCount = 0

function preload() {
  marioRun = loadAnimation("marioRunning3.png", "marioRunning2.png", "marioRunning1.png");
  //loadingScreen = loadImage("loadingscreen.png")
  //grassGround = loadImage("grass.png")
  backgroundImg = loadImage("forest.jpg");
  goombaImg = loadImage("goomba.png");
  boxImg = loadImage("mysteryBox.png");
  sadMario = loadImage("sadMario.png")
  resetButton = loadImage("reset.png")
  gameOverImage = loadImage("gameOver.png")
  wall1Image = loadImage("brickwall.png")
  rockwallImg = loadImage("rockwall.png")
  plantImg = loadImage("plantImg.png")
  redDiamondImg = loadImage("Red Crystal.png")
  blueDiamondImg = loadImage("Crystal.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  bg = createSprite(width / 2, height / 2, width, height)
  bg.addImage("bg", backgroundImg)
  bg.scale = 2.3;
  bg.velocityX = -1

  
  ground = createSprite(width / 2, height - 120, width, 20)
  ground.visible = false
  //ground.addImage("ground", grassGround)

  invisibleGround = createSprite(width / 2, height - 180, width, 20)
  invisibleGround.visible = false

  mario = createSprite(100, 30, 50, 50)
  mario.addAnimation("running", marioRun)
  mario.addImage("sad", sadMario)
  mario.scale = 0.4;

  gameOver = createSprite(width / 2 - 100, height / 2 - 250);
  gameOver.addImage(gameOverImage)
  gameOver.visible = false

  restart = createSprite(width / 2 - 100, height / 2 - 50, 10, 10);
  restart.addImage(resetButton);
  restart.scale = 0.5
  restart.visible = false

  rockwall = createSprite(width / 2 + 300, height - 140, width, 200)
  rockwall.addImage(rockwallImg)

  rockwall1 = createSprite(width / 2 - 300, height - 140, width, 200)
  rockwall1.addImage(rockwallImg)



  goombaGroup = new Group();
  boxGroup = new Group();
  wallGroup = new Group();
  plantsGroup = new Group();
  redDiamondGroup = new Group();
  blueDiamondGroup =new Group();
  score = 0;
}

function draw() {
  background("white")
  image(rockwallImg, width / 2, height / 2, width, 200)

  

  if (gameState === PLAY) {
    if (touches.length > 0 || keyDown(UP_ARROW)&& mario.y > 500) {
      mario.velocityY = -20
      touches = []
    }
      
    if (mario.isTouching(boxGroup)) {
      boxGroup.destroyEach();
      score = score + 1;
    }
    if (bg.x < 500) {
      bg.x = bg.width / 2
    }
    if(mario.isTouching(blueDiamondGroup)){
      
      diamondCount ++;
      blueDiamondGroup.destroyEach()
    }
    
     if(mario.isTouching(redDiamondGroup)){
      
      diamondCount --;
      redDiamondGroup.destroyEach()
    }

    if (mario.isTouching(boxGroup)) {
      score = score + 1;
    }

    if (mario.isTouching(goombaGroup) || mario.isTouching(plantsGroup)) {
      gameState = END
      bg.velocityX = 0
      boxGroup.destroyEach();
      
    }

    var rand = Math.round(random(1,2))
    if(frameCount % 100 === 0){
      switch(rand){
        case 1: spawnGoombas()
                break;
        case 2: spawnKillingPlant()  
                break
      }     
    }
    
    var rand2 = Math.round(random(1,3))
    if(frameCount % 120 === 0){
      switch(rand2){
        case 1: spawnRedDiamond()
                break;
        case 2: spawnBlueDiamond()  
                break
        case 3: spawnMysteryBox()
                break
      }     
    }

  } else if (gameState === END) {

    bg.velocityX = 0;
    goombaGroup.setVelocityXEach(0);
    boxGroup.setVelocityXEach(0);
    wallGroup.setVelocityXEach(0);
    plantsGroup.setVelocityXEach(0);
    redDiamondGroup.setVelocityXEach(0);
    blueDiamondGroup.setVelocityXEach(0);
    mario.changeImage("sad", sadMario);
    goombaGroup.setLifetimeEach(-1);
    boxGroup.setLifetimeEach(-1);
    restart.visible = true;
    gameOver.visible = true;



    if (mousePressedOver(restart)) {
      reset();
    }
  }

  //spawnWall();

  mario.velocityY = mario.velocityY + 0.5
  mario.collide(invisibleGround)
  mario.collide(boxGroup)

  drawSprites();
  textSize(35)
  fill("blue")
  text("Score: " + score, width - 200, 50);
  image(blueDiamondImg, width-350, 15, 50, 50)
  text(": "+diamondCount, width-280, 50)
}

function spawnGoombas() {

    var goomba = createSprite(width, height - 239, 50, 50);
    goomba.addImage(goombaImg)
    goomba.scale = 0.075
    goomba.velocityX = -5
    goombaGroup.add(goomba);
    goomba.lifetime = width - 100
  }


function spawnKillingPlant() {

    var plant = createSprite(width, height - 265, 50, 50);

    plant.addImage(plantImg)
    plant.scale = 0.3
    plant.velocityX = -6
    plantsGroup.add(plant);
}

function spawnMysteryBox() {

  if (frameCount % 200 === 0) {
    var mysteryBox = createSprite(width, 120, 40, 10);
    mysteryBox.y = Math.round(random(100, height - 370));
    mysteryBox.addImage(boxImg);
    mysteryBox.scale = 0.040;
    mysteryBox.velocityX = -3;

    //assign lifetime to the variable
    mysteryBox.lifetime = width / 3;
    boxGroup.add(mysteryBox);
    restart.depth = mysteryBox.depth + 1
    gameOver.depth = mysteryBox.depth + 1
  }
}

function spawnBlueDiamond(){

    var blueDiamond = createSprite(width, 120, 40, 10);
    blueDiamond.y = Math.round(random(100, height - 370));
    blueDiamond.addImage(blueDiamondImg);
    blueDiamond.scale = 0.1;
    blueDiamond.velocityX = -6;
    blueDiamond.lifetime = width / 3;
    blueDiamondGroup.add(blueDiamond);
    //restart.depth = mysteryBox.depth + 1
    //gameOver.depth = mysteryBox.depth + 1
}

function spawnRedDiamond(){

    var redDiamond = createSprite(width, 120, 40, 10);
    redDiamond.y = Math.round(random(100, height - 370));
    redDiamond.addImage(redDiamondImg);
    redDiamond.scale = 0.2;
    redDiamond.velocityX = -8;
    redDiamond.lifetime = width / 3;
    redDiamondGroup.add(redDiamond);
    //restart.depth = mysteryBox.depth + 1
    //gameOver.depth = mysteryBox.depth + 1
}
function spawnWall() {

  if (frameCount % 160 === 0) {
    var brick = createSprite(width - 540, height - 100, 10, 10);
    brick.addImage(wall1Image)
    //brick.velocityX = -1;
    brick.scale = 0.3;
    brick.lifetime = width
    wallGroup.add(brick)

  }
}
    
function spawnBomb(){
  
  
}

function reset() {

  score = 0
  diamondCount = 0
  gameState = PLAY;
  goombaGroup.destroyEach();
  boxGroup.destroyEach();
  plantsGroup.destroyEach();
  redDiamondGroup.destroyEach();
  blueDiamondGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  bg.velocityX = 0
  mario.changeAnimation("running", marioRun)

}