import { loadHTML } from './buildHTML';

let queryElements;
const init = () => {
	loadHTML();

	queryElements = document.querySelectorAll('a[data-query]');
	queryElements.forEach((element) => {
		element.addEventListener('click', changeQuery);
	});

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

	if (query === 'stijl') {
		filterClothes(queryValue);
	}

	srSpeak(`geselecteerd: ${currentTarget.textContent}`, 'assertive');
	jumpToNextCategory(currentTarget);
};

const clearQuery = () => {
	window.history.replaceState(null, null, window.location.pathname);
};

// jump to next category after link is clicked
const jumpToNextCategory = (current) => {
	const nextParent = current.closest('.category').nextElementSibling;

	if (nextParent?.classList.contains('category')) {
		nextParent.querySelector('a[data-query]')?.focus();
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
};

const speakDiv = document.querySelector('div.speak');
// make screenreader speak
const srSpeak = (text, priority = 'polite') => {
	speakDiv.setAttribute('aria-live', priority);
	speakDiv.textContent = text;
};

init();
