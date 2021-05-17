function Unfold(shape, pos = [0, 0, 0]) {
  this.color;
  // arr is a 3D array

  this.shape = deepCopy(shape);
  this.selected = true;
  this.pos = pos;

  this.id = Math.random();

  this.draw = function () {
    fill(...this.color, transparency);
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[0].length; j++) {
        for (let k = 0; k < this.shape[0][0].length; k++) {
          if (this.shape[i][j][k]) {
            push();
            translate(
              (this.pos[0] + i) * SIZE,
              (this.pos[1] + j) * SIZE,
              (this.pos[2] + k) * SIZE
            );
            box(SIZE, SIZE, SIZE);
            pop();
          }
        }
      }
    }
  };

  this.move = function (dir) {
    this.pos[0] += dir[0];
    this.pos[1] += dir[1];
    this.pos[2] += dir[2];
  };

  this.rotateX = function (counterclockwise = false) {
    if (counterclockwise) for (let i = 0; i < 3; i++) this.rotateX();
    else {
      let sh2 = [];
      for (let matrix of this.shape) sh2.push(rotateMatrix(matrix));
      this.shape = sh2;
    }
  };

  this.rotateY = function (counterclockwise = false) {
    if (counterclockwise) for (let i = 0; i < 3; i++) this.rotateY();
    else {
      let sh = columns(this.shape);
      let sh2 = [];
      for (let matrix of sh) sh2.push(rotateMatrix(matrix));
      this.shape = columns(sh2);
    }
  };

  this.rotateZ = function (counterclockwise = false) {
    if (counterclockwise) {
      this.rotateX();
      this.rotateY(true);
      this.rotateX(true);
    } else {
      this.rotateX();
      this.rotateY();
      this.rotateX(true);
    }
  };

  this.mirror = function () {
    this.shape = this.shape.map((matrix) => mirror(matrix));
  };

  this.copy = () => {
    let s = new Unfold(Array.from(deepCopy(this.shape)), Array.from(this.pos));
    s.color = this.color;
    return s;
  };
}

function moveSelectedShapes(arr) {
  let selected = shapes.filter((s) => s.selected);
  selected.map((shape) => addShapeToSpace(shape, false));
  selected.map((s) => s.move(arr));
  selected.map((shape) => addShapeToSpace(shape));
}

function rotateXSelectedShapes(counterclockwise) {
  shapes
    .filter((s) => s.selected)
    .map((s) => {
      addShapeToSpace(s, false);
      s.rotateX(counterclockwise);
      addShapeToSpace(s);
    });
}

function rotateYSelectedShapes(counterclockwise) {
  shapes
    .filter((s) => s.selected)
    .map((s) => {
      addShapeToSpace(s, false);
      s.rotateY(counterclockwise);
      addShapeToSpace(s);
    });
}
function rotateZSelectedShapes(counterclockwise) {
  shapes
    .filter((s) => s.selected)
    .map((s) => {
      addShapeToSpace(s, false);
      s.rotateZ(counterclockwise);
      addShapeToSpace(s);
    });
}
function mirrorSelectedShapes() {
  shapes
    .filter((s) => s.selected)
    .map((s) => {
      addShapeToSpace(s, false);
      s.mirror();
      addShapeToSpace(s);
    });
}
