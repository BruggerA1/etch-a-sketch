// Front End Declarations
// Grid
const gridContainer = document.getElementById('grid-container');

// Modes
const shadeCheckbox = document.getElementById('mode-shade-checkbox');
const shadeIcon = document.getElementById('mode-shade-button');

const rainbowCheckbox = document.getElementById('mode-rainbow-checkbox');
const rainbowIcon = document.getElementById('mode-rainbow-button');

// Color Picker
const colorPicker = document.getElementById('options-color-picker');

// Brushes
const pencilRadio = document.getElementById('radio-pencil-button');
const pencilIcon = document.getElementById('radio-pencil-icon');

const paintRadio = document.getElementById('radio-paint-button');
const paintIcon = document.getElementById('radio-paint-icon');

const eraserRadio = document.getElementById('radio-clear-button');
const eraserIcon = document.getElementById('radio-clear-icon');

// Slider
const sliderRange = document.getElementById('options-slider-range');
const sliderText = document.getElementById('options-slider-text');

// Reset
const resetButton = document.getElementById('reset-grid');

// Backend Declarations
const paintMode = ['standard', 'shade', 'rainbow'];
const brushRadio = [pencilRadio.id, paintRadio.id, eraserRadio.id];

// Initialize Objects
const shadeMode = {
	enabled: (shadeCheckbox.checked = false),
	toggle: () => {
		shadeMode.enabled = !shadeMode.enabled;
		shadeIcon.classList.toggle('boxChecked');
		rainbowMode.enabled = rainbowCheckbox.checked = false;
		rainbowIcon.classList.remove('boxChecked');

		shadeCheckbox.checked ? currentState.updateMode(paintMode[1])
			: rainbowCheckbox.checked ? currentState.updateMode(paintMode[2])
				: currentState.updateMode(paintMode[0]);
	},
};

const rainbowMode = {
	enabled: (rainbowCheckbox.checked = false),
	toggle: () => {
		rainbowMode.enabled = !rainbowMode.enabled;
		rainbowIcon.classList.toggle('boxChecked');
		shadeMode.enabled = shadeCheckbox.checked = false;
		shadeIcon.classList.remove('boxChecked');

		rainbowCheckbox.checked ? currentState.updateMode(paintMode[2])
			: shadeCheckbox.checked ? currentState.updateMode(paintMode[1])
				: currentState.updateMode(paintMode[0]);
	},
};

const colorObj = {
	default: '#ACACAC',
	color: (colorPicker.value = '#ACACAC'),
	updateColor: () => {
		colorObj.color = colorPicker.value.toUpperCase();
		currentState.updateColor(colorObj.color);
	},
};

const pencilButton = {
	enabled: (pencilRadio.checked = true),
	toggle: () => {
		pencilButton.enabled = !pencilButton.enabled;
		pencilIcon.classList.add('radioChecked');
		paintIcon.classList.remove('radioChecked');
		eraserIcon.classList.remove('radioChecked');
		currentState.updateBrush(brushRadio[0]);
		currentState.updateColor(colorObj.color);
		currentState.updatePainting(false);
	},
};

const paintButton = {
	enabled: (paintRadio.checked = false),
	toggle: () => {
		paintButton.enabled = !paintButton.enabled;
		pencilIcon.classList.remove('radioChecked');
		paintIcon.classList.add('radioChecked');
		eraserIcon.classList.remove('radioChecked');
		currentState.updateBrush(brushRadio[1]);
		currentState.updateColor(colorObj.color);
		currentState.updatePainting(true);
	},
};

const eraserButton = {
	enabled: (eraserRadio.checked = false),
	toggle: () => {
		eraserButton.enabled = !eraserButton.enabled;
		pencilIcon.classList.remove('radioChecked');
		paintIcon.classList.remove('radioChecked');
		eraserIcon.classList.add('radioChecked');
		currentState.updateBrush(brushRadio[2]);
		currentState.updateColor('#E6E6E6');
		currentState.updatePainting(false);
	},
};

const gridSlider = {
	min: (sliderRange.min = 2),
	max: (sliderRange.max = 24),
	value: (sliderRange.value = 8),
	init: () => {
		sliderText.innerText = `${gridSlider.value} x ${gridSlider.value}`;
	},
	update: () => {
		gridSlider.value = parseInt(sliderRange.value);
		sliderText.innerText = `${gridSlider.value} x ${gridSlider.value}`;
		currentState.updateGrid(gridSlider.value);
	},
};

const currentState = {
	mode: paintMode[0],
	color: colorObj.color,
	brush: brushRadio[0],
	grid: gridSlider.value,
	painting: false,
	init: () => {
		pencilButton.toggle();
	},
	updateMode: (mode) => {
		currentState.mode = mode;
	},
	updateColor: (color) => {
		currentState.color = color;
	},
	updateBrush: (brush) => {
		currentState.brush = brush;
	},
	updateGrid: (grid) => {
		currentState.grid = grid;
	},
	updatePainting: (painting) => {
		currentState.painting = painting;
		let gridCells = document.querySelectorAll('.grid-cell');
		if (painting == true) {
			gridCells.forEach(cell => {
				cell.removeEventListener('click', grid.fillGrid);
				cell.addEventListener('click', grid.paintGrid);
			});
			grid.toggle = false;
		}
		else {
			gridCells.forEach(cell => {
				cell.addEventListener('click', grid.fillGrid);
			});
			gridCells.forEach(cell => {
				cell.removeEventListener('mouseover', grid.fillGrid);
				cell.removeEventListener('click', grid.paintGrid);
			});
		}
	}
};

const grid = {
	container: gridContainer,
	dim: currentState.grid,
	toggle: false,
	init: (dim) => {
		let size = dim * dim;
		for (let i = 0; i < size; i++) {
			let gridCell = document.createElement('div');
			gridCell.style.backgroundColor = '#FFFFFF';
			gridCell.classList.add('grid-cell', 'pointer');
			grid.container.appendChild(gridCell);
			gridCell.addEventListener('click', grid.fillGrid);
		}
		grid.container.style.gridTemplateColumns = `repeat(${dim},1fr)`;
		grid.container.style.gridTemplateRows = `repeat(${dim},1fr)`;
	},
	clear: () => {
		grid.container.innerText = null;

	},
	update: (e) => {
		grid.dim = currentState.grid = e.target.value;
		grid.init(e.target.value);
		grid.reset();
	},
	reset: () => {
		grid.clear();
		init();
		switch(currentState.mode){
			case paintMode[0]:
				break;
			case paintMode[1]:
				shadeMode.toggle();
				break;
			case paintMode[2]:
				rainbowMode.toggle();
				break;
		}
		currentState.updateBrush(brushRadio[0]);
		currentState.updateMode(paintMode[0]);
		currentState.updateColor(colorObj.default);
		colorPicker.value = colorObj.default;
	},
	fillGrid: (e) => {
		if (currentState.brush == brushRadio[2]){
			e.target.style.backgroundColor = '#FFFFFF';
		}
		else{
			switch(currentState.mode){
				case (paintMode[0]):
					e.target.style.backgroundColor = currentState.color;
					break;
				case (paintMode[1]):
					let preColor = e.target.style.backgroundColor;
					let postColor = (preColor.slice(4, (preColor.length - 1))).split(",");
					e.target.style.backgroundColor = `rgb(${(parseInt(0.9*postColor[0]))}, ${(parseInt(0.9*postColor[1]))}, ${(parseInt(0.9*postColor[2]))})`;
					break;
				case (paintMode[2]):
					e.target.style.backgroundColor = `rgb(${Math.floor(256*Math.random())}, ${Math.floor(256*Math.random())}, ${Math.floor(256*Math.random())})`;
					break;
			}	
		}
	},
	paintGrid: (e) => {
		grid.toggle = !grid.toggle;
		if (grid.toggle == true) {
			let gridCells = document.querySelectorAll('.grid-cell');
			grid.fillGrid(e);
			gridCells.forEach(cell => {
				cell.addEventListener('mouseover', grid.fillGrid);
			});
		}
		if (grid.toggle == false) {
			let gridCells = document.querySelectorAll('.grid-cell');
			gridCells.forEach(cell => {
				cell.removeEventListener('mouseover', grid.fillGrid);
			});
		}
	}
};

function init() {
	currentState.init();
	gridSlider.init();
	grid.init(currentState.grid);

	shadeCheckbox.addEventListener('click', shadeMode.toggle);
	rainbowCheckbox.addEventListener('click', rainbowMode.toggle);

	colorPicker.addEventListener('change', colorObj.updateColor);

	pencilRadio.addEventListener('click', pencilButton.toggle);
	paintRadio.addEventListener('click', paintButton.toggle);
	eraserRadio.addEventListener('click', eraserButton.toggle);

	sliderRange.addEventListener('mousemove', gridSlider.update);
	sliderRange.addEventListener('change', grid.update);

	resetButton.addEventListener('click', grid.reset);

}

init();