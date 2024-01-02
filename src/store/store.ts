import { configureStore } from '@reduxjs/toolkit'
import catsReducer from './reducers/catsReducer'

export const store = configureStore({
	reducer: {
		cats: catsReducer
	},
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch