import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
	FC,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import Cursor from '../../components/Cursor/Cursor'

import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { fetchCatsDataAsync } from '../../store/reducers/catsReducer'
import styles from './style.module.css'

const Slider: FC = () => {
	const dispatch = useAppDispatch()
	const { catsData } = useAppSelector(state => state.cats)

	const scrollRef = useRef<HTMLDivElement | null>(null)
	const ghostRef = useRef<HTMLDivElement | null>(null)
	const [scrollRange, setScrollRange] = useState(0)
	const [viewportW, setViewportW] = useState(0)
	const [isHovered, setIsHovered] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			if (!catsData.length) {
				await dispatch(fetchCatsDataAsync())
				await updateSlider()
			}
		}

		const updateSlider = () => {
			if (scrollRef.current) {
				setScrollRange(scrollRef.current.scrollWidth)
			}
		}

		const initializeSlider = async () => {
			await fetchData()
		}

		initializeSlider()

		const handleResize = () => {
			updateSlider()
			onResize([
				{
					contentRect: new DOMRect(0, 0, window.innerWidth, window.innerHeight),
					borderBoxSize: [
						{ inlineSize: window.innerWidth, blockSize: window.innerHeight },
					],
					contentBoxSize: [
						{ inlineSize: window.innerWidth, blockSize: window.innerHeight },
					],
					devicePixelContentBoxSize: [
						{ inlineSize: window.innerWidth, blockSize: window.innerHeight },
					],
					target: document.body,
				},
			])
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [dispatch, scrollRef])

	useLayoutEffect(() => {
		if (scrollRef.current && scrollRef.current.scrollWidth) {
			setScrollRange(scrollRef.current.scrollWidth)
		}
	}, [scrollRef, dispatch])

	const onResize = useCallback((entries: ResizeObserverEntry[]) => {
		for (const entry of entries) {
			const { width } = entry.contentRect
			setViewportW(width)
		}
	}, [])

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => onResize(entries))
		if (ghostRef.current) {
			resizeObserver.observe(ghostRef.current)
		}
		return () => resizeObserver.disconnect()
	}, [onResize])

	const { scrollYProgress } = useScroll()
	const transform = useTransform(
		scrollYProgress,
		[0, 1],
		[0, -scrollRange + viewportW]
	)
	const physics = { damping: 15, mass: 0.27, stiffness: 15 }
	const spring = useSpring(transform, physics)

	return (
		<>
			{catsData && (
				<div className={styles.sliderContainer}>
					<Cursor isHovered={isHovered} />
					<motion.div className={styles.scrollContainer}>
						<motion.section
							ref={scrollRef}
							style={{ x: spring }}
							className={styles.thumbnailsContainer}
						>
							{catsData.map(image => (
								<Link to={image.id} key={image.id}>
									<motion.img
										onMouseEnter={() => setIsHovered(true)}
										onMouseLeave={() => setIsHovered(false)}
										src={image.url}
										alt={image.id}
										className={styles.images}
									/>
								</Link>
							))}
							+
						</motion.section>
					</motion.div>
					<div
						ref={ghostRef}
						style={{ height: scrollRange }}
						className={styles.ghost}
					/>
				</div>
			)}
		</>
	)
}

export default Slider
