export function drawTable(table, originX, originY, tableWidth, tableHeight) {
	const c = table.getContext("2d");
	// 12 * 6 ft
	// i did 600 * 300 px

	const width = tableWidth;
	const height = tableHeight;

	// table
	c.fillStyle = "green";
	c.fillRect(originX, originY, width, height);

	// lines
	//------------------------------------------------
	c.strokeStyle = "#ccc";

	// baulk line
	c.beginPath();
	c.lineWidth = 0.5;
	c.moveTo(originX + width / 5, originY);
	c.lineTo(originX + width / 5, originY + height);
	c.stroke();

	// D line
	c.beginPath();
	c.arc(
		originX + width / 5,
		originY + height / 2,
		height / 6,
		Math.PI * 1.5,
		Math.PI / 2,
		true,
	);
	c.stroke();

	// faint locations of where the coloured balls go
	//------------------------------------------------
	c.fillStyle = "#999";

	function drawDot(x, y) {
		c.beginPath();
		c.arc(originX + x, originY + y, 2, 0, Math.PI * 2, true);
		c.fill();
	}

	// 1. yellow
	drawDot(width / 5, (height * 2) / 3);
	// 2. green
	drawDot(width / 5, height / 3);
	// 3. brown
	drawDot(width / 5, height / 2);
	// 4. blue
	drawDot(width / 2, height / 2);
	// 5. pink
	drawDot(width * (3 / 4), height / 2);
	// 6. black
	drawDot(width * (10 / 11), height / 2);
}
