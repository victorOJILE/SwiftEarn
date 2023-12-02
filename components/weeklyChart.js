import loader from './loader.js';

export default function chartComp(uid) {
	let data = [
		{ day: 'Mon', count: 120 },
		{ day: 'Tue', count: 90 },
		{ day: 'Wed', count: 150 },
		{ day: 'Thu', count: 200 },
		{ day: 'Fri', count: 160 },
		{ day: 'Sat', count: 110 },
		{ day: 'Sun', count: 80 }
	];
	
	if (!data || !data.length) {
		return loader();
	}
	
	const chart = cEl('div', { class: 'border-2 border bg-8' }, loader());
	
	try {
 	setTimeout(() => renderWeeklyDataChart(chart, data), 500);
 	window.addEventListener('resize', () => renderWeeklyDataChart(chart, data));
	} catch(e) {
	 console.log(e.stack);
	}
 
	return chart;
}

function renderWeeklyDataChart(mainElem, data) {
	mainElem.empty();
	const width = mainElem.clientWidth || 340;
	const height = Math.min(Math.max(window.innerWidth / 2, 400), 300);

	const canvas = cEl('canvas');
	canvas.width = width;
	canvas.height = height;

	mainElem.append(canvas);
	const offscreenCanvas = document.createElement('canvas');
	offscreenCanvas.width = width;
	offscreenCanvas.height = height;

	const ctx = offscreenCanvas.getContext('2d');
	const mainctx = canvas.getContext('2d');

	const high = Math.max(...data.map(obj => obj.count)) * 1.5;
	const px = height / (high + 40);
	const candlePos = [];
	const xVals = [],
		yVals = [];

	function render() {
		ctx.fillStyle = 'royalblue';
		ctx.strokeStyle = 'royalblue';
		ctx.lineWidth = 2;
		ctx.beginPath();
		let incr = (width - 40) / 7;

		for (let i = 0, j = 32; i < 8; i++, j += incr) {
			xVals.push(j);
		}

		iter(data, obj =>	yVals.push((high - obj.count) * px));

		ctx.moveTo(xVals[0], yVals[0]);

		for (let i = 1; i < data.length; i++) {
			ctx.lineTo(xVals[i], yVals[i]);
		}
		ctx.stroke();

		ctx.strokeStyle = 'lightgray';
		// Draw left line
		ctx.beginPath();
		ctx.moveTo(32, 0);
		ctx.lineTo(32, height - 20);
		ctx.stroke();

		// Draw bottom line
		ctx.beginPath();
		ctx.moveTo(32, high * px);
		ctx.lineTo(width, high * px);
		ctx.stroke();

		// Draw points circles
		for (let i = 0; i < data.length; i++) {
			ctx.beginPath();
			ctx.arc(xVals[i], yVals[i], 4, 0, 2 * Math.PI);
			ctx.fill();
		}

		ctx.fillStyle = 'gray';
		// Draw count labels on the left
		let labelIncr = high / 8;
		ctx.font = '12px Arial';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'right';
		for (let i = 0, j = 0; i < 8; i++, j += labelIncr) {
			ctx.fillText(Math.floor(j) + '-', 30, (high - Math.floor(j)) * px);
		}

		// Draw day of the week
		ctx.textBaseline = 'bottom';
		ctx.textAlign = 'center';
		for (let i = 0; i < data.length; i++) {
			ctx.fillText(data[i].day, xVals[i], height - 8);
		}

		mainctx.drawImage(offscreenCanvas, 0, 0);
	}

	function showTooltip(day) {
		mainctx.clearRect(0, 0, canvas.width, canvas.height);
		mainctx.drawImage(offscreenCanvas, 0, 0);
		mainctx.strokeStyle = 'whitesmoke';
		mainctx.beginPath();
		mainctx.fillStyle = 'whitesmoke';
		mainctx.fillRect(xVals[day] - (40 / 2), yVals[day] - 40, 40, 40);
		mainctx.fillStyle = 'black';
		mainctx.font = '12px Arial sans-serif';
		mainctx.textAlign = 'center';
		mainctx.lineWidth = 2;
		mainctx.fillText(data[day].count, xVals[day], yVals[day] - 15);
	}

	canvas.addEventListener('click', function(event) {
		const rect = canvas.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const candleIndex = xVals.findIndex(x => x >= mouseX);
		if (candleIndex - 1 < 0) return showTooltip(0);
		showTooltip(candleIndex - 1);
	});
	
	render();
}