import { Ball } from "../physics/ball.js";
import { CueBall } from "../physics/ball.js";
import { drawTable } from "../render/drawTable.js";
import { drawAllBallsAtStartingPos } from "../render/drawBall.js";
import { drawAllBalls } from "../render/drawBall.js";
import { resolveCollision } from "../physics/collision.js";
import { wallDeflection } from "../physics/collision.js";
import { takeBallOffTable } from "../physics/collision.js";
import { changeDirections } from "../physics/ball.js";

// VARIABLES
//--------------------------------------
const gameCanvas = document.getElementById("game_canvas");
const c = gameCanvas.getContext("2d");

// buttons
const startBtn = document.getElementById("start_btn");
const restartBtn = document.getElementById("restart_btn");
const strikeBtn = document.getElementById("strike_btn");
const dropBtn = document.getElementById("drop_cue_ball_btn");

// canvas dimensions
const cWidth = gameCanvas.width;
const cHeight = gameCanvas.height;

// snooker table dimensions
const width = 700;
const height = 350;
const tableLeft = (cWidth - width) / 2;
const tableTop = (cHeight - height) / 2;
const pocketD = 10;

let deceleration = document.getElementById("game_deceleration").value;

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

let curBallCollisions = [];

let raf;
// animation
function draw() {
	clearAll();
	_drawTable();
	drawAllBalls(ballsOnTable, c);

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

			const maxStep = 6;
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
			}
		}
	});

	ballsPotted = wallDeflection(
		ballsOnTable,
		tableTop,
		tableLeft,
		pocketD,
		width,
		height,
		ballsPotted,
	);

	// remove potted balls from drawing
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
	}
}

function checkRulesAfter() {
	// checks if the game finished
	if (ballsOnTable.length == 1 && ballsOnTable.includes(cueBall)) {
		gameState = "finished";
		updateMsg("Game finished!");
		return;
	}

	// if white ball was potted
	if (ballsPotted.includes(cueBall)) {
		gameState = "dropping cue ball";
		dropCueBall();
		return;
	}

	// if wrong colour was hit but we implement that later
	// ----

	gameState = "waitingForStrike";
	updateMsg("Click 'strike ball");
}

// Moving the white ball
function dropCueBall() {
	// this func will be called when the game starts and when the white ball is potted in
	// this will paint the D, as a very light green implying to drop the white ball inside that,

	updateMsg(
		"Click inside the 'D' to place the cue ball, then 'drop ball' to place it and continue the game.",
	);

	// draw the D a lighter colour
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
	// and there will be a button to click, drop ball which will drop the ball and continue play
	// called 'ball in hand'
	// white ball will be in there and it is upto the user to move it to continue/start the game.
	// make this button visible to drop the ball

	// make button visible
	dropBtn.classList.remove("hidden");
	dropBtn.addEventListener("click", function () {
		dropBtn.classList.add("hidden");
		gameState = "waitingForStrike";
		updateMsg("Hit the cue ball, be clicking 'strike ball'");
	});

	if (gameState == "droppingCueBall") {
		gameCanvas.addEventListener("click", (e) => {
			let coords = getCoords(e);
			console.log(coords);
		});
	}
	// once button is clicked to agree to drop then repaint the table and the balls
}

function getCoords(e) {
	const pos = e.target.getBoundingClientRect();
	let x = e.clientX;
	let y = e.clientY;
	return [(x - pos.x) | 1, (y - pos.y) | 1];
}

function startGame() {
	// draw everything
	clearAll();
	_drawTable();
	drawAllBalls(ballsOnTable, c);

	gameState = "waitingForStrike";

	// drop cue ball
	dropCueBall();
	cueBall.isMoving = true;
	updateMsg("Hit the cue ball, be clicking 'strike ball'");
}

// main loop
// while (!gameFinished) {
// 	if (ballsOnTable.includes(cueBall) && ballsOnTable.length == 1) {
// 		gameFinished = true;
// 		break;
// 	}

// 	// draw() make balls move, then after that, implement any rules etc.
// 	if (ballsOnTable.every((ball) => !ball.isMoving)) {
// 		calcValuesForCueBall();
// 		cueBall.isMoving = true;
// 		raf = window.requestAnimationFrame(draw);
// 	}
// 	// now after the 'play' implement rules:
// 	// if cueBall was potted
// 	if (ballsPotted.includes(cueBall)) {
// 		dropCueBall();
// 		cueBall.isMoving = true;
// 	}

// 	// once rules applied, wait for the user to click strike ball to continue the game and reloop
// 	while (!strikeBtnClicked) {
// 		calcValuesForCueBall();
// 		cueBall.isMoving = true;
// 		raf = window.requestAnimationFrame(draw);
// 	}
// }

// // end game
// window.cancelAnimationFrame(raf); // dont know if this is really needed here
// updateMsg("Game finished!!");

// Buttons +  event handlers
// -------------------------
// start btn
startBtn.addEventListener("click", function () {
	if (!raf) {
		startGame();
	}
});

// strike btn
strikeBtn.addEventListener("click", function () {
	if (ballsOnTable.every((ball) => !ball.isMoving)) {
		if (gameState !== "waitingForStrike") return;

		calcValuesForCueBall();
		ballsPotted = [];
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
