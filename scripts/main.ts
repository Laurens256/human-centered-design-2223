import { upperClothes, lowerClothes } from './clothes';
import { Clothes } from './types';

const init = () => {
	initClothes('upper', upperClothes);
	initClothes('lower', lowerClothes);
};

const initClothes = (target: 'upper' | 'lower', clothes: Clothes[]): void => {
	const clothesFieldset: HTMLFieldSetElement | null = document.querySelector(
		`fieldset.${target}-clothes`
	);

	if (!clothesFieldset) return;

	const sortedClothes = clothes.sort((a, b) => {
		const nameA = a.name.toLowerCase();
		const nameB = b.name.toLowerCase();

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;

		return 0;
	});

	const clothesHTML = sortedClothes
		.map((clothes) => {
			const { name, styles, attributes } = clothes;

			return `
				<label>${name}
					<input type="radio" name="${target}_clothes" 
					value="${name}" 
					data-styles="${styles?.join(';')}" 
					data-attributes="${attributes?.join(';')}"/>
				</label>`;
		})
		.join('');

	clothesFieldset.insertAdjacentHTML('beforeend', clothesHTML);
};

init();
