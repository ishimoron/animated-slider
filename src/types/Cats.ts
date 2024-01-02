export interface CatBreed {
	id: string
	url: string
	width: number
	height: number
	breeds: BreedDetails[]
}

export interface CatImage {
	id: string
	url: string
	width: number
	height: number
}

export interface BreedDetails {
	[key: string]: string | number
}

export interface CatsState {
	catsData: CatBreed[]
	catImage: CatImage[]
}
