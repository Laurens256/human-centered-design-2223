import { Clothes } from './types';

const upperClothes: Clothes[] = [
	{
		name: 'zachte blouse',
		styles: ['casual'],
		attributes: ['zacht', 'dun', 'luchtig']
	},
	{
		name: 'dikke trui',
		styles: ['casual'],
		attributes: ['zacht', 'dik', 'warm']
	}
];

const lowerClothes: Clothes[] = [
	{
		name: 'korte broek',
		styles: ['casual', 'sportief'],
		attributes: ['zacht', 'dun', 'luchtig']
	},
	{
		name: 'lange broek',
		styles: ['casual', 'formeel'],
		attributes: ['zacht', 'dik', 'warm']
	}
];

export { upperClothes, lowerClothes };
