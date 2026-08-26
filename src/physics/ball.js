export class Ball {
	_radius = 6;
	_curX;
	_curY;
	_dirX = 1;
	_dirY = 1;
	_isMoving = false;
	constructor(colour, isRed, points, onTable, startX, startY) {
		this._colour = colour;
		this._isRed = isRed;
		this._points = points;
		this._onTable = onTable;
		this._startX = startX;
		this._startY = startY;
		this._curX = startX;
		this._curY = startY;
	}

	// Getters
	get radius() {
		return this._radius;
	}
	get colour() {
		return this._colour;
	}
	get isRed() {
		return this._isRed;
	}
	get onTable() {
		return this._onTable;
	}
	get startX() {
		return this._startX;
	}
	get startY() {
		return this._startY;
	}
	get curX() {
		return this._curX;
	}
	get curY() {
		return this._curY;
	}
	get dirX() {
		return this._dirX;
	}
	get dirY() {
		return this._dirY;
	}
	get isMoving() {
		return this._isMoving;
	}

	// Setters
	set radius(radius) {
		this._radius = radius;
	}
	set dirX(dirX) {
		this._dirX = dirX;
	}
	set dirY(dirY) {
		this._dirY = dirY;
	}
	set isMoving(isMoving) {
		this._isMoving = isMoving;
	}

	drawBall(c) {
		c.fillStyle = this._colour;
		c.beginPath();
		c.arc(this._curX, this._curY, this._radius, 0, Math.PI * 2, true);
		c.fill();
	}
}

export class CueBall extends Ball {
	constructor(
		onTable,
		startX,
		startY,
		curX,
		curY,
		spinDirection,
		spinPower,
		shotPower,
	) {
		super("white", false, 0, onTable, startX, startY, curX, curY);
		this.spinDirection = spinDirection;
		this.spinPower = spinPower;
		this.shotPower = shotPower;
	}
}
