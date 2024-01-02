import { MotionValue, motion, useSpring } from 'framer-motion'
import { FC, useEffect } from 'react'
import useMousePosition from '../../hooks/useMousePosition'
import styles from './style.module.css'

interface CursorProps {
	isHovered?: boolean
}

const Cursor: FC<CursorProps> = ({ isHovered }) => {
	const { x, y } = useMousePosition()
	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 }

	const springX: MotionValue<number> = useSpring(x ?? 0, smoothOptions)
	const springY: MotionValue<number> = useSpring(y ?? 0, smoothOptions)

	const updateMousePosition = (e: MouseEvent) => {
		const { clientX, clientY } = e
		springX.set(clientX)
		springY.set(clientY)
	}

	useEffect(() => {
		window.addEventListener('mousemove', updateMousePosition)
		return () => {
			window.removeEventListener('mousemove', updateMousePosition)
		}
	}, [springX, springY])

	const cursorSize = isHovered ? 100 : 40
	const scale = isHovered ? 2 : 1
	const left = springX.get() - cursorSize / 2
	const top = springY.get() - cursorSize / 2

	return (
		<motion.div
			style={{
				position: 'fixed',
				top,
				left,
				width: cursorSize,
				height: cursorSize,
				scale,
				transition: 'transform 0.2s ease',
			}}
			className={isHovered ? styles.cursorActive : styles.cursor}
		/>
	)
}

export default Cursor
