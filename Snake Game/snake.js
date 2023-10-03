let lastTime = 0;
let snakeSpeed = 3;
let inputDirection = { y: -1, y: 0 };
let food = { x: 10, y: 5 };

let lastinputDirection = inputDirection;

let snakeBody = [
  { x: 8, y: 8 },
  { x: 9, y: 8 },
  { x: 10, y: 8 },
  { x: 11, y: 8 },
  { x: 12, y: 8 },
];
function paint(currentTime) {
  let timeSecond = (currentTime - lastTime) / 1000;

  requestAnimationFrame(paint);
  if (timeSecond < 1 / snakeSpeed) return;
  lastTime = currentTime;
  // console.log(timeSecond);

  update();
  draw();
}

window.requestAnimationFrame(paint);

function update() {
  snakeMove();
  gameBoard.innerHTML = "";
}

function foodElement() {
  var foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");

  gameBoard.appendChild(foodElement);
}

function draw() {
  drawSnake();
  foodElement();
  snakeEat();
}
const gameBoard = document.querySelector(".game-board");
function drawSnake() {
  snakeBody.forEach((segment, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.transform = "rotate(0deg)";
    if (index == 0) {
      snakeElement.classList.add("head");
      if (inputDirection.x == 1) {
        snakeElement.style.transform = "rotate(-90deg)";
      } else if (inputDirection.x == -1) {
        snakeElement.style.transform = "rotate(90deg)";
      } else if (inputDirection.y == -1) {
        snakeElement.style.transform = "rotate(-180deg)";
      }
    } else {
      snakeElement.classList.add("snake");
    }
    gameBoard.appendChild(snakeElement);
  });
}

function snakeMove() {
  inputDirection = getInputDirection();
  for (let index = snakeBody.length - 2; index >= 0; index--) {
    snakeBody[index + 1] = { ...snakeBody[index] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

function getInputDirection() {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        if (lastinputDirection.x == -1) break;
        inputDirection = { x: 1, y: 0 };

        break;

      case "ArrowLeft":
        if (lastinputDirection.x == 1) break;
        inputDirection = { x: -1, y: 0 };

        break;

      case "ArrowUp":
        if (lastinputDirection.y == 1) break;
        inputDirection = { x: 0, y: -1 };

        break;

      case "ArrowDown":
        if (lastinputDirection.y == -1) break;
        inputDirection = { x: 0, y: 1 };

        break;

      // default:
      //   inputDirection = { x: 0, y: 0 };
      //   break;
    }
  });
  lastinputDirection = inputDirection;
  return inputDirection;
}

function snakeEat() {
  if (isEat()) {
    getrandomFood()


  }
}
function isEat() {
  // return snakeBody[0].x === food.x && snakeBody[0].y === food.y;
  
}

// function getrandomFood (){
//   return {
//     x: Math.floor(Math.random()*16),
//     y: Math.floor(Math.random()*16)
//   }
  
// }