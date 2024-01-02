import gsap from 'gsap'
import { FC, ReactNode, useEffect, useRef } from 'react'
import Magnet from '../Magnet/Magnet'
import styles from './style.module.css'

interface RoundedButtonProps {
	children: ReactNode
	backgroundColor?: string
}

const RoundedButton: FC<RoundedButtonProps> = ({
	children,
	backgroundColor = '#9475F4',
	...attributes
}) => {
	const circle = useRef<HTMLDivElement | null>(null)
	const timeline = useRef<gsap.core.Timeline | null>(null)
	let timeoutId: null | number = null

	useEffect(() => {
		if (timeline.current) {
			timeline.current = gsap.timeline({ paused: true })
			timeline.current
				.to(
					circle.current,
					{ top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' },
					'enter'
				)
				.to(
					circle.current,
					{ top: '-150%', width: '125%', duration: 0.25 },
					'exit'
				)
		}
	}, [])

	const manageMouseEnter = () => {
		if (timeoutId) clearTimeout(timeoutId)
		if (timeline.current) {
			timeline.current.tweenFromTo('enter', 'exit')
		}
	}

	const manageMouseLeave = () => {
		if (timeline.current) {
			timeoutId = setTimeout(() => {
				timeline.current!.play()
			}, 300)
		}
	}

	return (
		<Magnet>
			<div
				className={styles.roundedButton}
				style={{ overflow: 'hidden', backgroundColor }}
				onMouseEnter={() => {
					manageMouseEnter()
				}}
				onMouseLeave={() => {
					manageMouseLeave()
				}}
				{...attributes}
			>
				{children}
				<div ref={circle} className={styles.circle}></div>
			</div>
		</Magnet>
	)
}

export default RoundedButton
