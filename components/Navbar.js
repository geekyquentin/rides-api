import { useState } from 'react'
import Filter from './Filter'
import styles from '../styles/Navbar.module.css'
import cstyles from '../styles/Common.module.css'

const Navbar = ({ handleClickOption, ulSize, pSize }) => {
	const [isActive, setIsActive] = useState(false)

	const sz = (size) => {
		return '(' + size + ')'
	}

	const handleClick = (option) => {
		handleClickOption(option)
	}

	return (
		<nav className={`${styles.navbar} ${cstyles.container}`}>
			<div className={styles.items}>
				<button onClick={() => handleClick('all')}>Rides</button>
				<button onClick={() => handleClick('upcoming')}>Upcoming {sz(ulSize)}</button>
				<button onClick={() => handleClick('past')}>Past {sz(pSize)}</button>
			</div>
			{/* <Filter /> */}
		</nav>
	)
}

export default Navbar