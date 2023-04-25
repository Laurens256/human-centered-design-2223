import { upperClothes, lowerClothes } from './clothes';
import { initClothes } from './buildHTML';
import { srSpeak } from './screenReader';

const init = () => {
	initClothes('upper', upperClothes);
	initClothes('lower', lowerClothes);
	document.addEventListener('keydown', (e) => {
		if (e.ctrlKey) {
			e.preventDefault();
			srSpeak(
				'druk op q om stijlen van geselecteerde kleding te horen, a om de eigenschappen te horen',
				'assertive'
			);
		}
	});
};

init();
