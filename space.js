var space = [];

function addShapeToSpace(shape, add = true) {
  let [x, y, z] = shape.pos;
  for (let i = 0; i < shape.shape.length; i++) {
    if (!space[i + x]) space[i + x] = [];
    for (let j = 0; j < shape.shape[0].length; j++) {
      if (!space[i + x][j + y]) space[i + x][j + y] = [];
      for (let k = 0; k < shape.shape[0][0].length; k++) {
        if (!space[i + x][j + y][k + z]) space[i + x][j + y][k + z] = 0;
        if (shape.shape[i][j][k]) space[i + x][j + y][k + z] += add ? 1 : -1;
      }
    }
  }
}

function drawSpace() {
  fill(255, 0, 0);
  for (let i in space) {
    for (let j in space[i]) {
      for (let k in space[i][j]) {
        if (space[i][j][k] > 1) {
          push();
          translate(i * SIZE, j * SIZE, k * SIZE);
          box(SIZE, SIZE * 1.1, SIZE * 1.1);
          pop();
        }
      }
    }
  }
}

function assertFilled(x1, y1, z1, x2, y2, z2) {
  for (let i = x1; i <= x2; i++) {
    for (let j = y1; j <= y2; j++) {
      for (let k = z1; k <= z2; k++) {
        if (space[i][j][k] != 1) {
          console.log(i, j, k);
          return false;
        }
      }
    }
  }

  return true;
}
