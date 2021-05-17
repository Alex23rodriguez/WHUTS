function addControl(shape) {
  let div = document.createElement("div");
  div.setAttribute("id", shape.id);
  div.setAttribute("style", "display: flex; align-items: center");

  // selected checkbox
  let chk = document.createElement("input");
  chk.setAttribute("type", "checkbox");
  chk.setAttribute("checked", true);

  chk.onclick = () => {
    shape.selected = chk.checked;
  };
  div.appendChild(chk);

  // color div
  let col = document.createElement("div");
  col.setAttribute("style", "width: 10px; height: 10px;");

  div.appendChild(col);

  // color slider

  let sld;
  let init_color;

  sld = makeSlider("slider", 0, 1, 0.001, random());
  if (shape.color) {
    init_color = shape.color;
  } else {
    init_color = HSVtoRGB(Number(sld.value), 1, 1);
    shape.color = init_color;
  }
  col.style.background = colorToCSS(init_color);

  sld.oninput = () => {
    let color = HSVtoRGB(Number(sld.value), 1, 1);
    shape.color = color;
    col.style.background = colorToCSS(color);
  };

  div.appendChild(sld);

  document.getElementById("right-side").appendChild(div);
}

function makeSlider(id, min, max, step, value) {
  let sld = document.createElement("input");
  sld.setAttribute("type", "range");
  sld.setAttribute("min", min);
  sld.setAttribute("max", max);
  sld.setAttribute("step", step);
  sld.setAttribute("value", value);
  sld.setAttribute("id", id);
  sld.setAttribute("class", "slider");
  return sld;
}

// give add and remove buttons functionality
let add = document.getElementById("add-btn");
add.onclick = () => {
  addNewShape([0, 0, 0]);
};

let remove = document.getElementById("remove-btn");
remove.onclick = () => {
  let del = [];
  for (let s of shapes) {
    if (s.selected) {
      document.getElementById(s.id).remove();
      del.push(s);
      addShapeToSpace(s, false);
    }
  }
  shapes = shapes.filter((s) => !del.includes(s));
};

// add copy paste functionality

let copy = document.getElementById("copy-btn");
copy.onclick = () => {
  clipboard = shapes.filter((s) => s.selected).map((s) => s.copy());
};

let paste = document.getElementById("paste-btn");
paste.onclick = () => clipboard.map(pasteShape);
