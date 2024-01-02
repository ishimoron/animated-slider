import { motion } from 'framer-motion'
import { FC } from 'react'
import styles from './style.module.css'

const withTransition = (Component: FC) => {
	return () => (
		<motion.div>
			<motion.div
				className={styles.slideIn}
				initial={{ scaleY: 1 }}
				animate={{ scaleY: 0 }}
				exit={{ scaleY: 1 }}
				transition={{ duration: 1, ease: [0.6, 0.05, 0.28, 0.91] }}
			/>
			<motion.div
				className={styles.slideOut}
				initial={{ scaleY: 1 }}
				animate={{ scaleY: 0 }}
				exit={{ scaleY: 0 }}
				transition={{ duration: 1, ease: [0.9, 0.05, 0.28, 0.91] }}
			/>
			<motion.div
				initial={{ translateY: '100%' }}
				animate={{ translateY: '0%' }}
				exit={{ translateY: '100%' }}
				transition={{ duration: 1, ease: [0.6, 0.05, 0.28, 0.91] }}
			>
				<Component />
			</motion.div>
		</motion.div>
	)
}

export default withTransition
