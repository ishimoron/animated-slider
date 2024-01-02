import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CatsState } from '../../types/Cats'
import {
	fetchCatDataDesc,
	fetchCatImage,
	fetchCatsData,
} from '../services/catsService'

const initialState: CatsState = {
	catsData: [],
	catImage: [],
}

export const fetchCatsDataAsync = createAsyncThunk(
	'cats/fetchCatsData',
	async () => {
		return fetchCatsData()
	}
)

export const fetchCatDataDescAsync = createAsyncThunk(
	'cats/fetchCatDataDesc',
	async (id: string) => {
		return fetchCatDataDesc(id)
	}
)

export const fetchCatImageAsync = createAsyncThunk(
	'cats/fetchCatImage',
	async (id: string) => {
		return fetchCatImage(id)
	}
)

export const catsReducer = createSlice({
	name: 'cats',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCatsDataAsync.pending, () => {
				console.log('loading data') // if necessary send to user ui message for ex react-toast or display loader
			})
			.addCase(fetchCatsDataAsync.fulfilled, (state, action) => {
				state.catsData = action.payload
			})
			.addCase(fetchCatsDataAsync.rejected, (_, action) => {
				console.error('Failed to fetch cats data:', action.error.message)
			})

			.addCase(fetchCatDataDescAsync.pending, () => {
				console.log('loading data') // if necessary send to user ui message for ex react-toast or display loader
			})
			.addCase(fetchCatDataDescAsync.fulfilled, (state, action) => {
				const index = state.catsData.findIndex(
					cat => cat.id === action.payload.id
				)
				if (index !== -1) {
					state.catsData[index] = action.payload
				} else {
					state.catsData.push(action.payload)
				}
			})
			.addCase(fetchCatDataDescAsync.rejected, (_, action) => {
				console.error('Failed to fetch cats data:', action.error.message)
			})

			.addCase(fetchCatImageAsync.pending, () => {
				console.log('loading data') // if necessary send to user ui message for ex react-toast or display loader
			})
			.addCase(fetchCatImageAsync.fulfilled, (state, action) => {
				state.catImage = action.payload
			})
			.addCase(fetchCatImageAsync.rejected, (_, action) => {
				console.error('Failed to fetch cats data:', action.error.message)
			})
	},
})

export default catsReducer.reducer
