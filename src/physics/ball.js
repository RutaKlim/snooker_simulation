export class Ball {
	_radius = 6;
	constructor(
		colour,
		isRed,
		points,
		onTable,
		startingPosX,
		startingPosY,
		curPos,
	) {
		this._colour = colour;
		this.isRed = isRed;
		this.points = points;
		this.onTable = onTable;
		this._startingPosX = startingPosX;
		this._startingPosY = startingPosY;
		this.curPos = curPos;
	}

	get radius() {
		return this._radius;
	}

	get colour() {
		return this._colour;
	}

	get startX() {
		return this._startingPosX;
	}

	get startY() {
		return this._startingPosY;
	}
}

export class CueBall extends Ball {
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
