import { FC } from 'react'
import styles from './styles.module.css'

interface ScoreInterface {
	breedScore: number | string
}
const BreedScore: FC<ScoreInterface> = ({ breedScore }) => {
	const score = Array.from(
		{ length: +breedScore > 0 ? +breedScore : 1 },
		(_, index) => index + 1
	)

	return (
		<div className={styles.container}>
			{score.map((_, index) => (
				<div className={styles.score} key={index}></div>
			))}
		</div>
	)
}

export default BreedScore
