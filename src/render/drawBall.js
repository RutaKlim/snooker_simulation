export function drawAllBallsAtStartingPos(balls, table) {
	const c = table.getContext("2d");

	balls.forEach((ball) => {
		drawBall(ball.colour, ball.startingPos[0], ball.startingPos[1], c);
	});
}

function drawBall(colour, x, y, c) {
	c.fillStyle = colour;
	c.beginPath();
	c.arc(x, y, 6, 0, Math.PI * 2, true);
	c.fill();
}
