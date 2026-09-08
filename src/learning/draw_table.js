import { Ball } from "../physics/ball.js";
import { drawAllBallsAtStartingPos } from "../render/drawBall.js";
import { drawTable } from "../render/drawTable.js";

// TEMP
const table = document.getElementById("table");
const width = table.width;
const height = table.height;

// coloured balls
// ------------------------------------
const yellowBall = new Ball(
	"orange",
	false,
	2,
	true,
	width / 5,
	(height * 2) / 3,
);

const brownBall = new Ball(
	"saddlebrown",
	false,
	3,
	true,
	width / 5,
	height / 2,
);

const greenBall = new Ball("darkgreen", false, 3, true, width / 5, height / 3);

const blueBall = new Ball("DodgerBlue", false, 5, true, width / 2, height / 2);

const pinkBall = new Ball(
	"hotpink",
	false,
	6,
	true,
	width * (3 / 4),
	height / 2,
);

const blackBall = new Ball(
	"black",
	false,
	7,
	true,
	width * (10 / 11),
	height / 2,
);

// red balls
//-----------------------------------
const redBall1 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16,
	height / 2,
);
const redBall2 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 6 * Math.sqrt(3),
	height / 2 - 6,
);
const redBall3 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 6 * Math.sqrt(3),
	height / 2 + 6,
);
const redBall4 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	height / 2,
);
const redBall5 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	height / 2 - 12,
);
const redBall6 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 12 * Math.sqrt(3),
	height / 2 + 12,
);
const redBall7 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	height / 2 - 6,
);
const redBall8 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	height / 2 + 6,
);

const redBall9 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	height / 2 - 18,
);
const redBall10 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 18 * Math.sqrt(3),
	height / 2 + 18,
);
const redBall11 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	height / 2,
);
const redBall12 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	height / 2 - 12,
);
const redBall13 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	height / 2 + 12,
);
const redBall14 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	height / 2 - 24,
);
const redBall15 = new Ball(
	"#d91002",
	true,
	1,
	true,
	width * (3 / 4) + 16 + 24 * Math.sqrt(3),
	height / 2 + 24,
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

// section which just draws out the table to show
const tableDrawing = document.getElementById("table_drawing");

// draw tables
drawTable(tableDrawing, 0, 0, tableDrawing.width, tableDrawing.height, 10);
drawTable(table, 0, 0, table.width, table.height, 10);

// draw balls
drawAllBallsAtStartingPos(balls, table);
drawAllBallsAtStartingPos(balls, tableDrawing);
