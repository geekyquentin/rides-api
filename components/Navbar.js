import { useState } from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = ({ handleClickOption, ulSize, pSize }) => {
	const [isActive, setIsActive] = useState(false)

	const sz = (size) => {
		return '(' + size + ')'
	}

	const handleClick = (option) => {
		handleClickOption(option)
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles.items}>
				<button onClick={() => handleClick('home')}>Rides</button>
				<button onClick={() => handleClick('upcoming-rides')}>Upcoming rides {sz(ulSize)}</button>
				<button onClick={() => handleClick('past-rides')}>Past rides {sz(pSize)}</button>
			</div>
			<div className={styles.filter}>
				<button>Filter</button>
			</div>
		</nav>
	)
}

export default Navbar