//Create variables here
var database;

var dog, dogImg, happyDog;

var foodS, foodStock;

var feedDog, addFoods;

var fedTime, lastFed;

var foodObj;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg1.png");
  happyDog = loadImage("dogImg.png");
}

function setup() {
  createCanvas(850, 800);

  database = firebase.database();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  
  dog = createSprite(440, 600);
  dog.addImage(dogImg);
  dog.scale = 0.25

  foodObj = new Food();

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  
  
}


function draw() {  

  background(46, 139, 87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  drawSprites();
  //add styles here

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >= 12){
    text("Last Feed : " + lastFed % 12 + " PM", 375, 30);
  } else if(lastFed == 0){
    text("Last Feed : 12 AM", 375, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 375, 30);
  }

  //text("Milk bottles left : " + foodS, 175, 375);

  
 

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){

  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);

  database.ref('/').update({
    Food : foodObj.getFoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){

  foodS++;
  
  database.ref('/').update({
    Food : foodS
  })
}

