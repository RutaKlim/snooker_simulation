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
const redBall1 = new Ball(
	"#d91002",
	true,
	1,
	true,
	(width * 3) / 4,
	height / 2,
);
redBall1.radius = 15;
redBall1.drawBall(c);

// red ball (another ball for the target to hit)
const redBall2 = new Ball(
	"#d91002",
	true,
	1,
	true,
	(width * 6) / 7,
	(height * 4) / 5,
);
redBall2.radius = 15;
redBall2.drawBall(c);

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
	changeDirections(cueBall);
}
calcDirectionForCueBall();

// array of ball objects that are on the table
const ballsOnTable = [cueBall, redBall1, redBall2];

function resolveCollision(ball, otherBall) {
	const deltaX = otherBall.curX - ball.curX;
	const deltaY = otherBall.curY - ball.curY;
	const distance = Math.hypot(deltaX, deltaY);
	const minDistance = ball.radius + otherBall.radius;

	if (distance === 0 || distance >= minDistance) return;

	const normalX = deltaX / distance;
	const normalY = deltaY / distance;
	const overlap = minDistance - distance;

	// Separate the balls so the same impact is not resolved repeatedly.
	ball.curX -= (normalX * overlap) / 2;
	ball.curY -= (normalY * overlap) / 2;
	otherBall.curX += (normalX * overlap) / 2;
	otherBall.curY += (normalY * overlap) / 2;

	const relativeVelocityX = otherBall.velocityX - ball.velocityX;
	const relativeVelocityY = otherBall.velocityY - ball.velocityY;
	const velocityAlongNormal =
		relativeVelocityX * normalX + relativeVelocityY * normalY;

	// Do not bounce balls that are already moving apart.
	if (velocityAlongNormal >= 0) return;

	// Equal masses and a perfectly elastic collision.
	const impulse = -(2 * velocityAlongNormal) / 2;
	ball.velocityX -= impulse * normalX;
	ball.velocityY -= impulse * normalY;
	otherBall.velocityX += impulse * normalX;
	otherBall.velocityY += impulse * normalY;
	otherBall.isMoving = true;
}

function changeDirections(ball) {
	let d = ball.direction;
	if (0 <= d && d < Math.PI / 2) {
		ball.velocityX = Math.abs(ball.velocityX);
		ball.velocityY = -Math.abs(ball.velocityY);
	} else if (Math.PI / 2 <= d && d < Math.PI) {
		ball.velocityX = -Math.abs(ball.velocityX);
		ball.velocityY = -Math.abs(ball.velocityY);
	} else if (Math.PI <= d && d < (Math.PI * 3) / 2) {
		ball.velocityX = -Math.abs(ball.velocityX);
		ball.velocityY = Math.abs(ball.velocityY);
	} else if ((Math.PI * 3) / 2 <= d && d < 2 * Math.PI) {
		ball.velocityX = Math.abs(ball.velocityX);
		ball.velocityY = Math.abs(ball.velocityY);
	}
}

function wallDeflection() {
	ballsOnTable.forEach((ball) => {
		// X
		if (ball.curX < ball.radius) {
			ball.curX = ball.radius;
			ball.velocityX = Math.abs(ball.velocityX);
		} else if (ball.curX > width - ball.radius) {
			ball.curX = width - ball.radius;
			ball.velocityX = -Math.abs(ball.velocityX);
		}
		// Y
		if (ball.curY < ball.radius) {
			ball.curY = ball.radius;
			ball.velocityY = Math.abs(ball.velocityY);
		} else if (ball.curY > height - ball.radius) {
			ball.curY = height - ball.radius;
			ball.velocityY = -Math.abs(ball.velocityY);
		}
	});
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

	wallDeflection();

	// // TODO
	// // CODE WHAT HAPPENS WHEN A BALL MAKES ANOTHER MOVE, AND EDIT THAT BALL SO THAT HOLDS THE VALUE THAT IT IS MOVING ETC.
	// // scan through the moving balls, and see what other balls they hit
	// // ballsOnTable.forEach((ball) => {
	// // 	ballsOnTable.forEach((otherBall) => {
	if (ballsOnTable.length > 1) {
		for (let i = 0; i < ballsOnTable.length - 1; i++) {
			for (let j = i + 1; j < ballsOnTable.length; j++) {
				const ball = ballsOnTable[i];
				const otherBall = ballsOnTable[j];

				const distance = Math.hypot(
					ball.curX - otherBall.curX,
					ball.curY - otherBall.curY,
				);
				if (ball.isMoving && distance <= ball.radius + otherBall.radius) {
					resolveCollision(ball, otherBall);
					// 				otherBall.isMoving = true;
					// 				otherBall.speed = ball.speed;
					// 				const theta = -Math.atan2(
					// 					otherBall.curY - ball.curY,
					// 					otherBall.curX - ball.curX,
					// 				);
					// 				const ballVelocity = rotate(ball, theta);
					// 				const otherBallVelocity = rotate(otherBall, theta);
					// 				ball.velocityX = ballVelocity[0];
					// 				ball.velocityY = ballVelocity[1];
					// 				otherBall.velocityX = otherBallVelocity[0];
					// 				otherBall.velocityY = otherBallVelocity[1];
					// 				// const deltaX = otherBall.curX - ball.curX; // why does the order matter??
					// 				// const deltaY = otherBall.curY - ball.curY;
					// 				// otherBall.direction = Math.atan2(deltaY, deltaX);
					// 				otherBall.distanceTravelled = 0;
					// 				// // change direction of dirX and dirY
					// 				// changeDirections(otherBall);
					// 				// // make white ball change direction as well
					// 				// // ball.direction = 2 * Math.PI + 1 / otherBall.direction;
					// 				// // console.log(ball.direction);
					// 				// ball.direction =
					// 				// 	(Math.abs(2 * Math.PI - otherBall.direction) * 1) / 2;
					// 				// // console.log(ball.direction);
					// 				// // ball.direction = Math.PI;
					// 				// changeDirections(ball);
				}
			}
		}
	}

	// function rotate(ball, theta) {
	// 	return [
	// 		ball.velocityX * Math.cos(theta) - ball.velocityY * Math.sin(theta),
	// 		ball.velocityX * Math.sin(theta) + ball.velocityY * Math.cos(theta),
	// 	];
	// }

	// make balls move
	// ballsOnTable.forEach((ball) => {
	// 	if (ball.isMoving) {
	// 		let currentSpeed = Math.sqrt(
	// 			Math.max(
	// 				0,
	// 				ball.speed ** 2 + 2 * deceleration * ball.distanceTravelled,
	// 			),
	// 		);

	// 		if (currentSpeed < 0.01) ball.isMoving = false;
	// 		ball.curX += ball.velocityX * currentSpeed * Math.cos(ball.direction);
	// 		ball.curY += ball.velocityY * currentSpeed * -Math.sin(ball.direction);
	// 		ball.distanceTravelled += currentSpeed;
	// 	}
	// });

	ballsOnTable.forEach((ball) => {
		if (ball.isMoving) {
			// if (ball.velocityX < 0.01 || ball.velocityY < 0.01) ball.isMoving = false;

			const speed = Math.hypot(ball.velocityX, ball.velocityY);
			const nextSpeed = speed + deceleration;

			if (nextSpeed < 0.001) {
				ball.velocityX = 0;
				ball.velocityY = 0;
				ball.isMoving = false;
				return;
			}

			const scale = nextSpeed / speed;

			ball.velocityX *= scale;
			ball.velocityY *= scale;

			ball.curX += ball.velocityX;
			ball.curY += ball.velocityY;
		}
	});

	// links:
	// implement the below, becuase instead of silly dirX and dirY, you can just use velocity vectors which lowkey make more sense
	// and implement the rotation formulas, as it's too complicated rn,
	// i will only do it for this section as i want to leave 2_wall_ball alone as it works and shows my old implementation that i made myself and understand
	// https://www.101computing.net/elastic-collision-in-a-pool-game/
	// YT video: https://www.youtube.com/watch?v=dJNFPv9Mj-Y

	// stop the animations when all balls aren't moving
	if (ballsOnTable.some((ball) => ball.isMoving)) {
		raf = window.requestAnimationFrame(draw);
	} else {
		window.cancelAnimationFrame(raf);
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
		//--------------------------------------
		let currentSpeed = Math.sqrt(Math.max(0, cueBall.speed ** 2));
		// if (currentSpeed < 0.01) ball.isMoving = false;
		cueBall.velocityX = currentSpeed * Math.cos(cueBall.direction);
		cueBall.velocityY = currentSpeed * -Math.sin(cueBall.direction);
		//--------------------------------------
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
		ball.velocityX = 1;
		ball.velocityY = 1;
		ball.distanceTravelled = 0;
		ball.speed = 0;
		ball.isMoving = false;
		ball.direction = 0;
	});
	drawAllBalls(ballsOnTable, c);
	raf = undefined;
});
