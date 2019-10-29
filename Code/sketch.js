//Code by Kahani Ploessl
//Modified ml5 Example - Style Transfer Mirror Example using p5.js

//Video Style Transfer

let style;
let video;
let isTransferring = false;
let resultImg;

function setup() {

  createCanvas(windowWidth, windowHeight).parent('canvasContainer');

  video = createVideo('Archive/GOPR0985.MP4');
  video.hide();
  resultImg = createImg('');
  resultImg.hide();


  select('#startStop').mousePressed(startStop);

  style = ml5.styleTransfer('StyleTransfer_Images/models/testModel4-ml5', video, modelLoaded);
}

function draw(){
  if (isTransferring) {
    image(resultImg, 0, 0, 600, 500);
  } else {
    image(video, 0, 0,600,500);
  }
}

function modelLoaded() {
  select('#status').html('Model Loaded');
}

function startStop() {
  if (isTransferring) {
    select('#startStop').html('Start');
  } else {
    select('#startStop').html('Stop');
    video.loop();
    style.transfer(gotResult);
  }
  isTransferring = !isTransferring;
}

function gotResult(err, img) {
  resultImg.attribute('src', img.src);
  if (isTransferring) {
    style.transfer(gotResult);
  }
}
