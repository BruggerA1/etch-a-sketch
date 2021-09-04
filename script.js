/* Initialization */
// Declare Constants
const gridContainer = document.getElementById('grid-container');

const sliderRange = document.getElementById('options-slider-range');
const sliderText = document.getElementById('options-slider-text');

const colorPicker = document.getElementById('options-color-picker');

const pencilButtonRadio = document.getElementById('radio-pencil-button');
const pencilButtonIcon = document.getElementById('radio-pencil-label');

const paintButtonRadio = document.getElementById('radio-paint-button');
const paintButtonIcon = document.getElementById('radio-paint-label');

const eraserButtonRadio = document.getElementById('radio-clear-button');
const eraserButtonIcon = document.getElementById('radio-clear-label');

const resetButton = document.getElementById('reset-grid');

let currentBrush, currentColor, gridCells;


// Declare Functions
function makeGrid(n) {
	let num = n * n;
	for (let i = 0; i < num; i++) {
		let gridCell = document.createElement('div');
		gridCell.classList.add('grid-cell', 'pointer');
		gridCell.addEventListener('click', fillGrid)
		gridContainer.appendChild(gridCell);
	}
	gridContainer.style.gridTemplateColumns = `repeat(${n},1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${n},1fr)`;

	updateBrush()
}

function clearGrid() {
	gridContainer.innerHTML = null;
}

function updateSliderText(e) {
	sliderText.innerText = `${sliderRange.value} x ${sliderRange.value}`;
}

function updateGrid(e) {
	clearGrid();
	makeGrid(e.target.value);
	toggle = false;
}

function togglePaint() {
	paintButtonIcon.classList.add('radioChecked');
	pencilButtonIcon.classList.remove('radioChecked');
	eraserButtonIcon.classList.remove('radioChecked');
}

function togglePencil() {
	paintButtonIcon.classList.remove('radioChecked');
	pencilButtonIcon.classList.add('radioChecked');
	eraserButtonIcon.classList.remove('radioChecked');
}

function toggleEraser() {
	paintButtonIcon.classList.remove('radioChecked');
	pencilButtonIcon.classList.remove('radioChecked');
	eraserButtonIcon.classList.add('radioChecked');
}

function checkRadio() {
	let radios = [pencilButtonRadio, paintButtonRadio, eraserButtonRadio];
	radios.forEach(radio => { if (radio.checked === true) { selectedRadio = radio; } });
	return selectedRadio.id;
}

function updateRadio(e) {
	currentBrush = checkRadio();
	updateColor(currentBrush);
	updateBrush();
	toggle = true;
	togglePaintBrush(e);
}

function updateColor(brush) {
	(brush === eraserButtonRadio.id) ? currentColor =
		'#e6e6e6' : currentColor = colorPicker.value;
}

function updateColorPicker() {
	currentColor = colorPicker.value;
}

function fillGrid(e) {
	e.target.style.backgroundColor = currentColor;
}

function resetGrid() {
	clearGrid();
	makeGrid(sliderRange.value);
}

function updateBrush() {
	gridCells = document.querySelectorAll('.grid-cell');
	switch (currentBrush) {
		case 'radio-pencil-button':
		case 'radio-clear-button':
			gridCells.forEach(cell => {
				cell.addEventListener('click', fillGrid);
			});
			gridCells.forEach(cell => {
				cell.removeEventListener('click', togglePaintBrush);
			});
			break;
		case 'radio-paint-button':
			gridCells.forEach(cell => {
				cell.removeEventListener('click', fillGrid);
			});
			gridCells.forEach(cell => {
				cell.addEventListener('click', togglePaintBrush);
			});
			break;
	}
}

let toggle = false;

function togglePaintBrush(e) {
	if (toggle == false) {
		e.target.style.backgroundColor = currentColor;
		gridCells.forEach(cell => {
			cell.addEventListener('mouseover', fillGrid);
		});
		toggle = true;
	}
	else {
		gridCells.forEach(cell => {
			cell.removeEventListener('mouseover', fillGrid);
		});
		toggle = false;
	}
}




// Event Listeners
sliderRange.addEventListener('change', updateGrid);

sliderRange.addEventListener('mousemove', updateSliderText);
sliderRange.addEventListener('touchmove', updateSliderText);

pencilButtonRadio.addEventListener('click', togglePencil);
paintButtonRadio.addEventListener('click', togglePaint);
eraserButtonRadio.addEventListener('click', toggleEraser);

pencilButtonRadio.addEventListener('change', updateRadio);
paintButtonRadio.addEventListener('change', updateRadio);
eraserButtonRadio.addEventListener('change', updateRadio);

colorPicker.addEventListener('change', updateColorPicker);

resetButton.addEventListener('click', resetGrid);

// Initialize GUI
sliderRange.min = 2;
sliderRange.max = 64;
sliderRange.value = 8;

colorPicker.value = '#ACACAC';

sliderText.innerText = `${sliderRange.value} x ${sliderRange.value}`;

pencilButtonRadio.checked = true;
pencilButtonIcon.classList.add('radioChecked');

currentColor = colorPicker.value;
currentBrush - pencilButtonRadio.id

makeGrid(sliderRange.value);