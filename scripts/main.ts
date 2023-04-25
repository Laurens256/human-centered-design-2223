import { upperClothes, lowerClothes } from './clothes';
import { initClothes } from './buildHTML';

const init = () => {
	initClothes('upper', upperClothes);
	initClothes('lower', lowerClothes);
};

init();
