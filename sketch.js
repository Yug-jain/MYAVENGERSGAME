var thor1
var thanosG,lokiG,scarlettewitchG
var gameState="play"
var score=50
var restart,gameOver
function preload(){
	thorImage=loadImage("thor.gif")
	backgroundImage=loadImage("background.jpeg")
	thanosImage=loadImage("enemy1.gif")
	lokiImage=loadImage("enemy2.gif")
	scarlettewitchImage=loadImage("enemy3.gif")
	gameOverimage=loadImage("gameover.gif")
	restartImage=loadImage("restart.jpg")

}
function setup(){
	createCanvas(windowWidth,windowHeight)
	
	

	scene=createSprite(200,200,800,400)
	scene.addImage(backgroundImage)
	scene.scale=1.8

    gameOver=createSprite(windowWidth/2,windowHeight/2,30,30)
	restart=createSprite(windowWidth/2,(windowHeight/2)+200,20,20)
   
	gameOver.addImage(gameOverimage)
	restart.addImage(restartImage)
	restart.scale=0.3
	gameOver.scale=1.2


	thor1=createSprite(100,550,30,30)
	thor1.addImage(thorImage)
	thor1.scale=0.4
	scene.x=scene.width/2
	thanosG=new Group()
	lokiG=new Group()
	scarlettewitchG=new Group()
	invisibleGround=createSprite(100,600,windowWidth+1000,40)
	invisibleGround.visible=false

}
function draw(){
background(0)
if(gameState==="play"){
restart.visible=false
gameOver.visible=false
scene.velocityX=-2
invisibleGround.velocityX=-2
if(invisibleGround.x<0){
	invisibleGround.x=invisibleGround.width/2
}
if(scene.x<0){
	//scene.x=10
	scene.x=scene.width/2
}
if(keyDown("space")){
	thor1.velocityY=-8
	score=score+10
}
thor1.velocityY=thor1.velocityY+0.8
var r=Math.round(random(1,3))
if(frameCount%80===0){
	if(r===1){
		thanos()
	}
	else if(r===2){
		loki()
	}
	else{
		scarlettewitch()
	}
}
if(thor1.isTouching(thanosG)||thor1.isTouching(lokiG)||thor1.isTouching(scarlettewitchG)){
	score=score-20
}
if(score<0){
	gameState="end"
}
}

if(gameState==="end"){
	scene.velocityX=0
	thanosG.setVelocityXEach(0)
	lokiG.setVelocityXEach(0)
	scarlettewitchG.setVelocityXEach(0)
	thor1.velocityX=0
	thor1.visible=false
	thanosG.destroyEach()
	lokiG.destroyEach()
	scarlettewitchG.destroyEach()
	
	gameOver.visible=true
	restart.visible=true
	
}
if(mousePressedOver(restart)){
	reset()
}
thor1.collide(invisibleGround)
drawSprites()
stroke("white")
strokeWeight(5)
fill("blue")
textSize(20)
text("SCORE "+score,600,50)
}

function thanos(){
	var thanos1=createSprite(Math.round(random(10,1000)),500,30,20)
	thanos1.addImage(thanosImage)
	thanos1.scale=0.4
	thanos1.velocityX=-4
	thanos1.lifetime=100
	thanosG.add(thanos1)
}

function loki(){
	var loki1=createSprite(Math.round(random(10,1000)),450,30,30)
	loki1.addImage(lokiImage)
	loki1.scale=0.4
	loki1.velocityX=-4
	loki1.lifetime=100
	lokiG.add(loki1)
}

function scarlettewitch(){
	var scarlettewitch1=createSprite(Math.round(random(10,1000)),300,30,30)
	scarlettewitch1.addImage(scarlettewitchImage)
	scarlettewitch1.scale=0.8
	scarlettewitch1.velocityX=-4
	scarlettewitch1.lifetime=100
	scarlettewitchG.add(scarlettewitch1)
}

function reset(){
	gameState="play"
	
	score=100
	thor1.visible=true
}