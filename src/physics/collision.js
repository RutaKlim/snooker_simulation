// makes the balls be able to bounce off eacother
export function resolveCollision(ball, otherBall, curBallCollisions) {
	if (!ball.isMoving && !otherBall.isMoving) return;

	const dx = otherBall.curX - ball.curX;
	const dy = otherBall.curY - ball.curY;
	const distance = Math.hypot(dx, dy);
	const minDistance = ball.radius + otherBall.radius;

	if (distance === 0 || distance >= minDistance) return;

	const angle = Math.atan2(dy, dx);
	const normalX = Math.cos(angle);
	const normalY = Math.sin(angle);
	const overlap = minDistance - distance;

	// Separate the balls so the same impact is not resolved repeatedly.
	ball.curX -= (normalX * overlap) / 2;
	ball.curY -= (normalY * overlap) / 2;
	otherBall.curX += (normalX * overlap) / 2;
	otherBall.curY += (normalY * overlap) / 2;

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
	ball.isMoving = true;
	otherBall.isMoving = true;

	curBallCollisions.push([ball, otherBall]);
}

export function takeBallOffTable(ball, ballsOnTable) {
	ballsOnTable[ballsOnTable.indexOf(ball)] =
		ballsOnTable[ballsOnTable.length - 1];
	ball.isMoving = false;
	ballsOnTable.pop();
}

// makes the balls bounce of the walls or be potted
export function wallDeflection(
	ballsOnTable,
	tableTop,
	tableLeft,
	pocketD,
	width,
	height,
	ballsPotted,
) {
	const ballRadius = ballsOnTable[0].radius;
	const topBorder = tableTop + pocketD + ballRadius;
	const bottomBorder = tableTop + height - pocketD - ballRadius;
	const leftBorder = tableLeft + pocketD + ballRadius;
	const rightBorder = tableLeft + width - pocketD - ballRadius;
	ballsOnTable.forEach((ball) => {
		// POCKETS
		if (
			ball.curX < leftBorder - pocketD ||
			ball.curX > rightBorder + pocketD ||
			ball.curY < topBorder - pocketD ||
			ball.curY > bottomBorder + pocketD
		) {
			if (!ballsPotted.includes(ball)) {
				ballsPotted.push(ball);
			}
		} else {
			// X
			if (
				ball.curY >= topBorder + pocketD - 3 &&
				ball.curY <= bottomBorder - pocketD + 3
			) {
				if (ball.curX <= leftBorder) {
					// left wall
					ball.curX = leftBorder;
					ball.velocityX = Math.abs(ball.velocityX);
				} else if (ball.curX >= rightBorder) {
					// right wall
					ball.curX = rightBorder;
					ball.velocityX = -Math.abs(ball.velocityX);
				}
			}

			// Y
			if (
				(ball.curX >= leftBorder + pocketD - 3 &&
					ball.curX <= tableLeft + width / 2 - ballRadius - pocketD + 6) ||
				(ball.curX >= tableLeft + width / 2 + ballRadius + pocketD - 6 &&
					ball.curX <= rightBorder - pocketD + 3)
			) {
				// top wall
				if (ball.curY <= topBorder) {
					ball.curY = topBorder;
					ball.velocityY = Math.abs(ball.velocityY);
				} else if (ball.curY >= bottomBorder) {
					// bottom wall
					ball.curY = bottomBorder;
					ball.velocityY = -Math.abs(ball.velocityY);
				}
			}
		}
	});
}
