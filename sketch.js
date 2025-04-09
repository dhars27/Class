var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,30,30);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position');
  hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
  background("Green");
  if(position !== undefined){

  
    if(keyDown(LEFT_ARROW)){
      writePosition(-5,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(5,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-5);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+5);
    }
    drawSprites();
  }
}

function writePosition(x,y){
  database.ref('ball/position').set({
    'x': position.x + x ,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
