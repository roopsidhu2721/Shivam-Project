var back1, back2, back3, track1, track2, track3
var player, playerCar, playerSprite
var zombieMove, zombieIdle;
var zombieGroup;
var score, coin, coinSprite;
var gameState="level1";
var back;
var count=0;
function preload()
{
  track1 = loadImage("Images/desertroadOFFICIAL.png");
  track2 = loadImage("Images/map1OFFICIAL.png");
  track3 = loadImage("Images/track.jpg");
	playerCar = loadImage("Images/carOfficial.png");

  zombieMove = loadAnimation("Images/zombieOFFICIAL/Move/skeleton-move_0.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_1.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_2.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_3.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_4.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_5.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_6.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_7.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_8.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_9.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_10.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_11.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_12.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_13.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_14.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_15.png",
  "Images/zombieOFFICIAL/Move/skeleton-move_16.png")

  zombieIdle = loadAnimation("Images/zombieOFFICIAL/idle/skeleton-idle_0.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_1.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_2.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_3.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_4.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_5.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_6.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_7.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_8.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_9.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_10.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_11.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_12.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_13.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_14.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_15.png",
  "Images/zombieOFFICIAL/Idle/skeleton-idle_16.png")

  coin = loadAnimation("Images/ScoreOFFICIAL/Coin1.png",
  "Images/ScoreOFFICIAL/Coin2.png",
  "Images/ScoreOFFICIAL/Coin3.png",
  "Images/ScoreOFFICIAL/Coin4.png",
  "Images/ScoreOFFICIAL/Coin5.png",
  "Images/ScoreOFFICIAL/Coin6.png",
  "Images/ScoreOFFICIAL/Coin1.png")

 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  score = 0
  console.log("in setup:"+windowWidth/2+","+windowHeight)
  back1 = createSprite(windowWidth/2, windowHeight, 1000,500);
  back1.addImage("track1",track1);
  back1.addImage("track2",track2);
  back1.scale = 0.9;

  player = createSprite(windowWidth/2, windowHeight/2+4200,20,50);
  player.addImage("player_driving", playerCar);
  player.scale = 0.05;
  zombieGroup= new Group();

  

  spawnZombies();
  
}

function draw() {
  rectMode(CENTER);
  background("white");
  camera.position.x=windowWidth/2;
  camera.position.y=player.y;

 
 

  
 drawSprites();
  
  if(gameState === "level1")
  {
    back1.changeImage("track1",track1);

   
    controlPlayer();
  
    for(var i=0;i<zombieGroup.length;i++)
    {
      if(zombieGroup.get(i).isTouching(player))
      {
        zombieGroup.get(i).destroy();
        score = score + 10
  
      }   
      }
      for(var i=0;i<zombieGroup.length;i++)
      {
        if(zombieGroup.length >0 )
        {
          if(player.y-zombieGroup.get(i).y < 300)
          {
          
            zombieGroup.get(i).changeAnimation("moving", zombieMove);
            zombieGroup.get(i).velocityY = 3; 
          }
      }
    }
    console.log(player.y);
    if(player.y < -2750)
    {
      console.log("level2 called")
      gameState= "level2";
  
    }
  }
  else if(gameState === "level2")
  {
    controlPlayer();
    console.log("I am in level2 ")
    console.log("in level2:"+windowWidth/2+","+windowHeight)
    back1.changeImage("track2",track2);
     text("i am in level2")
    //back.scale = 0.9;
  }
  

 
  /*coinSprite = createSprite(camera.position.x - 500, camera.position.y - 400);
  coinSprite.addAnimation("coin image", coin);*/

  fill("white");
  textSize(20);
  text("Score: " + score, camera.position.x - 450, camera.position.y - 395);
 
}
function controlPlayer()
{
  if(keyDown(UP_ARROW))
    {
      player.y = player.y - 10;
    }
  
    if(keyDown(LEFT_ARROW))
    {
      player.x = player.x - 5;
    }
  
    if(keyDown(RIGHT_ARROW))
    {
      player.x = player.x + 5;
    }
  
}
function spawnZombies() 
{
/*	var zombie1=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie2=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie3=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie4=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie5=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie6=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie7=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie8=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie9=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie10=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie11=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie12=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie13=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie14=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie15=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie16=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie17=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie18=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie19=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie20=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
var zombie21=createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));

zombie1.addAnimation("idle",zombieIdle);
zombie2.addAnimation("idle",zombieIdle);
zombie3.addAnimation("idle",zombieIdle);
zombie4.addAnimation("idle",zombieIdle);
zombie5.addAnimation("idle",zombieIdle);
zombie6.addAnimation("idle",zombieIdle);
zombie7.addAnimation("idle",zombieIdle);
zombie8.addAnimation("idle",zombieIdle);
zombie9.addAnimation("idle",zombieIdle);
zombie10.addAnimation("idle",zombieIdle);
zombie11.addAnimation("idle",zombieIdle);
zombie12.addAnimation("idle",zombieIdle);
zombie13.addAnimation("idle",zombieIdle);
zombie14.addAnimation("idle",zombieIdle);
zombie15.addAnimation("idle",zombieIdle);
zombie16.addAnimation("idle",zombieIdle);
zombie17.addAnimation("idle",zombieIdle);
zombie18.addAnimation("idle",zombieIdle);
zombie19.addAnimation("idle",zombieIdle);
zombie20.addAnimation("idle",zombieIdle);
zombie21.addAnimation("idle",zombieIdle);*/
  for (var i=0; i<100; i++) 
  {
    
	  var zombie = createSprite(Math.round(random(windowWidth/2-100,windowWidth/2+100)),Math.round(random(-2500, 4000)));
	
    zombie.addAnimation("idle",zombieIdle);
    zombie.addAnimation("moving", zombieMove);
    zombie.rotation=90;
	  zombie.scale = 0.3;
	
	  //add each zombie to the group
	  zombieGroup.add(zombie);
  }
}

