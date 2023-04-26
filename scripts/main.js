import { upperClothes, lowerClothes } from './clothes.js';
import { initClothes } from './buildHTML.js';
import { srSpeak } from './screenReader.js';

const init = () => {
	initClothes('upper', upperClothes);
	initClothes('lower', lowerClothes);
	document.addEventListener('keydown', (e) => {
		if (e.key === 'w') {
			e.preventDefault();
			srSpeak(
				'druk op q om stijlen van geselecteerde kleding te horen, a om de eigenschappen te horen',
				'assertive'
			);
		}
	});

	const filterCheckboxes = document.querySelectorAll(
		'input[type="checkbox"][name="stijl_filter"]'
	);

	filterCheckboxes.forEach((checkbox) => {
		checkbox.addEventListener('change', filterClothes);
	});
};

let selectedFilters = new Set();
const filterClothes = (e) => {
	const target = e.target;
	const { value } = target;

	target.checked ? selectedFilters.add(value) : selectedFilters.delete(value);
	const allClothes = document.querySelectorAll('label.clothes');

	allClothes.forEach((clothes) => {
		// check if any of the dataset styles, are in the selectedFilters set
		const input = clothes.querySelector('input');
		const { dataset } = input;

		if (dataset.styles?.split(';').some((style) => selectedFilters.has(style)) || selectedFilters.size === 0) {
			clothes.classList.remove('hidden');
		} else {
			clothes.classList.add('hidden');
			input.checked = false;
			input.dispatchEvent(new Event('change'));
		}
	});
};

init();
