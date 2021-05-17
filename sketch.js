var shapes = [];

var clipboard = [];
var transparency = 100;

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
    case KEYMAP.resetCameraView:
      resetCameraView();
      break;
    case KEYMAP.moveLeft:
      moveSelectedShapes([-1, 0, 0]);
      break;
    case KEYMAP.moveRight:
      moveSelectedShapes([1, 0, 0]);
      break;
    case KEYMAP.moveDown:
      moveSelectedShapes([0, 1, 0]);
      break;
    case KEYMAP.moveUp:
      moveSelectedShapes([0, -1, 0]);
      break;
    case KEYMAP.moveBack:
      moveSelectedShapes([0, 0, -1]);
      break;
    case KEYMAP.moveFront:
      moveSelectedShapes([0, 0, 1]);
      break;
    case KEYMAP.rotateXcw:
      rotateXSelectedShapes();
      break;
    case KEYMAP.rotateXccw:
      rotateXSelectedShapes(true);
      break;
    case KEYMAP.rotateYcw:
      rotateYSelectedShapes();
      break;
    case KEYMAP.rotateYccw:
      rotateYSelectedShapes(true);
      break;
    case KEYMAP.rotateZcw:
      rotateZSelectedShapes();
      break;
    case KEYMAP.rotateZccw:
      rotateZSelectedShapes(true);
      break;
    case KEYMAP.mirror:
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
  stroke(255);
  fill(255);
  sphere(0.5);
  stroke(0);
  strokeWeight(1);

  drawSpace();
  for (let s of shapes) s.draw();
}

function resetCameraView() {
  easycam.state.center = [0, 0, 0];
  //   easycam.state.distance = 300;
  easycam.state.rotation = [1, 0, 0, 0];
}
