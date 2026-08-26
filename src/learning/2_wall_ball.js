import { TestBall } from "./1_moving_ball";

// Left canvas
const canvas = document.getElementById("moving_ball_2");
const c1 = canvas.getContext("2d");

// Right Canvas
const canvas1 = document.getElementById("moving_ball_2.0");
const c2 = canvas1.getContext("2d");

// Buttons
const startBtn = document.getElementById("test2_start");
const stopBtn = document.getElementById("test2_stop");
const restartBtn = document.getElementById("test2_restart");

const width = canvas.width;
const height = canvas.height;

function clearAll(c) {
	c.clearRect(0, 0, width, height);
}

function drawRect(c) {
	c.strokeStyle = "wheat";
	c.strokeRect(0, 0, width, height);
}
drawRect(c1);
drawRect(c2);

const ball1 = new TestBall(
	"white",
	10,
	width / 3,
	height / 3,
	width / 3,
	height / 3,
);
const ball2 = new TestBall(
	"white",
	10,
	width / 3,
	height / 3,
	width / 3,
	height / 3,
);

ball1.drawBall(c1);
ball2.drawBall(c2);

// Acceleration input (default = ??);
let acceleration = Number(document.getElementById("test2_acceleration").value);

// default = ??
let velocity = Number(document.getElementById("test2_velocity").value);

// Angle
let angle_n = Number(document.getElementById("test2_angle_numerator").value);
let angle_d = Number(document.getElementById("test2_angle_denominator").value);
let direction = (Math.PI * angle_n) / angle_d;
if (angle_n == 0 || angle_d == 0) direction = 0;

// direction the ball is hit
// using radians
// let direction = (Math.PI * 3) / 4;

// Ball 1 direction
let b1Xdir = 1;
let b1Ydir = 1;
// Ball 2 direction
let b2Xdir = 1;
let b2Ydir = 1;

function resetAllDir() {
	b1Xdir = 1;
	b1Ydir = 1;
	b2Xdir = 1;
	b2Ydir = 1;
}

let raf;
// will animate both balls simultaneously
function draw() {
	clearAll(c1);
	clearAll(c2);
	drawRect(c1);
	drawRect(c2);
	ball1.drawBall(c1);
	ball2.drawBall(c2);

	// Implement bouncing off walls
	// Ball 1
	if (ball1.curX < ball1.radius) {
		ball1.curX = ball1.radius;
		b1Xdir = Math.abs(b1Xdir);
	} else if (ball1.curX > width - ball1.radius) {
		ball1.curX = width - ball1.radius;
		b1Xdir = -Math.abs(b1Xdir);
	}
	if (ball1.curY < ball1.radius) {
		ball1.curY = ball1.radius;
		b1Ydir = Math.abs(b1Ydir);
	} else if (ball1.curY > height - ball1.radius) {
		ball1.curY = height - ball1.radius;
		b1Ydir = -Math.abs(b1Ydir);
	}
	// Ball 2
	if (ball2.curX < ball2.radius) {
		ball2.curX = ball2.radius;
		b2Xdir = Math.abs(b2Xdir);
	} else if (ball2.curX > width - ball2.radius) {
		ball2.curX = width - ball2.radius;
		b2Xdir = -Math.abs(b2Xdir);
	}

	if (ball2.curY < ball2.radius) {
		ball2.curY = ball2.radius;
		b2Ydir = Math.abs(b2Ydir);
	} else if (ball2.curY > height - ball2.radius) {
		ball2.curY = height - ball2.radius;
		b2Ydir = -Math.abs(b2Ydir);
	}

	// Ball 1
	ball1.curX += b1Xdir * velocity * Math.cos(direction);
	ball1.curY += b1Ydir * velocity * -Math.sin(direction);

	// ACCELERATION - ONLY FOR BALL 2
	// Implement bouncing off walls

	// if decelerating is so small then end animation and make it stationary
	if (acceleration >= 0) {
		ball2.curX +=
			b2Xdir *
			(velocity +
				Math.sqrt(
					2 *
						acceleration *
						Math.max(ball2.curX - ball2.startX, ball2.startX - ball2.curX),
				)) *
			Math.cos(direction);
		ball2.curY +=
			b2Ydir *
			(velocity +
				Math.sqrt(
					2 *
						acceleration *
						Math.max(ball2.curY - ball2.startY, ball2.startY - ball2.curY),
				)) *
			-Math.sin(direction);
	} else {
		ball2.curX +=
			b2Xdir *
			(velocity -
				Math.sqrt(
					2 *
						-acceleration *
						Math.max(ball2.curX - ball2.startX, ball2.startX - ball2.curX),
				)) *
			Math.cos(direction);
		ball2.curY +=
			b2Ydir *
			(velocity -
				Math.sqrt(
					2 *
						-acceleration *
						Math.max(ball2.curY - ball2.startY, ball2.startY - ball2.curY),
				)) *
			-Math.sin(direction);
		if (
			velocity -
				Math.sqrt(
					2 *
						-acceleration *
						Math.max(ball2.curX - ball2.startX, ball2.startX - ball2.curX),
				) <
				0.01 &&
			velocity -
				Math.sqrt(
					2 *
						-acceleration *
						Math.max(ball2.curY - ball2.startY, ball2.startY - ball2.curY),
				) <
				0.01
		) {
			return;
		}
	}

	raf = window.requestAnimationFrame(draw);
}

function restart() {
	window.cancelAnimationFrame(raf); // this pauses ball from keeping on moving
	clearAll(c1);
	clearAll(c2);
	drawRect(c1);
	drawRect(c2);
	// ball back to starting position
	ball1.curX = ball1.startX;
	ball1.curY = ball1.startY;
	ball2.curX = ball2.startX;
	ball2.curY = ball2.startY;
	// reset direction
	resetAllDir();
	ball1.drawBall(c1);
	ball2.drawBall(c2);
}

startBtn.addEventListener("click", function () {
	if (!raf) {
		// move ball to the other side
		resetAllDir();
		velocity = Number(document.getElementById("test2_velocity").value);
		acceleration = Number(document.getElementById("test2_acceleration").value);

		// find direction
		angle_n = Number(document.getElementById("test2_angle_numerator").value);
		angle_d = Number(document.getElementById("test2_angle_denominator").value);
		direction = (Math.PI * angle_n) / angle_d;
		if (angle_n == 0 || angle_d == 0) direction = 0;

		raf = window.requestAnimationFrame(draw);
	}
});

stopBtn.addEventListener("click", function () {
	window.cancelAnimationFrame(raf);
	raf = undefined;
});

restartBtn.addEventListener("click", function () {
	restart();
	raf = undefined;
});

ball1.drawBall(c1);
ball2.drawBall(c2);
