class Ball {
	constructor(colour, isRed, points, onTable, startingPos, curPos) {
		this.colour = colour;
		this.isRed = isRed;
		this.points = points;
		this.onTable = onTable;
		this.startingPos = startingPos;
		this.curPos = curPos;
	}
}

class CueBall extends Ball {
	constructor(
		colour,
		onTable,
		startingPos,
		curPos,
		spinDirection,
		spinPower,
		shotPower,
	) {
		this.colour = colour;
		this.onTable = onTable;
		this.startingPos = startingPos;
		this.curPos = curPos;
		this.spinDirection = spinDirection;
		this.spinPower = spinPower;
		this.shotPower = shotPower;
	}
}
