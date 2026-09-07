export function drawTable(table, originX, originY, tableWidth, tableHeight) {
	const c = table.getContext("2d");
	// 12 * 6 ft
	// i did 600 * 300 px

	const width = tableWidth;
	const height = tableHeight;

	const pocketR = 10;
	const borderW = 22;

	// cushion rail
	c.fillStyle = "#4f3611";
	c.beginPath();
	c.moveTo(originX - borderW, originY);
	c.quadraticCurveTo(
		originX - borderW,
		originY - borderW,
		originX,
		originY - borderW,
	);
	c.lineTo(originX + tableWidth, originY - borderW);
	c.quadraticCurveTo(
		originX + tableWidth + borderW,
		originY - borderW,
		originX + tableWidth + borderW,
		originY,
	);
	c.lineTo(originX + tableWidth + borderW, originY + tableHeight);
	c.quadraticCurveTo(
		originX + tableWidth + borderW,
		originY + tableHeight + borderW,
		originX + tableWidth,
		originY + tableHeight + borderW,
	);
	c.lineTo(originX, originY + tableHeight + borderW);
	c.quadraticCurveTo(
		originX - borderW,
		originY + tableHeight + borderW,
		originX - borderW,
		originY + tableHeight,
	);
	c.lineTo(originX - borderW, originY);
	c.fill();

	// pocket padding colours

	// table
	c.fillStyle = "green";
	c.fillRect(originX, originY, width, height);

	// borders
	// -----------------------------
	// top left
	c.strokeStyle = "white";
	c.beginPath();
	c.moveTo(originX + pocketR, originY - 2);
	c.lineTo(15 + originX + pocketR, originY + 10);
	c.lineTo(originX + tableWidth / 2 - pocketR - 3, originY + 10);
	c.lineTo(originX + tableWidth / 2 - pocketR, originY);

	// top right
	c.moveTo(originX + tableWidth / 2 + pocketR, originY);
	c.lineTo(originX + tableWidth / 2 + pocketR + 3, originY + 10);
	c.lineTo(originX + tableWidth - 15 - pocketR, originY + 10);
	c.lineTo(originX + tableWidth - pocketR - 3, originY);

	// right
	c.moveTo(originX + tableWidth + 3, originY + pocketR);
	c.lineTo(originX + tableWidth - pocketR, originY + pocketR + 15);
	c.lineTo(
		originX + tableWidth - pocketR,
		originY + tableHeight - 15 - pocketR,
	);
	c.lineTo(originX + tableWidth + 3, originY + tableHeight - pocketR);

	// bottom right
	c.moveTo(originX + tableWidth / 2 + pocketR, originY + tableHeight);
	c.lineTo(originX + tableWidth / 2 + pocketR + 3, originY + tableHeight - 10);
	c.lineTo(originX + tableWidth - 15 - pocketR, originY + tableHeight - 10);
	c.lineTo(originX + tableWidth - pocketR - 3, originY + tableHeight);

	// bottom left
	c.strokeStyle = "white";
	c.moveTo(originX + pocketR, originY + tableHeight + 2);
	c.lineTo(15 + originX + pocketR, originY + tableHeight - 10);
	c.lineTo(originX + tableWidth / 2 - pocketR - 3, originY + tableHeight - 10);
	c.lineTo(originX + tableWidth / 2 - pocketR, originY + tableHeight);

	// left
	c.moveTo(originX - 3, originY + pocketR);
	c.lineTo(originX + pocketR, originY + pocketR + 15);
	c.lineTo(originX + pocketR, originY + tableHeight - 15 - pocketR);
	c.lineTo(originX - 3, originY + tableHeight - pocketR);

	// ---
	c.stroke();

	// pockets
	function drawPocket(x, y) {
		c.fillStyle = "black";
		c.beginPath();
		c.arc(originX + x, originY + y, pocketR, 0, Math.PI * 2, true);
		c.fill();
	}
	drawPocket(0 + 5, 0 + 5);
	drawPocket(tableWidth / 2, 0);
	drawPocket(tableWidth - 5, 0 + 5);
	drawPocket(tableWidth - 5, tableHeight - 5);
	drawPocket(tableWidth / 2, tableHeight);
	drawPocket(0 + 5, tableHeight - 5);

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
