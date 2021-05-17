var shapes = [];

var clipboard = [];

var easycam;

function setup() {
  Dw.EasyCam.prototype.apply = function (n) {
    var o = this.cam;
    (n = n || o.renderer),
      n &&
        ((this.camEYE = this.getPosition(this.camEYE)),
        (this.camLAT = this.getCenter(this.camLAT)),
        (this.camRUP = this.getUpVector(this.camRUP)),
        n._curCamera.camera(
          this.camEYE[0],
          this.camEYE[1],
          this.camEYE[2],
          this.camLAT[0],
          this.camLAT[1],
          this.camLAT[2],
          this.camRUP[0],
          this.camRUP[1],
          this.camRUP[2]
        ));
  };

  createCanvas(
    windowWidth * canvasScreenRatio,
    windowHeight - 20,
    WEBGL
  ).parent("canvas");
  setAttributes("antialias", true);
  // projection
  perspective((60 * PI) / 180, width / height, 1, 5000);

  easycam = createEasyCam({ distance: 300 });

  document.oncontextmenu = function () {
    return false;
  };

  addNewShape();
}

function windowResized() {
  resizeCanvas(windowWidth * canvasScreenRatio, windowHeight - 20);
  easycam.setViewport([0, 0, windowWidth * canvasScreenRatio, windowHeight]);
}

function keyPressed() {
  switch (key) {
    case " ":
      resetCameraView();
      break;
    case "a":
      moveSelectedShapes([-1, 0, 0]);
      break;
    case "s":
      moveSelectedShapes([1, 0, 0]);
      break;
    case "r":
      moveSelectedShapes([0, 1, 0]);
      break;
    case "w":
      moveSelectedShapes([0, -1, 0]);
      break;
    case "q":
      moveSelectedShapes([0, 0, -1]);
      break;
    case "f":
      moveSelectedShapes([0, 0, 1]);
      break;
    case "n":
      rotateYSelectedShapes();
      break;
    case "i":
      rotateYSelectedShapes(true);
      break;
    case "u":
      rotateXSelectedShapes();
      break;
    case "e":
      rotateXSelectedShapes(true);
      break;
    case "l":
      rotateZSelectedShapes(true);
      break;
    case "y":
      rotateZSelectedShapes();
      break;
    case ",":
      mirrorSelectedShapes();
    default:
    // code block
  }
}

function draw() {
  // BG
  background(32);

  // objects
  strokeWeight(0.5);
  stroke(0);

  box(1, 1, 1);

  for (let s of shapes) s.draw();
  /*
  push();
  translate(50, 50, 0);
  fill(255);
  box(50, 50, 25);
  pop();

  push();
  translate(-50, -50, 0);
  fill(255, 0, 128);
  box(50, 50, 25);
  pop();

  push();
  translate(+50, -50, 0);
  fill(0, 128, 255);
  box(50, 50, 25);
  pop();

  push();
  translate(-50, +50, 0);
  fill(255, 255, 0);
  box(50, 50, 25);
  pop();
  */
}

function resetCameraView() {
  easycam.state.center = [0, 0, 0];
  //   easycam.state.distance = 300;
  easycam.state.rotation = [1, 0, 0, 0];
}
