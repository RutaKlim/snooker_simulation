// import { drawBall } from "../render/drawBall.js";

const canvas = document.getElementById("moving_ball_1");
const c = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

// temp
function drawRect() {
	c.strokeStyle = "wheat";
	c.strokeRect(0, 0, width, height);
}
drawRect();

function clearAll() {
	c.clearRect(0, 0, width, height);
}

// ball
// c.fillStyle = "red";
// c.beginPath();
// c.arc(width / 8, height / 2, 20, 0, 2 * Math.PI);
// c.fill();

// can draw out but i will use the ball object
class TestBall {
	constructor(colour, radius, startX, startY, curX, curY) {
		this._colour = colour;
		this._radius = radius;
		this._startX = startX;
		this._startY = startY;
		this._curX = curX;
		this._curY = curY;
	}

	get colour() {
		return this._colour;
	}
	get radius() {
		return this._radius;
	}
	get startX() {
		return this._startX;
	}
	get startY() {
		return this._startY;
	}
	get curX() {
		return this._curX;
	}
	get curY() {
		return this._curY;
	}

	set curX(curX) {
		this._curX = curX;
	}
	set curY(curY) {
		this._curY = curY;
	}

	drawBall() {
		c.fillStyle = this._colour;
		c.beginPath();
		c.arc(this._curX, this._curY, this._radius, 0, Math.PI * 2, true);
		c.fill();
	}
}
const b1 = new TestBall(
	"white",
	15,
	width / 8,
	height / 2,
	width / 8,
	height / 2,
);

b1.drawBall();

// physics to make the ball move
const startBtn1 = document.getElementById("test1_start");
const stopBtn1 = document.getElementById("test1_stop");
const restartBtn1 = document.getElementById("test1_restart");

// Acceleration input (default = 0);
let acceleration = Number(
	document.getElementById("moving_ball_acceleration").value,
);

let velocity = Number(document.getElementById("moving_ball_velocity").value);

// USING THIS LINK --> https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
let raf;
function draw() {
	clearAll();
	drawRect();
	b1.drawBall();

	// update
	// b1.curX += velocity ** acceleration;
	b1.curX += velocity + Math.sqrt(2 * acceleration * (b1.curX - b1.startX));

	// make it go to start when it reaches end
	if (b1.curX > (width * 7) / 8) {
		b1.curX = b1.startX;
	}

	raf = window.requestAnimationFrame(draw);
}

function restart() {
	window.cancelAnimationFrame(raf); // this pauses ball from keeping on moving
	clearAll();
	drawRect();
	b1.curX = b1.startX;
	b1.drawBall();
}

startBtn1.addEventListener("click", function () {
	// move ball to the other side
	restart();
	velocity = Number(document.getElementById("moving_ball_velocity").value);
	acceleration = Number(
		document.getElementById("moving_ball_acceleration").value,
	);
	raf = window.requestAnimationFrame(draw);
});

stopBtn1.addEventListener("click", function () {
	window.cancelAnimationFrame(raf);
});

restartBtn1.addEventListener("click", function () {
	restart();
});

b1.drawBall();
