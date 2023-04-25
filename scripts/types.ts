type Clothes = {
	name: string;
	styles?: Styles[];
	attributes?: Attributes[];
}
type Styles = 'formeel' | 'casual' | 'sportief';
type Attributes = 'zacht' | 'hard' | 'dik' | 'dun' | 'warm' | 'luchtig';

export { Clothes };