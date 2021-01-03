//Create variables here
var dog, happyDog;
var Dimg, Dimg2;
var database; 
var foodStock,foodS;
var Fedtime;
var lastFed;
var feed, add;
var foodObject;


function preload()
{
  //load images here
  Dimg = loadImage("dogImg.png");
  Dimg2 = loadImage("dogImg1.png");

}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 380, 10, 10);
  dog.addImage("Dog",Dimg);
  dog.scale = 0.2

  foodObject = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("FEED DRAGO");
  feed.position(480,50);
  feed.mousePressed(FeedDog);
  add = createButton("ADD FOOD");
  add.position(600,50);
  add.mousePressed(AddFood);

  Fedtime = database.ref('FedTime');
  Fedtime.on("value",function (data){
    lastFed = data.val();
  })
  
}


function draw() {  
    background(46,139,87);
    foodObject.display();

  fill("black");
  textSize(20);

  if(lastFed>=12){
    text("Last Feed :" + lastFed%12 + " PM", 300, 35);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM", 300, 35);
  }
  else{
    text("Last Feed : " + lastFed+ "AM", 300, 35);
  }

 
  
  drawSprites();
  //add styles here
}

//function to read values in database
function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);


}

//function to wite values in database
function writeStock(x){

  if(x>0){
    x= x-1
  }
  else{
    x = 0
  }

  database.ref('/').update({
    'Food':x
  });
}

function AddFood(){
 foodS++
  database.ref('/').update({
    'Food':foodS
  }
  
  )
  }
  function FeedDog(){
  
  dog.addImage(Dimg2)
  foodObject.updateFoodStock(foodObject.getFoodStock()-1)
   database.ref('/').update({
     'Food':foodObject.getFoodStock(),
     FeedTime:hour()
   })
  }
  

