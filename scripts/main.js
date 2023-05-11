import { loadHTML } from './buildHTML';

let queryElements;
const init = () => {
	loadHTML();

	queryElements = document.querySelectorAll('a[data-query]');
	queryElements.forEach((element) => {
		element.addEventListener('click', changeQuery);
	});

	// make sure no filters or query are active on page load
	window.addEventListener('load', () => {
		clearQuery();
	});
};

// change url query on link click
const changeQuery = (e) => {
	e.preventDefault();
	const currentTarget = e.currentTarget;
	const { query, queryValue } = currentTarget.dataset;

	const urlParams = new URLSearchParams(window.location.search);
	urlParams.set(query, queryValue);

	window.history.replaceState(null, null, `${window.location.pathname}?${urlParams}`);

	// if the changed query is stijl, clothing should be filtered
	if (query === 'stijl') {
		filterClothes(queryValue);
	} else if (urlParams.has('bovenkleding') && urlParams.has('onderkleding')) {
		readResults(urlParams);
	}

	srSpeak(`geselecteerd: ${currentTarget.textContent}`, 'assertive');
	jumpToNextCategory(currentTarget);
};

const currentFilterSpans = document.querySelectorAll('span.current-filter');
// clear url query and reset any active filters
const clearQuery = () => {
	window.history.replaceState(null, null, window.location.pathname);
	filterClothes('');
	setCurrentFilter();
};

// jump to next category after link is clicked, need to test if screenreader correctly reads out the selected item before the next category is read
const jumpToNextCategory = (current) => {
	const nextParent = current.closest('.category').nextElementSibling;

	if (nextParent?.classList.contains('category')) {
		nextParent.querySelector('a[data-query]:not(.hidden)')?.focus();
	}
};

// check if there's overlap in the selection and read it out
const readResults = (urlParams) => {
	const upper = document.querySelector(
		`a[data-query="bovenkleding"][data-query-value="${urlParams.get('bovenkleding')}"]`
	);

	const lower = document.querySelector(
		`a[data-query="onderkleding"][data-query-value="${urlParams.get('onderkleding')}"]`
	);

	if (!upper || !lower) return;

	const upperStyles = upper.dataset.styles.split(';') || [];
	const lowerStyles = lower.dataset.styles.split(';') || [];

	const upperAttributes = upper.dataset.attributes.split(';') || [];
	const lowerAttributes = lower.dataset.attributes.split(';') || [];

	const upperColors = upper.dataset.colors.split(';') || [];
	const lowerColors = lower.dataset.colors.split(';') || [];

	const stylesOverlap = upperStyles.some((style) => lowerStyles.includes(style));
	const attributesOverlap = upperAttributes.some((attribute) =>
		lowerAttributes.includes(attribute)
	);
	const colorsOverlap = upperColors.some((color) => lowerColors.includes(color));

	const overlap = [];
	if (stylesOverlap) overlap.push('stijl');
	if (attributesOverlap) overlap.push('kenmerk');
	if (colorsOverlap) overlap.push('kleur');

	if (overlap.length === 0) {
		srSpeak('geen overlap in huidige selectie', 'assertive');
	} else {
		srSpeak(`overlap in huidige selectie: ${overlap.join(', ')}`, 'assertive');
	}
};

// filter clothes based on style, hidden class gets hidden using css which also hides the element from screenreaders
const filterClothes = (filter) => {
	queryElements.forEach((element) => {
		if (element.dataset.query !== 'stijl') {
			const styles = element.dataset.styles?.split(';') || [];

			if (styles.includes(filter) || filter === '') {
				element.classList.remove('hidden');
			} else {
				element.classList.add('hidden');
			}
		}
	});
	setCurrentFilter(filter);
};

// set current filter in the span so the screenreader can read it out
const setCurrentFilter = (filter = 'geen') => {
	currentFilterSpans.forEach((span) => {
		span.textContent = filter;
	});
};

const speakDiv = document.querySelector('div.speak');
// make screenreader speak
const srSpeak = (text, priority = 'polite') => {
	speakDiv.setAttribute('aria-live', priority);
	speakDiv.textContent = text;
};

init();
