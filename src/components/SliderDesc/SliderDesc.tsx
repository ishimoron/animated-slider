import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import {
	fetchCatDataDescAsync,
	fetchCatImageAsync,
} from '../../store/reducers/catsReducer'
import withTransition from '../../utils/Transition/transition'
import BreedScore from '../BreedScore/BreedScore'
import Cursor from '../Cursor/Cursor'
import styles from './style.module.css'
const SliderDesc = () => {
	const { catId } = useParams()
	const dispatch = useAppDispatch()
	const location = useLocation()
	const [imageUrl, setImageUrl] = useState('')
	const catData = useAppSelector(state =>
		state.cats.catsData.find(cat => cat.id === catId)
	)
	const catImage = useAppSelector(state => state.cats.catImage)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			if (catId) {
				await dispatch(fetchCatDataDescAsync(catId))
			}

			if (catData) {
				setImageUrl(catData.url || '')
			}
		}

		if (location.pathname === '/slider/') {
			setImageUrl('')
		}

		fetchData()
	}, [dispatch, catId, catData?.url])

	const handleImageChange = () => {
		if (catData && catData.breeds && catData.breeds.length > 0) {
			const catImageId = catData.breeds[0].id.toString()
			dispatch(fetchCatImageAsync(catImageId))
		}

		if (catImage && catImage[0]) {
			setImageUrl(catImage[0].url)
		}
	}

	return (
		<div>
			<Cursor />
			{catData?.breeds &&
				catData?.breeds.map((cat, index) => (
					<div key={index} className={styles.container}>
						{imageUrl && (
							<motion.img
								src={imageUrl}
								alt={catImage && catImage[0] ? catImage[0].id : ''}
								className={styles.catImage}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 1 }}
							/>
						)}
						<div className={styles.card}>
							<motion.div
								className={styles.closeBtn}
								onClick={() => {
									navigate(-1)
								}}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 1.6 }}
							>
								<div className={styles.closeIcon}></div>
							</motion.div>
							<motion.h1
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 2 }}
							>
								{cat.name}
								&nbsp;
								<ReactCountryFlag
									countryCode={cat.country_code.toString()}
									svg
									style={{
										fontSize: '2em',
										lineHeight: '2em',
									}}
								/>
							</motion.h1>
							<motion.h4
								className={styles.description}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 2.4 }}
							>
								{cat.description}
							</motion.h4>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 2.8 }}
							>
								Adaptability:
								<BreedScore breedScore={cat.adaptability} />
							</motion.div>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 3.2 }}
							>
								Affection:
								<BreedScore breedScore={cat.affection_level} />
							</motion.div>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 3.4 }}
							>
								ChildFriendly:
								<BreedScore breedScore={cat.child_friendly} />
							</motion.div>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 3.6 }}
							>
								DogFriendly:
								<BreedScore breedScore={cat.dog_friendly} />
							</motion.div>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 3.8 }}
							>
								Energy:
								<BreedScore breedScore={cat.energy_level} />
							</motion.div>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 4 }}
							>
								Grooming:
								<BreedScore breedScore={cat.grooming} />
							</motion.div>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 4.2 }}
							>
								Hairless:
								<BreedScore breedScore={cat.hairless} />
							</motion.div>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 4.4 }}
							>
								Social needs:
								<BreedScore breedScore={cat.social_needs} />
							</motion.div>
							<motion.div
								className={styles.scoreContainer}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 1, delay: 4.6 }}
							>
								Stranger friendly:
								<BreedScore breedScore={cat.stranger_friendly} />
							</motion.div>
							<div className={styles.linksContainer}>
								<motion.button
									onClick={handleImageChange}
									className={styles.btn}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 1, delay: 4.8 }}
								>
									Change image
								</motion.button>
								<motion.div
									className={styles.links}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 1, delay: 5 }}
								>
									<Link to={cat.vcahospitals_url.toString()} target='_blank'>
										Learn More
									</Link>
									<Link to={cat.vetstreet_url.toString()} target='_blank'>
										Learn More
									</Link>
								</motion.div>
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default withTransition(SliderDesc)
