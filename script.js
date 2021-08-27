/* Initialization */
// declare constants
const gridContainer = document.getElementById('grid-container');
const sliderRange = document.getElementById('options-slider-range');
const sliderText = document.getElementById('options-slider-text');

// declare functions
function makeGrid(n) {
	let num = n * n;
	for (let i = 0; i < num; i++) {
		const gridCell = document.createElement('div');
		gridCell.classList.add('grid-cell');
		gridContainer.appendChild(gridCell);
	}
	gridContainer.style.gridTemplateColumns = `repeat(${n},1fr)`;
	gridContainer.style.gridTemplateRows = `repeat(${n},1fr)`;
}
function clearGrid() {
	gridContainer.innerHTML = null;
}

function updateSliderText(e) {
	sliderText.innerText = e.target.value;
	let text = sliderText.innerText;
}

function updateGrid(e) {
	clearGrid();
	makeGrid(e.target.value);
}

function hearEvents(element, listener, ...events) {
	events.forEach(event => element.addEventListener(event, listener));
}

// event listeners
hearEvents(sliderRange, updateGrid, 'mousemove', 'touchmove', 'change');
hearEvents(sliderRange, updateSliderText, 'mousemove', 'touchmove', 'change');

// initialize GUI
sliderRange.setAttribute('min', 2);
sliderRange.setAttribute('max', 24);
sliderRange.setAttribute('value', 8);

sliderText.innerText = sliderRange.value;

makeGrid(sliderRange.value);

