let container;
let matrix;
const snake = [];
let allcells = [];
const directions = {
  top: 0,
  left: 1,
  right: 2,
  down: 3,
};
let direction = directions.down;
class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}
class Fruit {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}
let fruit = null;
window.onload = () => {
  container = document.getElementById("container");
  main();
};

function main() {
  init();
  document.addEventListener("keydown", keyListyener);
  setInterval(() => {
    update();
    draw();
  }, 40);
}

function init() {
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      const div = `
        <div class='cell'  row=${i} col=${j}></div>`;
      container.innerHTML += div;
    }
  }
  for (let i = 0; i < 3; i++) {
    const cell = new Cell();
    cell.row = 10 + i;
    cell.col = 10;
    snake.push(cell);
  }
  allcells = document.getElementsByClassName("cell");
}
function update() {
  spanFruit();
  const head = snake[0];
  for (var i = snake.length - 1; i > 0; i--) {
    snake[i].row = snake[i - 1].row;
    snake[i].col = snake[i - 1].col;
  }
  if (direction == directions.top) head.row--;
  if (direction == directions.left) head.col--;
  if (direction == directions.right) head.col++;
  if (direction == directions.down) {
    head.row++;
  }
  if (head.row < 0) {
    head.row = 19;
  }
  if (head.row > 19) head.row = 0;
  if (head.col < 0) head.col = 19;
  if (head.col > 19) head.col = 0;
}
function draw() {
  for (var item of allcells) {
    item.style.backgroundColor = "black";
  }
  for (var i = snake.length - 1; i >= 0; i--) {
    for (var item of allcells) {
      const r = item.getAttribute("row");
      const c = item.getAttribute("col");
      if (snake[i].row == r && snake[i].col == c) {
        item.style.backgroundColor = "#32de84";
        if (i == 0) item.style.backgroundColor = "#008B8B";
      }
      if (r == fruit.row && c == fruit.col) {
        item.style.backgroundColor = "#fd5c63";
      }
    }
  }

  if (snake[0].row == fruit.row && snake[0].col == fruit.col) {
    // take
    const newCell = new Cell(fruit.row, fruit.col);
    snake.unshift(newCell);
    fruit = null;
  }
}

function keyListyener({ key, code }) {
  if (key == "ArrowLeft") {
    direction = directions.left;
  }
  if (key == "ArrowRight") {
    direction = directions.right;
  }
  if (key == "ArrowUp") {
    direction = directions.top;
  }
  if (key == "ArrowDown") {
    direction = directions.down;
  }
}
function spanFruit() {
  if (fruit == null) {
    while (true) {
      const row = Math.floor(Math.random() * 20);
      const col = Math.floor(Math.random() * 20);
      var flag = true;
      for (var cell of snake) {
        if (cell.row == row && cell.col == col) {
          flag = false;
          break;
        }
      }
      if (flag) {
        fruit = new Fruit(row, col);
        break;
      }
    }
  }
}
