import { Ball } from "../physics/ball.js";
import { CueBall } from "../physics/ball.js";
import { drawTable } from "../render/drawTable.js";
import { drawAllBallsAtStartingPos } from "../render/drawBall.js";
import { drawAllBalls } from "../render/drawBall.js";
import { resolveCollision } from "../physics/collision.js";
import { wallDeflection } from "../physics/collision.js";
import { takeBallOffTable } from "../physics/collision.js";
import { changeDirections } from "../physics/ball.js";
import { resetBall } from "../physics/ball.js";

// VARIABLES
//--------------------------------------
const gameCanvas = document.getElementById("game_canvas");
const c = gameCanvas.getContext("2d");

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
let angleInRad = (Number(angle_degree.value) * Math.PI) / 180;

// score
let scoreOutput = document.getElementById("score");
let score = 0;
scoreOutput.innerHTML = score;

// error messages - show max 5
let errors = [];
let errorsCont = document.getElementById("errors_cont");

let currentRedBall = true; // if false, means player must hit a coloured ball

// canvas dimensions
const cWidth = gameCanvas.width;
const cHeight = gameCanvas.height;

// snooker table dimensions
const width = 700;
const height = 350;
const tableLeft = (cWidth - width) / 2;
const tableTop = (cHeight - height) / 2;
const pocketD = 10;

let gameState = "notStarted";

// message
const message = document.getElementById("message-box");
export function updateMsg(msg) {
	message.innerHTML = msg;
}
updateMsg("Press 'start game'");

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
let ballsPotted = [];

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
	drawTable(gameCanvas, tableLeft, tableTop, width, height, pocketD);
}
_drawTable();
drawAllBallsAtStartingPos(allBalls, gameCanvas);

// draw contents of table
function reframe() {
	clearAll();
	drawRect();
	_drawTable();
	drawAllBalls(ballsOnTable, c);
}

// draw the D a lighter colour
function reframeWithLightD() {
	clearAll();
	drawRect();
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

function projectionLine() {
	reframe();

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
	// remove the first/oldest error msg, as only 5 will be displays
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

// draws the projection line everytime the degree is updates
angle_degree.addEventListener("input", function () {
	angleInRad = (Number(angle_degree.value) * Math.PI) / 180;
	cueBall.direction = angleInRad;
	projectionLine();
});

// Angle - also for the cue ball
function calcValuesForCueBall() {
	deceleration = Number(decelerationI.value);
	cueBall.speed = Number(speedI.value);
	angleInRad = (Number(angle_degree.value) * Math.PI) / 180;
	cueBall.direction = angleInRad;

	let currentSpeed = Math.sqrt(Math.max(0, cueBall.speed ** 2));
	cueBall.velocityX = currentSpeed * Math.cos(cueBall.direction);
	cueBall.velocityY = currentSpeed * -Math.sin(cueBall.direction);
	changeDirections(cueBall);
}

let curBallCollisions = [];

let raf;
// animation
function draw() {
	reframe();

	// scan through the moving balls, and see what other balls they hit
	if (ballsOnTable.length > 1) {
		for (let i = 0; i < ballsOnTable.length - 1; i++) {
			for (let j = i + 1; j < ballsOnTable.length; j++) {
				resolveCollision(ballsOnTable[i], ballsOnTable[j], curBallCollisions);
			}
		}
	}

	// update the velocity vectors and the current location of the balls to make them move
	ballsOnTable.forEach((ball) => {
		if (ball.isMoving) {
			const speed = Math.hypot(ball.velocityX, ball.velocityY);
			const nextSpeed = speed + deceleration;

			const maxStep = 2;
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

	// remove potted balls from drawing UNLESS they are still in play (e.g. if reds are still present put colours back)
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
		projectionLine();
		checkRulesAfter();
	}
}

// EDGE CASES
function checkRulesAfter() {
	let scoreAddOn = 0;
	// update score
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
						// cue ball hit another ball and if that ball's points are higher than 4 then the fault is that
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
		// user must have hit a coloured (non-red ball)
	} else {
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
						// cue ball hit a red ball and if that ball's points are higher than 4 then the fault is that
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
	}

	if (wasAFault) {
		score -= faultPoints;
		currentRedBall = true;
	} else {
		score += scoreAddOn;
		currentRedBall = scoreAddOn > 0 ? !currentRedBall : true;
	}
	if (score < 0) score = 0;
	// update score
	scoreOutput.innerHTML = score;

	// checks if the game finished/won
	// if only one ball is left and it's the cue ball
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
function isCueBallWithinD(coords) {
	let x = coords[0];
	let y = coords[1];
	return (
		x < tableLeft + width / 5 &&
		Math.hypot(x - (tableLeft + width / 5), y - (tableTop + height / 2)) <
			height / 6
	);
}

// Moving the white ball
function dropCueBall() {
	// this func will be called when the game starts and when the white ball is potted in
	// this will paint the D, as a very light green implying to drop the white ball inside that,

	// put the cueBall backto the middle and redraw it.
	cueBall.curX = cueBall.startX;
	cueBall.curY = cueBall.startY;
	reframeWithLightD();
	cueBall.isMoving = false;

	updateMsg(
		"Click inside the 'D' to place the cue ball, then 'drop ball' to place it and continue the game. First ball must be a red.",
	);

	// and there will be a button to click, drop ball which will drop the ball and continue play
	// called 'ball in hand'
	// white ball will be in there and it is upto the user to move it to continue/start the game.
	// make this button visible to drop the ball

	// make button visible
	dropBtn.classList.remove("hidden");
}

dropBtn.addEventListener("click", function () {
	dropBtn.classList.add("hidden");
	gameState = "waitingForStrike";
	updateMsg("Hit the cue ball, be clicking 'strike ball'");
	// reset the table back to normal
	projectionLine();
});

gameCanvas.addEventListener("click", (e) => {
	if (gameState == "droppingCueBall") {
		let coords = getCoords(e);
		// only update the coordinates if the ball is inside the D
		if (isCueBallWithinD(coords)) {
			cueBall.curX = coords[0];
			cueBall.curY = coords[1];
			reframeWithLightD();
		}
	}
});

function startGame() {
	// draw everything
	projectionLine();

	gameState = "droppingCueBall";

	// drop cue ball
	dropCueBall();
	// updateMsg("Hit the cue ball, be clicking 'strike ball'");
}

// Buttons +  event handlers
// -------------------------
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
		raf = window.requestAnimationFrame(draw);
	}
});

// restart btn
restartBtn.addEventListener("click", function () {
	window.cancelAnimationFrame(raf);
	clearAll();
	_drawTable();
	updateMsg("Press 'start game' to play again");
	gameState = "notStarted";
	ballsOnTable = [...allBalls];
	ballsPotted = [];
	curBallCollisions = [];
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
