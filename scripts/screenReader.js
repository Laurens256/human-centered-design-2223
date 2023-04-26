const speakDiv = document.querySelector('div.speak');

const srSpeak = (text, priority = 'polite') => {
	speakDiv.setAttribute('aria-live', priority);
	speakDiv.textContent = text;
};

const readClothingInfo = (e) => {
	const target = e.target;

	if (e.key === 'q') {
		e.preventDefault();
		// get all styles and filter out empty strings
		const styles = (target.dataset.styles?.split(';') || []).filter((str) => str !== '');

		// generate the message for the screenreader
		const message =
			styles.length === 0
				? 'geen stijlen'
				: `stijl${styles?.length > 1 ? 'en' : ''}: ${styles?.join(', ')}`;

		srSpeak(message, 'assertive');
	} else if (e.key === 'a') {
		e.preventDefault();
		const attributes = (target.dataset.attributes?.split(';') || []).filter(
			(str) => str !== ''
		);

		const message =
			attributes.length === 0
				? 'geen eigenschappen'
				: `eigenschap${attributes?.length > 1 ? 'pen' : ''}: ${attributes?.join(', ')}`;

		srSpeak(message, 'assertive');
	}
};

export { srSpeak, readClothingInfo };
