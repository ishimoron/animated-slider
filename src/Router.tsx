// Routes.js
import { AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SliderDesc from './components/SliderDesc/SliderDesc'
import Home from './pages/Home/Home'
import Slider from './pages/Slider/Slider'

const Router: FC = () => {
	const location = useLocation()

	return (
		<AnimatePresence mode='wait'>
			<Routes location={location} key={location.pathname}>
				<Route index path='/' element={<Home />} />
				<Route path='/slider' element={<Slider />} />
				<Route path='/slider/:catId' element={<SliderDesc />} />
			</Routes>
		</AnimatePresence>
	)
}

export default Router
