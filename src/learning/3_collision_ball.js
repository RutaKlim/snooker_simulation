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
const cueBall = new CueBall(true, width / 7, height / 2 - 20);
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

function changeDirections(ball) {
	console.log(ball);
	let d = ball.direction;
	console.log(ball.direction);
	// console.log(2 * Math.PI);
	if (0 <= d && d < Math.PI / 2) {
		ball.dirX = 1;
		ball.dirY = -1;
	} else if (Math.PI / 2 <= d && d < Math.PI) {
		ball.dirX = -1;
		ball.dirY = -1;
	} else if (Math.PI <= d && d < (Math.PI * 3) / 2) {
		ball.dirX = -1;
		ball.dirY = 1;
	} else if ((Math.PI * 3) / 2 <= d && d < 2 * Math.PI) {
		ball.dirX = 1;
		ball.dirY = 1;
	}
	console.log("X: " + ball.dirX);
	console.log("y: " + ball.dirY);
}

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
			} else if (ball.curY > height - ball.radius) {
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
	});
	// TODO
	// CODE WHAT HAPPENS WHEN A BALL MAKES ANOTHER MOVE, AND EDIT THAT BALL SO THAT HOLDS THE VALUE THAT IT IS MOVING ETC.
	// scan through the moving balls, and see what other balls they hit
	// ballsOnTable.forEach((ball) => {
	// 	ballsOnTable.forEach((otherBall) => {
	for (let i = 0; i < ballsOnTable.length - 1; i++) {
		for (let j = i + 1; j < ballsOnTable.length; j++) {
			const ball = ballsOnTable[i];
			const otherBall = ballsOnTable[j];

			const distance = Math.hypot(
				ball.curX - otherBall.curX,
				ball.curY - otherBall.curY,
			);
			if (ball.isMoving && distance <= ball.radius + otherBall.radius) {
				otherBall.isMoving = true;
				otherBall.speed = ball.speed;
				const deltaX = otherBall.curX - ball.curX; // why does the order matter??
				const deltaY = otherBall.curY - ball.curY;
				otherBall.direction = Math.atan(deltaY / deltaX);
				otherBall.distanceTravelled = 0;
				// change direction of dirX and dirY
				changeDirections(otherBall);
				// make white ball change direction as well
				// ball.direction = 2 * Math.PI + 1 / otherBall.direction;
				// console.log(ball.direction);
				ball.direction = (Math.abs(2 * Math.PI - otherBall.direction) * 1) / 2;
				// console.log(ball.direction);
				// ball.direction = Math.PI;
				changeDirections(ball);
			}
		}

		// links:
		// implement the below, becuase instead of silly dirX and dirY, you can just use velocity vectors which lowkey make more sense
		// and implement the rotation formulas, as it's too complicated rn,
		// i will only do it for this section as i want to leave 2_wall_ball alone as it works and shows my old implementation that i made myself and understand
		// https://www.101computing.net/elastic-collision-in-a-pool-game/
		// YT video: https://www.youtube.com/watch?v=dJNFPv9Mj-Y

		// stop the animations when all balls all aren't moving
		if (ballsOnTable.some((ball) => ball.isMoving)) {
			raf = window.requestAnimationFrame(draw);
		}
	}
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
		ball.dirX = 1;
		ball.dirY = 1;
		ball.distanceTravelled = 0;
		ball.speed = 0;
		ball.isMoving = false;
		ball.direction = 0;
	});
	drawAllBalls(ballsOnTable, c);
	raf = undefined;
});
