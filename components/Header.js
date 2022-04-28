import Image from 'next/image'
import styles from '../styles/Header.module.css'

const Header = ({ user }) => {
	return (
		<div className={styles.header}>
			<div className={styles.name}>Rides API</div>
			<div className={styles.user}>
				<div className={styles.name}>{user.name}</div>
				<Image className={styles.logo} src={user.url} alt="user" width={44} height={44} />
			</div>
		</div>
	)
}

export default Header