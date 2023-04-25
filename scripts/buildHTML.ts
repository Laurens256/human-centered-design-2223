import { Clothes } from './types';
import { readClothingInfo } from './screenReader';

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

			const label = createElement('label', { textContent: name });

			const input = createElement(
				'input',
				{
					type: 'radio',
					name: `${target}_clothes`,
					value: name
				},
				{
					'data-styles': styles?.join(';'),
					'data-attributes': attributes?.join(';')
				}
			);

			input.addEventListener('keydown', readClothingInfo);

			label.appendChild(input);
			fragment.appendChild(label);
		});

	clothesFieldset.appendChild(fragment);
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
