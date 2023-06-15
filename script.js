let size = 16;
let colorcell = "#000000";

let actRandomColor = false;
let actGrayScale = false;

const grid = document.querySelector(".container");
const menu = document.querySelector(".menu");
const gridSize = document.querySelector("input");

const buttonClean = document.createElement("button");
const buttonRandomColor = document.createElement("button");
const buttonGrayScale = document.createElement("button");
const divSizeGrid = document.createElement("div");
const labelColor = document.createElement("label");
const myColor = document.createElement("input");

buttonClean.textContent = "Clean";
buttonRandomColor.textContent = "Enable Random Color";
buttonGrayScale.textContent = "Enable Gray Scale";
divSizeGrid.textContent = size + " x " + size;
labelColor.textContent = "Select Color:  "

gridSize.classList = "size";
divSizeGrid.classList = "size-grid";
labelColor.classList = "label-color";
myColor.classList = "myColor";
myColor.type = "color";





menu.appendChild(divSizeGrid);
menu.appendChild(labelColor);
menu.appendChild(buttonClean);
menu.appendChild(buttonGrayScale);
menu.appendChild(buttonRandomColor);

labelColor.appendChild(myColor);


buttonRandomColor.addEventListener("click", function () {
  actButtRandonColor();
});

buttonGrayScale.addEventListener("click", function () {
  actButtGrayScale();
});

const actButtGrayScale = () => {
  clean();
  actGrayScale = !actGrayScale;
  actRandomColor = false;
  messajeBtnGrayScale(actGrayScale);
  messajeBtnRandomColor(actRandomColor);
};

const actButtRandonColor = () => {
  clean();
  actRandomColor = !actRandomColor;
  actGrayScale = false;
  messajeBtnGrayScale(actGrayScale);
  messajeBtnRandomColor(actRandomColor);
 
  
};

const messajeBtnGrayScale=(actGrayScale)=>{
  buttonGrayScale.textContent = actGrayScale
    ? "Disable Gray Scale"
    : "Enable Gray Scale";
}
const messajeBtnRandomColor=(actRandomColor)=>{
  buttonRandomColor.textContent = actRandomColor
  ? "Disable Random Color"
  : "Enable Random Color";
}

//tamaño de la celda de acuedo al tamaño de la grid
let sizeCell = grid.offsetWidth / size;

//Crea la grid con un tamaño de n x n
const createGrid = (size) => {
  sizeCell = grid.offsetWidth / size;
  for (var i = 0; i < size; i++) {
    var fila = document.createElement("div");
    fila.classList = "fila";
    for (var j = 0; j < size; j++) {
      var cell = document.createElement("div");
      cell.classList = "cell";
      cell.style.cssText =
        "width:" + sizeCell + "px; height:" + sizeCell + "px;";
      fila.appendChild(cell);
      fila.style.cssText = " height:" + sizeCell + "px;";
    }
    grid.appendChild(fila);
  }
};

//se agrega evento mouseover para que pinte las aceldas ala pasr por cada una
grid.addEventListener("mouseout", function (e) {
  let colorDetected= e.target.style.background;
  if (e.target.matches(".cell")) {
    if (actRandomColor) {
      colorcell = randomColor();
    } else if (actGrayScale) {
      colorcell = GrayScale(colorDetected);
    } else {
      console.log(myColor.value);
      colorcell = myColor.value;
    }
    e.target.style.background = colorcell;
  }
});

buttonClean.addEventListener("click", function () {
  clean();
});

gridSize.addEventListener("input", function (e) {
  size = e.target.value;
  divSizeGrid.textContent = size + " x " + size;
  clean();
});


//función que genera un color aleatorio
const randomColor = () => {
  let simbolos, color;
  simbolos = "0123456789ABCDEF";
  color = "#";
  for (var i = 0; i < 6; i++) {
    color = color + simbolos[Math.floor(Math.random() * 16)];
  }
  return color;
};

//función que limpia la grid
const clean = () => {
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  createGrid(size);
};

//función que retorna un color rgb() en escala de grises de blanco a negro 
const GrayScale = (rgbColor) => {
  color = rgbColor.slice(4, rgbColor.length - 1);
  rgb = color.split(",");
  if (rgb[0] === undefined || rgb[1] === undefined || rgb[1] === undefined) {
    return "rgb(255, 255, 255)";
  }
  let r = rgb[0] - 50,
    g = rgb[1] - 50,
    b = rgb[2] - 50;

  return "rgb(" + r + " ," + g + " ," + b + ")";
};

createGrid(size);
