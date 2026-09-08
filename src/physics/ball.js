export class Ball {
	_radius = 6;
	_curX;
	_curY;
	_velocityX = 0;
	_velocityY = 0;
	_isMoving = false;
	_speed = 0;
	_direction = 0; // given in RADIANS
	_distanceTravelled = 0;
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
	get isMoving() {
		return this._isMoving;
	}
	get speed() {
		return this._speed;
	}
	get direction() {
		return this._direction;
	}
	get distanceTravelled() {
		return this._distanceTravelled;
	}
	get velocityX() {
		return this._velocityX;
	}
	get velocityY() {
		return this._velocityY;
	}

	// Setters
	set radius(radius) {
		this._radius = radius;
	}
	set curX(curX) {
		this._curX = curX;
	}
	set curY(curY) {
		this._curY = curY;
	}
	set isMoving(isMoving) {
		this._isMoving = isMoving;
	}
	set speed(speed) {
		this._speed = speed;
	}
	set direction(direction) {
		this._direction = direction;
	}
	set distanceTravelled(distanceTravelled) {
		this._distanceTravelled = distanceTravelled;
	}
	set velocityX(velocityX) {
		this._velocityX = velocityX;
	}
	set velocityY(velocityY) {
		this._velocityY = velocityY;
	}

	drawBall(c) {
		c.fillStyle = this._colour;
		c.beginPath();
		c.arc(this._curX, this._curY, this._radius, 0, Math.PI * 2, true);
		c.closePath();
		c.fill();
	}
}

export class CueBall extends Ball {
	_spinDirection = "middle";
	_spinPower = 1;
	_shotPower = 1;
	constructor(onTable, startX, startY) {
		super("white", false, 0, onTable, startX, startY);
	}

	// Getters
	get spinDirection() {
		return this._spinDirection;
	}
	get spinPower() {
		return this._spinPower;
	}
	get shotPower() {
		return this._shotPower;
	}

	// Setters
	set spinDirection(spinDirection) {
		this._spinDirection = spinDirection;
	}
	set spinPower(spinPower) {
		this._spinPower = spinPower;
	}
	set shotPower(shotPower) {
		this._shotPower = shotPower;
	}
}
