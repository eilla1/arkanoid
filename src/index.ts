import { CanvasView } from "./view/CanvasView";
import { Ball } from "./sprites/Ball";
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
// images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";
// level and colors
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY,
} from "./setup";
// Helpers
import { createBricks } from "./helper";

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
  view.drawInfo("Game Over");
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("You won!");
  gameOver = false;
}

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle
  //   ball: Ball
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);

  // move paddle and make it not exit the canvas
  if (
    (paddle.isMovingLeft && paddle.pos.x > 0) ||
    (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
  ) {
    paddle.movePaddle();
  }
  requestAnimationFrame(() => gameLoop(view, bricks, paddle));
}

function startGame(view: CanvasView) {
  // Reset the game
  score = 0;
  view.drawInfo("");
  view.drawScore(0);
  // Create all bricks
  const bricks = createBricks();
  // Create paddle
  const paddle = new Paddle(
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_SPEED,
    {
      x: PADDLE_STARTX,
      y: view.canvas.height - PADDLE_HEIGHT - 5,
    },
    PADDLE_IMAGE
  );

  gameLoop(view, bricks, paddle);
}

// create a new view and intitialize the game with the start button
const view = new CanvasView("#playField");
view.initStartButton(startGame);
