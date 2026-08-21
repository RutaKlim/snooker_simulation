export function drawAllBallsAtStartingPos(balls, table) {
	const c = table.getContext("2d");
	balls.forEach((ball) => {
		drawBallAtStartingPos(ball, c);
	});
}

export function drawBallAtStartingPos(ball, c) {
	drawBallSpec(ball.colour, ball.startX, ball.startY, c);
}

function drawBallSpec(colour, x, y, c) {
	c.fillStyle = colour;
	c.beginPath();
	c.arc(x, y, 6, 0, Math.PI * 2, true);
	c.closePath();
	c.fill();
}

export function drawAllBalls(balls, c) {
	balls.forEach((ball) => {
		drawBall(ball, c);
	});
}

export function drawBall(ball, c) {
	c.fillStyle = ball.colour;
	c.beginPath();
	c.arc(ball.curX, ball.curY, ball.radius, 0, Math.PI * 2, true);
	c.closePath();
	c.fill();
}
