import { Ball } from "../physics/ball.js";
import { CueBall } from "../physics/ball.js";
import { drawAllBalls } from "../render/drawBall.js";

const canvas = document.getElementById("collision_ball");
const c = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const strikeBtn = document.getElementById("test3_strike");
const restartBtn = document.getElementById("test3_restart");

function clearAll() {
	c.clearRect(0, 0, width, height);
}

function drawRect() {
	c.strokeStyle = "wheat";
	c.strokeRect(0, 0, width, height);
}
drawRect();

// Cue ball
const cueBall = new CueBall(true, width / 7, height / 2);
cueBall.radius = 15;
cueBall.drawBall(c);

// Red ball (target ball)
const redBall = new Ball("#d91002", true, 1, true, (width * 3) / 4, height / 2);
redBall.radius = 15;
redBall.drawBall(c);

// Initial speed by the cue ball
cueBall.speed = Number(document.getElementById("collision_ball_speed").value);

// deceleration is applied to all balls
let deceleration = Number(
	document.getElementById("collision_ball_deceleration").value,
);

// Angle - also for the cue ball
let angle_n;
let angle_d;
function calcDirectionForCueBall() {
	angle_n = Number(document.getElementById("test3_angle_numerator").value);
	angle_d = Number(document.getElementById("test3_angle_denominator").value);
	if (angle_n == 0 || angle_d == 0) {
		cueBall.direction = 0;
	} else {
		cueBall.direction = (Math.PI * angle_n) / angle_d;
	}
}
calcDirectionForCueBall();

// array of ball objects that are on the table
const ballsOnTable = [cueBall, redBall];

let raf;
// let distanceTravelled = 0;
function draw() {
	clearAll();
	drawRect();
	drawAllBalls(ballsOnTable, c);

	// cue is hit with initial speed
	// deceleration from the table and air, instantly act against it.
	// the angle given will be the angle at which the white cue ball is hit.
	// check if the balls touch, then calculate the angle made, and the force at which it was hit

	function wallDeflection() {
		ballsOnTable.forEach((ball) => {
			// X
			if (ball.curX < ball.radius) {
				ball.curX = ball.radius;
				ball.dirX = Math.abs(ball.dirX);
			} else if (ball.curX > width - ball.radius) {
				ball.curX = width - ball.radius;
				ball.dirX = -Math.abs(ball.dirX);
			}
			// Y
			if (ball.curY < ball.radius) {
				ball.curY = ball.radius;
				ball.dirY = Math.abs(ball.dirY);
			} else if (ball.curY > width - ball.radius) {
				ball.curY = height - ball.radius;
				ball.dirY = -Math.abs(ball.dirY);
			}
		});
	}
	wallDeflection();

	// make balls move
	ballsOnTable.forEach((ball) => {
		if (ball.isMoving) {
			let currentSpeed = Math.sqrt(
				Math.max(
					0,
					ball.speed ** 2 + 2 * deceleration * ball.distanceTravelled,
				),
			);

			if (currentSpeed < 0.01) ball.isMoving = false;

			ball.curX += ball.dirX * currentSpeed * Math.cos(ball.direction);
			ball.curY += ball.dirY * currentSpeed * -Math.sin(ball.direction);
			ball.distanceTravelled += currentSpeed;
		}

		// TODO
		// CODE WHAT HAPPENS WHEN A BALL MAKES ANOTHER MOVE, AND EDIT THAT BALL SO THAT HOLDS THE VALUE THAT IT IS MOVING ETC.
		// scan through the moving balls, and see what other balls they hit
		ballsOnTable.forEach((ball) => {
			ballsOnTable.forEach((otherBall) => {
				if (
					ball != otherBall &&
					Math.hypot(ball.curX - otherBall.curX, ball.curY - otherBall.curY) <=
						ball.radius + otherBall.radius
				) {
					// make 'otherBall' move due to 'ball'
					otherBall.isMoving = true;
					otherBall.speed = ball.speed;
					// otherBall.direction = Math.atan(
					// 	Math.abs(ball.curY - otherBall.curY / ball.curX - otherBall.curX),
					// );
					otherBall.direction = 0;

					// make ball change direction as well
				}
			});
		});
	});

	// stop the animations when all balls all aren't moving
	ballsOnTable.forEach((ball) => {
		if (ball._isMoving == true) {
			raf = window.requestAnimationFrame(draw);
		}
	});
}

strikeBtn.addEventListener("click", function () {
	if (!raf) {
		cueBall.speed = Number(
			document.getElementById("collision_ball_speed").value,
		);
		deceleration = Number(
			document.getElementById("collision_ball_deceleration").value,
		);
		calcDirectionForCueBall();
		cueBall.isMoving = true;
		raf = window.requestAnimationFrame(draw);
	}
});

// when resetting the ball remember to make everything ball.isMoving = false;
restartBtn.addEventListener("click", function () {
	window.cancelAnimationFrame(raf);
	clearAll();
	drawRect();
	ballsOnTable.forEach((ball) => {
		ball.curX = ball.startX;
		ball.curY = ball.startY;
		ball.distanceTravelled = 0;
		ball.speed = 0;
		ball.isMoving = false;
		ball.direction = 0;
	});
	drawAllBalls(ballsOnTable, c);
	raf = undefined;
});
