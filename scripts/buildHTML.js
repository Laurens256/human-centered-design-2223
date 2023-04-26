import { readClothingInfo } from './screenReader.js';
import { upperClothes, lowerClothes } from './clothes.js';

const initClothes = (target, clothesArr) => {
	const clothesFieldset = document.querySelector(
		`fieldset.${target}-clothes`
	);

	if (!clothesFieldset) return;
	const fragment = document.createDocumentFragment();

	clothesArr
		.sort((a, b) => {
			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();

			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;

			return 0;
		})
		.forEach((clothes) => {
			const { name, styles, attributes } = clothes;

			const label = createElement('label', { textContent: name, className: 'clothes' });

			const input = createElement(
				'input',
				{
					type: 'radio',
					name: `${target}`,
					value: name
				},
				{
					'data-styles': styles?.join(';'),
					'data-attributes': attributes?.join(';'),
					'data-name-nl': target === 'upper' ? 'bovenkleding' : 'onderkleding'
				}
			);

			input.addEventListener('keydown', readClothingInfo);
			input.addEventListener('change', generateSummary);

			label.appendChild(input);
			fragment.appendChild(label);
		});

	clothesFieldset.appendChild(fragment);
};

const generateSummary = (e) => {
	const target = e.target;

	const { name, value, dataset } = target;

	if (name === 'upper') {
		selectedUpper = upperClothes.find((clothes) => clothes.name === value) || null;
	} else {
		selectedLower = lowerClothes.find((clothes) => clothes.name === value) || null;
	}

	const li = document.querySelector(`li.selected-${name}`);
	if (li) {
		if (target.checked) {
			li.textContent = `${dataset.nameNl}: ${value}`;
		} else {
			li.textContent = `${dataset.nameNl}: niet gekozen`;
		}
	}
	checkIfMatches();
};

let selectedUpper = null;
let selectedLower = null;
const matchText = document.querySelector('p.matches');
const checkIfMatches = () => {
	let output = '';
	if (!selectedUpper || !selectedLower) {
		output = 'Selecteer eerst boven- en onderkleding';
	} else {
		const { styles: upperStyles } = selectedUpper;
		const { styles: lowerStyles } = selectedLower;

		const matchingStyles = upperStyles?.filter((attr) => lowerStyles?.includes(attr));

		if (matchingStyles?.length) {
			output = `Deze kledingstukken matchen met de volgende eigenschappen: ${matchingStyles.join(
				', '
			)}`;
		} else {
			output = 'De stijl van deze kledingstukken matched niet';
		}
	}
	matchText.textContent = output;
};

const createElement = (tagName, props, dataset) => {
	const element = document.createElement(tagName);
	Object.assign(element, props);
	if (dataset) {
		Object.keys(dataset).forEach((key) => {
			element.setAttribute(key, dataset[key]);
		});
	}
	return element;
};

export { initClothes };
