song="";
leftWristX= 0;
leftWristY = 0;
rightWristX= 0;
rightWristY = 0;
scoreleftWrist =0;
scorerightWrist =0;


function setup() {
    canvas = createCanvas(650,550);
    canvas.center();

    //accessing video

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
    }

function preload() {
  song = loadSound("music.mp3");  
}


function draw() {
    image(video,0,0,650,550);

    fill('#FF0000');
    stroke('#FF0000');
    if (scorerightWrist > 2)
    {
    circle(rightWristX,rightWristY,20);

    if (rightWristY > 0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5); 
    }
    else if (rightWristY >100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1); 
    } 
    else if (rightWristY >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5); 
    } 
     else if (rightWristY >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2); 
    } 
    else if (rightWristY >400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5); 
    } 
    }
if(scoreleftWrist > 0.2)
{
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY= Number(leftWristY);
    decimals_removal = floor(InNumberleftWristY);
    volume = decimals_removal/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}


    }

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop () {
    song.stop();
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        scoreleftWrist= results[0].pose.keypoints[9].score;
        scorerightWrist= results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("leftWristX =" +leftWristX + "leftWristY =" + leftWristY);
        console.log("rightWristX =" +rightWristX + "rightWristY =" + rightWristY);
    }
}