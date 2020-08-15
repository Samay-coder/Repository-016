var dog,happyDog;
var database;
var foodS,foodStock;
function preload()
{
dogimg = loadImage("Dog.png");
happyDog = loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
  console.log(database)
	createCanvas(500, 500);
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  dog=createSprite(250,300,150,150);
  dog.addImage(dogimg);
  dog.scale=0.25
}


function draw() {  
  background(46,139,87)

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {

  if (x<=0) {
    x=0;
  } else {
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
