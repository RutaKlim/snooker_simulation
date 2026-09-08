// makes the balls be able to bounce off eacother
export function resolveCollision(ball, otherBall) {
	if (!ball.isMoving && !otherBall.isMoving) return;

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
}

export function takeBallOffTable(ball, ballsOnTable) {
	const index = ballsOnTable.indexOf(ball);
	if (index === -1) return;

	ball.isMoving = false;
	ballsOnTable.splice(index, 1);
}

function isInPocket(ball, tableTop, tableLeft, width, height, pocketD) {
	const pocketCenters = [
		[tableLeft + 5, tableTop + 5],
		[tableLeft + width / 2, tableTop],
		[tableLeft + width - 5, tableTop + 5],
		[tableLeft + width - 5, tableTop + height - 5],
		[tableLeft + width / 2, tableTop + height],
		[tableLeft + 5, tableTop + height - 5],
	];
	const pocketCaptureRadius = pocketD + ball.radius;

	return pocketCenters.some(([pocketX, pocketY]) => {
		return (
			Math.hypot(ball.curX - pocketX, ball.curY - pocketY) <=
			pocketCaptureRadius
		);
	});
}

// makes the balls bounce of the walls
export function wallDeflection(
	ballsOnTable,
	tableTop,
	tableLeft,
	pocketD,
	width,
	height,
) {
	const ballsToRemove = [];

	const ballRadius = ballsOnTable[0].radius;
	const topBorder = tableTop + pocketD + ballRadius;
	const bottomBorder = tableTop + height - pocketD - ballRadius;
	const leftBorder = tableLeft + pocketD + ballRadius;
	const rightBorder = tableLeft + width - pocketD - ballRadius;
	ballsOnTable.forEach((ball) => {
		// Capture only when the ball is close to one of the six pocket centers.
		if (isInPocket(ball, tableTop, tableLeft, width, height, pocketD)) {
			ballsToRemove.push(ball);
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
	// remove the balls
	ballsToRemove.forEach((ball) => {
		takeBallOffTable(ball, ballsOnTable);
	});
}
