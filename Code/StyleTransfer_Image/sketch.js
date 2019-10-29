// Code by Kahani Ploessl
// Modified ml5 example - Style Transfer Image Example using p5.js

let inputImg;
let statusMsg;
let transferBtn;
let style;

let img = [];
let totalFrames = 25;
let count = 0;

function preload() {
  for (let i = 0; i<totalFrames; i++) {
    //img[i] = "testFrames4/sunStyle00" + (i+1) + ".jpg";
    //if (i<=9) {
    //   img[i] = "testFrames/img0" + (i+1) + ".jpg";
    // } else {
    //   img[i] = "testFrames/img" + (i+1) + ".jpg";
    // }
    img[i] = "testFrames/img" + (pad(i,2)) + ".jpg";
  }

}

// pad function sourced from
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function setup() {

  noCanvas();


  statusMsg = select('#statusMsg');
  inputImg = select('#inputImg');

  transferBtn = select('#transferBtn')
  transferBtn.mousePressed(transferImages);

  style = ml5.styleTransfer('models/testModel4-ml5', modelLoaded);
}


function modelLoaded() {
  if(style.ready){
    statusMsg.html('Ready!')
  }
}

function transferImages() {

  statusMsg.html('Applying Style Transfer...!');

  createP(count);
  style.transfer(inputImg, function(err, result) {
    createImg(result.src);
  });

  count++;
  document.getElementById("inputImg").src = img[count];


  // LOOP
  // for (let k=0; k<totalFrames;k++){
  //   createP(k);
  //   style.transfer(inputImg, function(err, result) {
  //     createImg(result.src);
  //   });
  //   //count++;
  //   document.getElementById("inputImg").src = img[k];
  // }

  statusMsg.html('Done!');
}
