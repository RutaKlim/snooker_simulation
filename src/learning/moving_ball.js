// import { drawBall } from "../render/drawBall.js";

const canvas = document.getElementById("moving_ball_1");
const c = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

// temp
c.strokeStyle = "wheat";
c.strokeRect(0, 0, width, height);

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
		return this._startingPosX;
	}
	get startY() {
		return this._startingPosY;
	}
	get curX() {
		return this._curX;
	}
	get curY() {
		return this._curY;
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

function init() {
	window.requestAnimationFrame(draw);
}

const speed = 20;

function draw() {
	c.clearRect(0, 0, width, height); // clears rect
	b1.draw();
	// TODO
	// CARRY ON HERE BY ADDING HOW THE BALL MOVES
	// USING THIS LINK --> https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations
	b1.window.requestAnimationFrame(draw);
}

startBtn1.addEventListener("click", function () {
	// move ball to the other side
	window.requestAnimationFrame(draw);
});
