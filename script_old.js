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

const shadeCheckbox = document.getElementById('mode-shade-checkbox');
const shadeIcon = document.getElementById('mode-shade-button');

const rainbowCheckbox = document.getElementById('mode-rainbow-checkbox');
const rainbowIcon = document.getElementById('mode-rainbow-button');

const modes = ['standard', 'shade', 'rainbow'];

const radios = [pencilButtonRadio, paintButtonRadio, eraserButtonRadio];

let currentBrush, currentColor, gridCells, toggleOn, mode;

// Declare Functions
function makeGrid(n) {
	let num = n * n;
	for (let i = 0; i < num; i++) {
		let gridCell = document.createElement('div');
		gridCell.classList.add('grid-cell', 'pointer');
		gridCell.addEventListener('click', fillGrid);
		gridContainer.appendChild(gridCell);
	}
	gridContainer.style.gridTemplateColumns = `repeat(${n},1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${n},1fr)`;

	updateBrush();
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
	toggleOn = false;
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
	let selectedRadio;
	radios.forEach(radio => {
		if (radio.checked === true) {
			selectedRadio = radio;
		}
	});
	return selectedRadio.id;
}

function updateRadio(e) {
	currentBrush = checkRadio();
	updateColor(currentBrush);
	updateBrush();
	toggleOn = true;
	togglePaintBrush(e);
}

function updateColor(brush) {
	brush === eraserButtonRadio.id
		? (currentState.updateColor('#e6e6e6'))
		: (currentState.updateColor(colorObj.value));
}

function updateColorPicker() {
	colorPicker = colorObj.value;
	currentState.updateColor(colorObj.value);
}

function fillGrid(e) {
	e.target.style.backgroundColor = colorPicker;
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
			gridCells.forEach((cell) => {
				cell.addEventListener('click', fillGrid);
			});
			gridCells.forEach((cell) => {
				cell.removeEventListener('click', togglePaintBrush);
			});
			break;
		case 'radio-paint-button':
			gridCells.forEach((cell) => {
				cell.removeEventListener('click', fillGrid);
			});
			gridCells.forEach((cell) => {
				cell.addEventListener('click', togglePaintBrush);
			});
			break;
	}
}

function togglePaintBrush(e) {
	if (toggleOn == false) {
		e.target.style.backgroundColor = colorPicker;
		gridCells.forEach((cell) => {
			cell.addEventListener('mouseover', fillGrid);
		});
		toggleOn = true;
	} else {
		gridCells.forEach((cell) => {
			cell.removeEventListener('mouseover', fillGrid);
		});
		toggleOn = false;
	}
}

function checkShadeBox() {
	rainbowCheckbox.checked = false;
	rainbowIcon.classList.remove('boxChecked');
	shadeCheckbox.checked ? shadeIcon.classList.add('boxChecked')
	: shadeIcon.classList.remove('boxChecked');
	updateMode();
}

function checkRainbowBox() {
	shadeCheckbox.checked = false;
	shadeIcon.classList.remove('boxChecked');
	rainbowCheckbox.checked ? rainbowIcon.classList.add('boxChecked')
	: rainbowIcon.classList.remove('boxChecked');
	updateMode();
}

function updateMode() {
	mode = (shadeCheckbox.checked) ? modes[1]
	: (rainbowCheckbox.checked) ? modes[2]
	: modes[0];
}

// Event Listeners
sliderRange.addEventListener('change', updateGrid);

sliderRange.addEventListener('change', updateSliderText);
sliderRange.addEventListener('mousemove', updateSliderText);
sliderRange.addEventListener('touchmove', updateSliderText);

pencilButtonRadio.addEventListener('click', togglePencil);
paintButtonRadio.addEventListener('click', togglePaint);
eraserButtonRadio.addEventListener('click', toggleEraser);

pencilButtonRadio.addEventListener('change', updateRadio);
paintButtonRadio.addEventListener('change', updateRadio);
eraserButtonRadio.addEventListener('change', updateRadio);

colorObj.addEventListener('change', (e) => {
	currentState.updateColor(e.target.value);
	colorObj.value = currentState.color;
});

resetButton.addEventListener('click', resetGrid);

shadeCheckbox.addEventListener('click', checkShadeBox);
rainbowCheckbox.addEventListener('click', checkRainbowBox);

// Initialize GUI
let gridSlider = {
	min: sliderRange.min = 2,
	max: sliderRange.max = 64,
	value: sliderRange.value = 8,
	updateSlider: newValue => {
		value = newValue;
	}
};

let currentState = {
	mode: modes[0],
	color: '#ACACAC',
	brush: currentBrush,
	grid: sliderRange.value,
	updateMode: newMode => {
		mode = newMode;
	},
	updateColor: newColor => {
		color = newColor;
	},
	updateMode: newMode => {
		mode = newMode;
	},
	updateGrid: newGrid => {
		grid = newGrid;
	}
};

console.log(currentState);


toggleOn = false;
//sliderRange.min = 2;
//sliderRange.max = 64;
//sliderRange.value = 8;

//colorPicker.value = '#ACACAC';

sliderText.innerText = `${sliderRange.value} x ${sliderRange.value}`;

pencilButtonRadio.checked = true;
pencilButtonIcon.classList.add('radioChecked');

colorPicker = colorObj.value;
currentBrush - pencilButtonRadio.id;

mode = modes[0];

makeGrid(sliderRange.value);
