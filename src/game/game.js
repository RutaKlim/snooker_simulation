import { Ball } from "../physics/ball.js";
import { CueBall } from "../physics/ball.js";
import { drawTable } from "../render/drawTable.js";
import { drawAllBallsAtStartingPos } from "../render/drawBall.js";
import { drawAllBalls } from "../render/drawBall.js";
import { resolveCollision } from "../physics/collision.js";
import { wallDeflection } from "../physics/collision.js";
import { changeDirections } from "../physics/ball.js";
import { resetBall } from "../physics/ball.js";

// VARIABLES
//--------------------------------------
const gameCanvas = document.getElementById("game_canvas");
const c = gameCanvas.getContext("2d");

// canvas dimensions
const cWidth = gameCanvas.width;
const cHeight = gameCanvas.height;

// snooker table dimensions
const width = 700;
const height = 350;
const tableLeft = (cWidth - width) / 2;
const tableTop = (cHeight - height) / 2;
const pocketD = 10;

// buttons
const startBtn = document.getElementById("start_btn");
const restartBtn = document.getElementById("restart_btn");
const strikeBtn = document.getElementById("strike_btn");
const dropBtn = document.getElementById("drop_cue_ball_btn");

// inputs
let speedI = document.getElementById("game_speed");
let decelerationI = document.getElementById("game_deceleration");
let deceleration = Number(decelerationI.value);
let angle_degree = document.getElementById("game_angle_degrees");
let angleInRad = toRad(Number(angle_degree.value));

let canMoveAngle = true;

// score
let scoreOutput = document.getElementById("score");
let score = 0;
scoreOutput.innerHTML = score;

let gameState = "notStarted";

// whether user must hit red or coloured ball
let currentRedBall = true;

// error messages - max 5 at a time
let errors = [];
let errorsCont = document.getElementById("errors_cont");

let curBallCollisions = [];

// instruction message
const message = document.getElementById("message-box");
function updateMsg(msg) {
	message.innerHTML = msg;
}

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

const greenBall = new Ball(
	"darkgreen",
	false,
	3,
	true,
	tableLeft + width / 5,
	tableTop + height / 3,
);

const brownBall = new Ball(
	"saddlebrown",
	false,
	4,
	true,
	tableLeft + width / 5,
	tableTop + height / 2,
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
let ballsPotted = [];

// functions
// ------------------------------------

// converts degrees to radians
function toRad(degree) {
	return (degree * Math.PI) / 180;
}

function clearAll() {
	c.clearRect(0, 0, cWidth, cHeight);
}

// draw border
function drawBorder() {
	c.beginPath();
	c.strokeStyle = "wheat";
	c.strokeRect(0, 0, cWidth, cHeight);
}
drawBorder();

// draw table
function _drawTable() {
	drawTable(gameCanvas, tableLeft, tableTop, width, height, pocketD);
}
// draw table and balls in starting position
_drawTable();
drawAllBallsAtStartingPos(allBalls, gameCanvas);

// redraw canvas content
function redraw() {
	clearAll();
	drawBorder();
	_drawTable();
	drawAllBalls(ballsOnTable, c);
}

// draw the canvas content but D as a lighter colour
function redrawWithLightD() {
	clearAll();
	drawBorder();
	_drawTable();

	c.fillStyle = "#80b370";
	c.beginPath();
	c.fillStyle = c.arc(
		tableLeft + width / 5,
		tableTop + height / 2,
		height / 6,
		Math.PI * 1.5,
		Math.PI / 2,
		true,
	);
	c.fill();
	drawAllBalls(ballsOnTable, c);
}

// draws the projection line from the cue ball
function projectionLine() {
	redraw();

	let d = 1000;
	c.beginPath();
	c.strokeStyle = "white";
	c.moveTo(cueBall.curX, cueBall.curY);
	c.lineTo(
		cueBall.curX + d * Math.cos(angleInRad),
		cueBall.curY - d * Math.sin(angleInRad),
	);
	c.stroke();
}

// updates and prints the new errors
function newError(msg) {
	errors.unshift(msg);
	// remove the first/oldest error msg, as only 5 will be displayed
	if (errors.length > 5) errors.pop();
	errorsCont.replaceChildren();
	errors.forEach((error) => {
		const msg = document.createElement("li");
		msg.innerHTML = `😭 ${error}`;
		errorsCont.append(msg);
	});
	// make the first/latest most visible
	errorsCont.firstChild.classList.add("text-xl");
	errorsCont.firstChild.classList.add("text-red-600");
	errorsCont.firstChild.classList.add("mb-1");
	errorsCont.firstChild.classList.add("-ml-1");
}

// draws the projection line everytime the degree input is updated
angle_degree.addEventListener("input", function () {
	angleInRad = toRad(Number(angle_degree.value));
	cueBall.direction = angleInRad;
	projectionLine();
});

// updates the cue ball with values from the inputs
function calcValuesForCueBall() {
	deceleration = Number(decelerationI.value);
	cueBall.speed = Number(speedI.value) < 15 ? Number(speedI.value) : 15;
	cueBall.direction = angleInRad;

	let currentSpeed = Math.sqrt(Math.max(0, cueBall.speed ** 2));
	cueBall.velocityX = currentSpeed * Math.cos(cueBall.direction);
	cueBall.velocityY = currentSpeed * -Math.sin(cueBall.direction);
	changeDirections(cueBall);
}

// animation while balls moving
let raf;
function draw() {
	redraw();

	// resolve any ball collisions
	if (ballsOnTable.length > 1) {
		for (let i = 0; i < ballsOnTable.length - 1; i++) {
			for (let j = i + 1; j < ballsOnTable.length; j++) {
				resolveCollision(ballsOnTable[i], ballsOnTable[j], curBallCollisions);
			}
		}
	}

	// updates the velocity vectors and current coordinates of the balls to make them move
	ballsOnTable.forEach((ball) => {
		if (ball.isMoving) {
			const speed = Math.hypot(ball.velocityX, ball.velocityY);
			const nextSpeed = speed + deceleration;

			// steps added so that on high speeds, the balls don't exceed their boundaries
			const maxStep = 3;
			const steps = Math.ceil(speed / maxStep);

			if (speed < 0.001 || nextSpeed < 0.001) {
				ball.velocityX = 0;
				ball.velocityY = 0;
				ball.isMoving = false;
				return;
			}

			const scale = nextSpeed / speed;

			ball.velocityX *= scale;
			ball.velocityY *= scale;

			for (let step = 0; step < steps; step++) {
				ball.curX += ball.velocityX / steps;
				ball.curY += ball.velocityY / steps;
				wallDeflection(
					ballsOnTable,
					tableTop,
					tableLeft,
					pocketD,
					width,
					height,
					ballsPotted,
				);
			}
		}
	});

	// remove potted balls from table UNLESS they are still in play
	// (e.g.if reds are still present then put colours back on table, otherwise no)
	ballsPotted.forEach((ball) => {
		if (ballsOnTable.includes(ball)) {
			ballsOnTable.splice(ballsOnTable.indexOf(ball), 1);
		}
	});

	// stop the animations when all balls on the table aren't moving
	if (ballsOnTable.some((ball) => ball.isMoving)) {
		raf = window.requestAnimationFrame(draw);
	} else {
		// end of play
		window.cancelAnimationFrame(raf);
		checkRulesAfter();
		projectionLine();
	}
}

// EDGE CASES + RULES
function checkRulesAfter() {
	let scoreAddOn = 0;
	let wasAFault = false;
	let faultPoints = 4;
	// user must have hit and potted a red ball
	if (currentRedBall) {
		ballsPotted.forEach((ball) => {
			if (ball.isRed) {
				scoreAddOn++;
			} else {
				wasAFault = true;
				if (ball == cueBall) {
					// did not hit any balls and cue ball went straight into pocket
					if (curBallCollisions.length == 0) {
						faultPoints = 4;
						newError(
							`Did not hit any ball, and cue ball potted, 4 points deducted.`,
						);
					} else {
						// cue ball hit another ball and if that ball's points are higher than 4 then the fault is that ball's points
						let points = curBallCollisions[0][1].points;
						faultPoints = points > faultPoints ? points : faultPoints;
						newError(
							`Cue ball was potted, and an invalid (non-red) ball was hit, ${faultPoints} points deducted.`,
						);
					}
					// potted a coloured ball
				} else {
					faultPoints = ball.points > faultPoints ? ball.points : faultPoints;
					newError(
						`Potted a coloured ball when was meant to pot a red ball, ${faultPoints} points deducted.`,
					);
				}
			}
		});
		// fault if first ball of contact is not a red
		if (
			!wasAFault &&
			curBallCollisions.length > 0 &&
			curBallCollisions[0][0] == cueBall &&
			!curBallCollisions[0][1].isRed
		) {
			wasAFault = true;
			faultPoints =
				curBallCollisions[0][1].points > faultPoints
					? curBallCollisions[0][1].points
					: faultPoints;
			newError(
				`Cueball's first contact was a coloured (non-red) ball, ${faultPoints} deducted.`,
			);
		}
	} else {
		// user must have potted a coloured (non-red ball)
		ballsPotted.forEach((ball) => {
			// potting more than one colour is a foul
			if (!ball.isRed && ballsPotted.length == 1) {
				scoreAddOn += ball.points;
			} else {
				wasAFault = true;
				if (ball == cueBall) {
					// did not hit any balls and cue ball went straight into pocket
					if (curBallCollisions.length == 0) {
						faultPoints = 4;
						newError(
							`Did not hit any ball, and cue ball potted, 4 points deducted.`,
						);
					} else {
						// cue ball hit a red ball and if that ball's points are higher than 4 then the fault is that ball's points
						let points = curBallCollisions[0][1].points;
						faultPoints = points > faultPoints ? points : faultPoints;
						newError(
							`Cue ball was potted, and an invalid (red) ball was hit, ${faultPoints} points deducted.`,
						);
					}
					// potted a coloured ball
				} else {
					faultPoints = ball.points > faultPoints ? ball.points : faultPoints;
					newError(
						`Potted a red ball, when was meant to pot a coloured ball, ${faultPoints} points deducted.`,
					);
				}
			}
		});
		// fault if first ball of contact is a red
		if (
			!wasAFault &&
			curBallCollisions.length > 0 &&
			curBallCollisions[0][0] == cueBall &&
			curBallCollisions[0][1].isRed
		) {
			wasAFault = true;
			faultPoints =
				curBallCollisions[0][1].points > faultPoints
					? curBallCollisions[0][1].points
					: faultPoints;

			newError(
				`Cueball's first contact was a red ball, ${faultPoints} points deducted.`,
			);
		}
	}

	// updating the score
	if (wasAFault) {
		score -= faultPoints;
		currentRedBall = true;
	} else {
		score += scoreAddOn;
		currentRedBall = scoreAddOn == 0 ? true : !currentRedBall;
	}
	if (score < 0) score = 0;
	scoreOutput.innerHTML = score;

	// checks if the game finished/won and if only one ball remains and it's the cue ball
	if (
		(ballsOnTable.length == 1 && ballsOnTable.includes(cueBall)) ||
		ballsOnTable.length == 0
	) {
		gameState = "finished";
		updateMsg("Game finished!");
		return;
	}

	// if white ball was potted, and there is still balls on the table
	if (ballsPotted.includes(cueBall) && ballsOnTable.length >= 1) {
		gameState = "droppingCueBall";
		ballsOnTable.push(cueBall);
		calcValuesForCueBall();
		dropCueBall();
		return;
	}

	// add coloured balls back to the table, if there are still reds remaining
	if (ballsOnTable.some((ball) => ball.isRed)) {
		ballsPotted.forEach((ball) => {
			if (!ball.isRed) {
				resetBall(ball);
				ballsOnTable.push(ball);
				drawAllBalls(ballsOnTable, c);
			}
		});
	}

	gameState = "waitingForStrike";
	updateMsg(
		`Click 'strike ball' to pot a ${currentRedBall ? "red" : "coloured (non-red)"} ball`,
	);
}

function getCoords(e) {
	const pos = e.target.getBoundingClientRect();
	let x = e.clientX;
	let y = e.clientY;
	return [(x - pos.x) | 1, (y - pos.y) | 1];
}

// returns boolean - true if coordinate is within the D
function isCueBallWithinD(coords) {
	let x = coords[0];
	let y = coords[1];
	return (
		x < tableLeft + width / 5 &&
		Math.hypot(x - (tableLeft + width / 5), y - (tableTop + height / 2)) <
			height / 6
	);
}

// moving the cue ball to drop it within the D
function dropCueBall() {
	// put the cueBall back to the middle and redraw it.
	cueBall.curX = cueBall.startX;
	cueBall.curY = cueBall.startY;
	redrawWithLightD();
	cueBall.isMoving = false;

	updateMsg(
		"Click inside the 'D' to place the cue ball, then 'drop ball' to place it and continue the game. First ball must be a red.",
	);

	// make drop button visible
	dropBtn.classList.remove("hidden");
}

dropBtn.addEventListener("click", function () {
	dropBtn.classList.add("hidden");
	gameState = "waitingForStrike";
	updateMsg("Hit a red ball, be clicking 'strike ball'");
	projectionLine();
});

// updates the cue ball to where the click was
gameCanvas.addEventListener("click", (e) => {
	if (gameState == "droppingCueBall") {
		let coords = getCoords(e);
		if (isCueBallWithinD(coords)) {
			cueBall.curX = coords[0];
			cueBall.curY = coords[1];
			redrawWithLightD();
		}
	}
});

// for moving the mouse
gameCanvas.addEventListener("mousemove", (e) => {
	if (gameState == "waitingForStrike" && canMoveAngle) {
		let mouse = getCoords(e);
		angleInRad = Math.atan2(cueBall.curY - mouse[1], mouse[0] - cueBall.curX);
		cueBall.direction = angleInRad;

		projectionLine();
	}
});

// click to toggle to keep the projection line fixed
gameCanvas.addEventListener("click", () => {
	if (gameState == "waitingForStrike") {
		canMoveAngle = !canMoveAngle;
	}
});

function startGame() {
	projectionLine();
	gameState = "droppingCueBall";
	dropCueBall();
}

// start btn
startBtn.addEventListener("click", function () {
	if (!raf && gameState == "notStarted") {
		startGame();
	}
});

// strike btn
strikeBtn.addEventListener("click", function () {
	if (ballsOnTable.every((ball) => !ball.isMoving)) {
		if (gameState !== "waitingForStrike") return;
		calcValuesForCueBall();
		ballsPotted = [];
		curBallCollisions = [];
		cueBall.isMoving = true;
		gameState = "ballsMoving";
		canMoveAngle = true;
		raf = window.requestAnimationFrame(draw);
	}
});

// restart btn
restartBtn.addEventListener("click", function () {
	window.cancelAnimationFrame(raf);
	clearAll();
	drawBorder();
	_drawTable();
	updateMsg("Press 'start game' to play again");
	gameState = "notStarted";
	ballsOnTable = [...allBalls];
	ballsPotted = [];
	curBallCollisions = [];
	errors = [];
	errorsCont.replaceChildren();
	ballsOnTable.forEach((ball) => {
		ball.curX = ball.startX;
		ball.curY = ball.startY;
		ball.velocityX = 0;
		ball.velocityY = 0;
		ball.distanceTravelled = 0;
		ball.speed = 0;
		ball.isMoving = false;
		ball.direction = 0;
	});
	drawAllBalls(ballsOnTable, c);
	raf = undefined;
});
