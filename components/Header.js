import Image from 'next/image'
import styles from '../styles/Header.module.css'
import cstyles from '../styles/Common.module.css'
import MediaQuery from 'react-responsive'

const Header = ({ user }) => {
	return (
		<div className={`${styles.header} ${cstyles.container}`}>
			<div className={styles.name}>Rides API</div>
			<div className={styles.user}>
				<MediaQuery query='(min-width: 768px)'>
					<div className={styles.name}>{user.name}</div>
				</MediaQuery>
				<Image className={styles.logo} src={user.url} alt="user" width={44} height={44} />
			</div>
		</div>
	)
}

export default Header