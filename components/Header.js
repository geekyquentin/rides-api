import Image from 'next/image'
import styles from '../styles/Header.module.css'
import cstyles from '../styles/Common.module.css'

const Header = ({ user }) => {
	return (
		<div className={`${styles.header} ${cstyles.container}`}>
			<div className={styles.name}>Rides API</div>
			<div className={styles.user}>
				<div className={styles.name}>{user.name}</div>
				<Image className={styles.logo} src={user.url} alt="user" width={44} height={44} />
			</div>
		</div>
	)
}

export default Header