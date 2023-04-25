import { Clothes } from './types';
import { readClothingInfo } from './screenReader';
import { upperClothes, lowerClothes } from './clothes';

const initClothes = (target: 'upper' | 'lower', clothesArr: Clothes[]): void => {
	const clothesFieldset: HTMLFieldSetElement | null = document.querySelector(
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

const generateSummary = (e: Event) => {
	const target = e.target as HTMLInputElement;

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

let selectedUpper: Clothes | null = null;
let selectedLower: Clothes | null = null;
const matchText = document.querySelector('p.matches') as HTMLParagraphElement;
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

const createElement = (tagName: string, props?: any, dataset?: any) => {
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
