function addNewShape(pos) {
  let shape = _spawnShape(pos);
  addControl(shape);
  addShapeToSpace(shape);
}

function pasteShape(shape) {
  let s = shape.copy();
  shapes.push(s);
  addControl(s);
  addShapeToSpace(s);
}

function _spawnShape(pos) {
  let shape = new Unfold(SHAPE, pos);
  shapes.push(shape);
  return shape;
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
 */
function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function deepCopy(arr) {
  if (Array.isArray(arr)) {
    return arr.map(deepCopy);
  }
  return arr;
}

function colorToCSS(color) {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function columns(matrix) {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
}

function mirror(matrix) {
  return matrix.map((row) => reverse(row));
}

function rotateMatrix(matrix) {
  return reverse(columns(matrix));
}
