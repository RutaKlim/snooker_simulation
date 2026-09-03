import { Ball } from "../physics/ball.js";
import { drawAllBallsAtStartingPos } from "../render/drawBall.js";
import { drawTable } from "../render/drawTable.js";

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

const topLeftTableX = (cWidth - width) / 2;
const topLeftTableY = (cHeight - height) / 2;

const initialSpeed = document.getElementById("game_speed").value;
const deceleration = document.getElementById("game_deceleration").value;
// Angle - also for the cue ball
function calcDirectionForCueBall() {
	const angle_degree = Number(
		document.getElementById("game_angle_degrees").value,
	);
	// TODO FINISH HERE
	// changeDirections(cueBall);
}
calcDirectionForCueBall();

// coloured balls
// ------------------------------------
const yellowBall = new Ball(
	"orange",
	false,
	2,
	true,
	topLeftTableX + width / 5,
	topLeftTableY + (height * 2) / 3,
);

const brownBall = new Ball(
	"saddlebrown",
	false,
	3,
	true,
	topLeftTableX + width / 5,
	topLeftTableY + height / 2,
);

const greenBall = new Ball(
	"darkgreen",
	false,
	3,
	true,
	topLeftTableX + width / 5,
	topLeftTableY + height / 3,
);

const blueBall = new Ball(
	"DodgerBlue",
	false,
	5,
	true,
	topLeftTableX + width / 2,
	topLeftTableY + height / 2,
);

const pinkBall = new Ball(
	"hotpink",
	false,
	6,
	true,
	topLeftTableX + width * (3 / 4),
	topLeftTableY + height / 2,
);

const blackBall = new Ball(
	"black",
	false,
	7,
	true,
	topLeftTableX + width * (10 / 11),
	topLeftTableY + height / 2,
);

// red balls
//-----------------------------------
const redBall1 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16,
	topLeftTableY + height / 2,
);
const redBall2 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 6 * Math.sqrt(3),
	topLeftTableY + height / 2 - 6,
);
const redBall3 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 6 * Math.sqrt(3),
	topLeftTableY + height / 2 + 6,
);
const redBall4 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	topLeftTableY + height / 2,
);
const redBall5 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	topLeftTableY + height / 2 - 12,
);
const redBall6 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	topLeftTableY + height / 2 + 12,
);
const redBall7 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	topLeftTableY + height / 2 - 6,
);
const redBall8 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	topLeftTableY + height / 2 + 6,
);

const redBall9 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	topLeftTableY + height / 2 - 18,
);
const redBall10 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	topLeftTableY + height / 2 + 18,
);
const redBall11 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	topLeftTableY + height / 2,
);
const redBall12 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	topLeftTableY + height / 2 - 12,
);
const redBall13 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	topLeftTableY + height / 2 + 12,
);
const redBall14 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	topLeftTableY + height / 2 - 24,
);
const redBall15 = new Ball(
	"#d91002",
	true,
	1,
	true,
	topLeftTableX + width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	topLeftTableY + height / 2 + 24,
);

const balls = [
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
drawTable(gameCanvas, topLeftTableX, topLeftTableY, width, height);
drawAllBallsAtStartingPos(balls, gameCanvas);
