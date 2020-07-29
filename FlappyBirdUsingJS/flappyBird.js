var cvs = document.getElementById("canvas");//Creave varable of canvas
var ctx = cvs.getContext("2d");
//text before start
ctx.fillStyle = "#000";
ctx.font = "20px yerdana";
ctx.fillText("Start in 3 second ", 50, 256);


//Load Images
var bird = new Image();
var bg = new Image(); // back ground Image
var fg = new Image(); // forground Image 
var pipeNorth = new Image(); // up pipe
var pipeSouth = new Image(); // dodwn pipe

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//Variables

var gap = 85;
var constant;
// pipeNorth.onload = function () {
// constant = pipeNorth.height + gap;
// };

// bird x and y position will be change
var bX = 10;
var bY = 150;
var gravity = 1.5; // gravity which cause the auto fall of bird by changing the y position of bird 
var score = 0;


// audio files

var fly = new Audio();  // for move up key 
var scor = new Audio(); // for score change

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";


//On key press  event
document.addEventListener("keydown", moveUp);

//function for on down key press
function moveUp()
{
    bY -= 25; // It will make bird up as canvase start form upper corner ie;(0,0)
    fly.play();
}

//pipe cordinate
var pipe = [];
pipe[0] = {    // default first array object for initial start position of pipes
    x: cvs.width,    // new pipe will start from the end point of the canvas(width of canvas)
    y: 0
}

//Draw Images
function draw()
{
   
    ctx.drawImage(bg,0,0); // first make backgraound
    // creating pipes
    for(var index = 0 ; index < pipe.length ; index ++)
    {
        constant = pipeNorth.height+gap; // for lower pipe y start position is height of upper pipe and a constant gape between upper and lower pipe
        ctx.drawImage(pipeNorth, pipe[index].x, pipe[index].y); // upper pipe
   
        ctx.drawImage(pipeSouth, pipe[index].x, pipe[index].y + constant); // lower pipe
        pipe[index].x--;  // will move the pipe to back word direction because of recreation of draw method due to requestAnimationFrame()

        //create new pipes when after first pipe reach to specific position
        // we do it by pushing new pipe object to pipe[] array
        if(pipe[index].x == 125) // specific postion of pipe
        {
            pipe.push({
                x: cvs.width,  // new pipe y position is at the end of canvas
                y: Math.floor(Math.random()* pipeNorth.height) - pipeNorth.height
            })

        }

        //bird collision with pipe reload the page
        if( bX + bird.width >= pipe[index].x && bX <= pipe[index].x + pipeNorth.width && (bY <= pipe[index].y + pipeNorth.height || bY+bird.height >= pipe[index].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reload the page
        }

        if(pipe[index].x == 5)
        {
            score++;
            scor.play();
        }
    }
    
   
    ctx.drawImage(fg, 0, cvs.height - fg.height); // y  position will start from the height of canvas - forground(fg) image height
    

    ctx.drawImage(bird, bX, bY); // initail bird position
   

    // bird will fall because of gravity
    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px yerdana";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
   
    requestAnimationFrame(draw); // It will call the draw function continusly to draw the canvase again and again

}

// document.addEventListener('DOMContentLoaded', function() {
//     // your code here
//     draw();
//  }, false);
setTimeout(function(){
    draw();
   }, 1000);
