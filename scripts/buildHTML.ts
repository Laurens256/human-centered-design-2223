import { Clothes } from './types';


let currentFieldset: HTMLFieldSetElement | null = null;
const initClothes = (target: 'upper' | 'lower', clothes: Clothes[]): void => {
	const clothesFieldset: HTMLFieldSetElement | null = document.querySelector(
		`fieldset.${target}-clothes`
	);

	clothesFieldset?.addEventListener('focusin', (event) => {
		if (currentFieldset !== clothesFieldset) {
			console.log('nieuwe focus :0');
		}

		currentFieldset = clothesFieldset;
	});

	if (!clothesFieldset) return;

	const clothesHTML = clothes
		.sort((a, b) => {
			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();

			if (nameA < nameB) return -1;
			if (nameA > nameB) return 1;

			return 0;
		})
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

export { initClothes };
