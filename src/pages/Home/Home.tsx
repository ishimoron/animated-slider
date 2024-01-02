import { motion } from 'framer-motion'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import Cursor from '../../components/Cursor/Cursor'
import RoundedButton from '../../components/RoundedButton/RoundedButton'

import styles from './style.module.css'
import withTransition from '../../utils/Transition/transition'
const Home: FC = () => {
	const letterVariants = {
		hidden: { opacity: 0, x: -20, delay: 2 },
		visible: { opacity: 1, x: 0, delay: 2 },
	}
	const [isHovered, setIsHovered] = useState(false)

	return (
		<div>
			<Cursor isHovered={isHovered} />
			<motion.div className={styles.container}>
				<motion.div
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<motion.span
						variants={letterVariants}
						initial='hidden'
						animate='visible'
						transition={{ duration: 0.5, delay: 0.5 }}
					>
						W
					</motion.span>
					<motion.span
						variants={letterVariants}
						initial={{ opacity: 0, x: -20 }}
						animate='visible'
						transition={{ duration: 0.5, delay: 0.7 }}
					>
						E
					</motion.span>
					<motion.span
						variants={letterVariants}
						initial={{ opacity: 0, x: -20 }}
						animate='visible'
						transition={{ duration: 0.5, delay: 0.9 }}
					>
						L
					</motion.span>
					<motion.span
						variants={letterVariants}
						initial={{ opacity: 0, x: -20 }}
						animate='visible'
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						C
					</motion.span>
					<motion.span
						variants={letterVariants}
						initial={{ opacity: 0, x: -20 }}
						animate='visible'
						transition={{ duration: 0.5, delay: 0.8 }}
					>
						O
					</motion.span>
					<motion.span
						variants={letterVariants}
						initial={{ opacity: 0, x: -20 }}
						animate='visible'
						transition={{ duration: 0.5, delay: 1 }}
					>
						M
					</motion.span>
					<motion.span
						variants={letterVariants}
						initial={{ opacity: 0, x: -20 }}
						animate='visible'
						transition={{ duration: 0.5, delay: 1.2 }}
					>
						E
					</motion.span>
				</motion.div>
				<motion.div
					variants={letterVariants}
					initial={{ opacity: 0, x: -20 }}
					animate='visible'
					transition={{ duration: 0.5, delay: 2 }}
				>
					<RoundedButton>
						<Link to='/slider' className={styles.link}>
							start
						</Link>
					</RoundedButton>
				</motion.div>
			</motion.div>
		</div>
	)
}

export default withTransition(Home)
