var ball;
var database, ballpositionref;
var position;
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //set up the database
    database=firebase.database();
    ballpositionref=database.ref('Ball/Position');    
    ballpositionref.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(position!=undefined){
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
}


//send to the database new values of x and y
function changePosition(x,y){
    database.ref('Ball/Position').set({
        'x': position.x + x ,
        'y': position.y + y
      })
    }

    function readPosition(data){ 
        position = data.val();       
        ball.x = position.x;
        ball.y = position.y;        
      }
      
      function showError(){
        console.log("Error in writing to the database");
      }



