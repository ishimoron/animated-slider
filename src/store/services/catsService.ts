export const fetchCatsData = async () => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		'x-api-key':
			'live_qDCu0AOfp8aZw5AmV7qxoRieGM4KSSu7AN9Kg6WuViA2aDIcPZVOxYCdcuCoXjHq',
	})

	const requestOptions: RequestInit = {
		method: 'GET',
		headers: headers,
		redirect: 'follow',
	}

	try {
		const response = await fetch(
			'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10',
			requestOptions
		)
		const data = await response.json()
		return data
	} catch (error) {
		throw new Error(error as string)
	}
}

export const fetchCatDataDesc = async (id: string) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		'x-api-key':
			'live_qDCu0AOfp8aZw5AmV7qxoRieGM4KSSu7AN9Kg6WuViA2aDIcPZVOxYCdcuCoXjHq',
	})

	const requestOptions: RequestInit = {
		method: 'GET',
		headers: headers,
		redirect: 'follow',
	}

	try {
		const response = await fetch(
			`https://api.thecatapi.com/v1/images/${id}`,
			requestOptions
		)
		const data = await response.json()
		return data
	} catch (error) {
		throw new Error(error as string)
	}
}

export const fetchCatImage = async (id: string) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
		'x-api-key':
			'live_qDCu0AOfp8aZw5AmV7qxoRieGM4KSSu7AN9Kg6WuViA2aDIcPZVOxYCdcuCoXjHq',
	})

	const requestOptions: RequestInit = {
		method: 'GET',
		headers: headers,
		redirect: 'follow',
	}

	try {
		const response = await fetch(
			`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`,
			requestOptions
		)
		const data = await response.json()
		return data
	} catch (error) {
		throw new Error(error as string)
	}
}
