import { upperClothes, lowerClothes } from './clothes';

const upperClothingContainer = document.querySelector('.upper-clothing-container');
const lowerClothingContainer = document.querySelector('.lower-clothing-container');

// load clothing html into DOM
const loadHTML = () => {
	const upperClothesHTML = upperClothes
		.map((item) => generateClothingHTML(item, 'bovenkleding'))
		.join('');

	const lowerClothesHTML = lowerClothes
		.map((item) => generateClothingHTML(item, 'onderkleding'))
		.join('');

	upperClothingContainer.insertAdjacentHTML('beforeend', upperClothesHTML);
	lowerClothingContainer.insertAdjacentHTML('beforeend', lowerClothesHTML);
};

// generate clothing html from template
const generateClothingHTML = (item, queryValue) => {
	const { name, styles, attributes, colors } = item;
	const slug = name.toLowerCase().replace(/\s/g, '-');
	const stylesString = styles.join(';');
	const attributesString = attributes.join(';');
	const colorsString = colors.join(', ');
	const colorsDataValue = colors.join(';');

	return `
	  <a href="#${slug}" class="clothing" data-query="${queryValue}" data-query-value="${slug}"
		data-styles="${stylesString}" data-attributes="${attributesString}" data-colors="${colorsDataValue}">
		${name}: ${colorsString}
	  </a>
	`;
};

export { loadHTML };
