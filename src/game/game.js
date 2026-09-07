import { Ball } from "../physics/ball.js";
import { CueBall } from "../physics/ball.js";
import { drawAllBallsAtStartingPos } from "../render/drawBall.js";
import { drawAllBalls } from "../render/drawBall.js";
import { drawTable } from "../render/drawTable.js";

// VARIABLES
//--------------------------------------
const gameCanvas = document.getElementById("game_canvas");
const c = gameCanvas.getContext("2d");

// buttons
const startBtn = document.getElementById("start_btn");
const restartBtn = document.getElementById("restart_btn");

// canvas dimensions
const cWidth = gameCanvas.width;
const cHeight = gameCanvas.height;

// snooker table dimensions
const width = 700;
const height = 350;

const tableLeft = (cWidth - width) / 2;
const tableTop = (cHeight - height) / 2;

let deceleration = document.getElementById("game_deceleration").value;

// cue ball
const cueBall = new CueBall(
	true,
	tableLeft + (width * 2) / 11, // temp rn
	tableTop + (height * 9) / 15, // temp rn
);

// coloured balls
// ------------------------------------
const yellowBall = new Ball(
	"orange",
	false,
	2,
	true,
	tableLeft + width / 5,
	tableTop + (height * 2) / 3,
);

const brownBall = new Ball(
	"saddlebrown",
	false,
	3,
	true,
	tableLeft + width / 5,
	tableTop + height / 2,
);

const greenBall = new Ball(
	"darkgreen",
	false,
	3,
	true,
	tableLeft + width / 5,
	tableTop + height / 3,
);

const blueBall = new Ball(
	"DodgerBlue",
	false,
	5,
	true,
	tableLeft + width / 2,
	tableTop + height / 2,
);

const pinkBall = new Ball(
	"hotpink",
	false,
	6,
	true,
	tableLeft + width * (3 / 4),
	tableTop + height / 2,
);

const blackBall = new Ball(
	"black",
	false,
	7,
	true,
	tableLeft + width * (10 / 11),
	tableTop + height / 2,
);

// red balls
//-----------------------------------
const redBall1 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16,
	tableTop + height / 2,
);
const redBall2 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 6 * Math.sqrt(3),
	tableTop + height / 2 - 6,
);
const redBall3 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 6 * Math.sqrt(3),
	tableTop + height / 2 + 6,
);
const redBall4 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	tableTop + height / 2,
);
const redBall5 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	tableTop + height / 2 - 12,
);
const redBall6 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	tableTop + height / 2 + 12,
);
const redBall7 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	tableTop + height / 2 - 6,
);
const redBall8 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	tableTop + height / 2 + 6,
);

const redBall9 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	tableTop + height / 2 - 18,
);
const redBall10 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	tableTop + height / 2 + 18,
);
const redBall11 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	tableTop + height / 2,
);
const redBall12 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	tableTop + height / 2 - 12,
);
const redBall13 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	tableTop + height / 2 + 12,
);
const redBall14 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	tableTop + height / 2 - 24,
);
const redBall15 = new Ball(
	"#d91002",
	true,
	1,
	true,
	tableLeft + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	tableTop + height / 2 + 24,
);

const objectBalls = [
	yellowBall,
	brownBall,
	greenBall,
	blueBall,
	pinkBall,
	blackBall,
	redBall1,
	redBall2,
	redBall3,
	redBall4,
	redBall5,
	redBall6,
	redBall7,
	redBall8,
	redBall9,
	redBall10,
	redBall11,
	redBall12,
	redBall13,
	redBall14,
	redBall15,
];
const allBalls = [cueBall].concat(objectBalls);
let ballsOnTable = [...allBalls];
// functions
// -----------------------

function clearAll() {
	c.clearRect(0, 0, cWidth, cHeight);
}

// draw rect
function drawRect() {
	c.strokeStyle = "wheat";
	c.strokeRect(0, 0, cWidth, cHeight);
}
drawRect();

// Draw table and balls in starting position
function _drawTable() {
	drawTable(gameCanvas, tableLeft, tableTop, width, height);
}
_drawTable();
drawAllBallsAtStartingPos(allBalls, gameCanvas);

// Angle - also for the cue ball
function calcValuesForCueBall() {
	cueBall.speed = Number(document.getElementById("game_speed").value);
	deceleration = Number(document.getElementById("game_deceleration").value);
	const angle_degree = Number(
		document.getElementById("game_angle_degrees").value,
	);
	cueBall.direction = (angle_degree * Math.PI) / 180;
	cueBall;
	cueBall.speed = document.getElementById("game_speed").value;

	let currentSpeed = Math.sqrt(Math.max(0, cueBall.speed ** 2));
	cueBall.velocityX = currentSpeed * Math.cos(cueBall.direction);
	cueBall.velocityY = currentSpeed * -Math.sin(cueBall.direction);
	changeDirections(cueBall);
}

// using the 'direction' value of the ball, make either velocity positive or negative
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

// makes the balls be able to bounce off eacother
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
	otherBall.curX += (normalX * overlap) / 2;
	ball.curX += (normalX * overlap) / 2;
	otherBall.curX -= (normalX * overlap) / 2;

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

const borderW = 10;
// makes the balls bounce of the walls
function wallDeflection() {
	ballsOnTable.forEach((ball) => {
		// X
		if (ball.curX < tableLeft + ball.radius + borderW) {
			ball.curX = tableLeft + ball.radius + borderW;
			ball.velocityX = Math.abs(ball.velocityX);
		} else if (ball.curX > tableLeft + width - ball.radius - borderW) {
			ball.curX = tableLeft + width - ball.radius - borderW;
			ball.velocityX = -Math.abs(ball.velocityX);
		}
		// Y
		if (ball.curY < tableTop + ball.radius + borderW) {
			ball.curY = tableTop + ball.radius + borderW;
			ball.velocityY = Math.abs(ball.velocityY);
		} else if (ball.curY > tableTop + height - ball.radius - borderW) {
			ball.curY = tableTop + height - ball.radius - borderW;
			ball.velocityY = -Math.abs(ball.velocityY);
		}
	});
}

let raf;
// animation
function draw() {
	clearAll();
	_drawTable();
	drawAllBalls(ballsOnTable, c);

	wallDeflection();

	// scan through the moving balls, and see what other balls they hit
	if (ballsOnTable.length > 1) {
		for (let i = 0; i < ballsOnTable.length - 1; i++) {
			for (let j = i + 1; j < ballsOnTable.length; j++) {
				resolveCollision(ballsOnTable[i], ballsOnTable[j]);
			}
		}
	}

	// update the velocity vectors and the current location of the balls to make them move
	ballsOnTable.forEach((ball) => {
		if (ball.isMoving) {
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

	// stop the animations when all balls on the table aren't moving
	if (ballsOnTable.some((ball) => ball.isMoving)) {
		raf = window.requestAnimationFrame(draw);
	} else {
		window.cancelAnimationFrame(raf);
	}
}

// Buttons +  event handlers
// -------------------------
startBtn.addEventListener("click", function () {
	if (!raf) {
		calcValuesForCueBall();
		cueBall.isMoving = true;
		raf = window.requestAnimationFrame(draw);
	}
});

restartBtn.addEventListener("click", function () {
	window.cancelAnimationFrame(raf);
	clearAll();
	_drawTable();
	ballsOnTable = [...allBalls];
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
	drawAllBallsAtStartingPos(ballsOnTable, gameCanvas);
	raf = undefined;
});
