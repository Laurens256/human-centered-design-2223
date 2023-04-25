const speakDiv = document.querySelector('div.speak') as HTMLDivElement;

const srSpeak = (text: string, priority: 'polite' | 'assertive' = 'polite') => {
	// const speakDiv = document.createElement("div");
	speakDiv.setAttribute('aria-live', priority);

	speakDiv.textContent = text;
};

export { srSpeak };