export class Ball {
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

	get colour() {
		return this._colour;
	}

	get startingPos() {
		return [this._startingPosX, this._startingPosY];
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
