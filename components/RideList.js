import Image from 'next/image'
import EmptyList from './EmptyList'
import styles from '../styles/RideList.module.css'

const RideList = ({ rides }) => {
    const getStationPath = (path) => {
        var pathStr = ""
        for (var i = 0; i < path.length; i++) {
            pathStr += path[i]

            if (i < path.length - 1) {
                pathStr += ", "
            }
        }

        return '[' + pathStr + ']'
    }

    const nth = (d) => {
        if (d > 3 && d < 21) return 'th'
        switch (d % 10) {
            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    }

    const getDate = (date) => {
        let newDate = new Date(date)
        const tdate = newDate.getDate()
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][newDate.getMonth()]
        const year = newDate.getFullYear()

        const hours = newDate.getHours()
        const minutes = newDate.getMinutes()

        return `${tdate}${nth(tdate)} ${month} ${year} ${hours}:${minutes}`
    }

    return (
        <>
            {(rides.length > 0)
                ? rides.map(ride => (
                    <div key={ride.uid} className={styles.card}>
                        <div className={styles.cardLeft}>
                            <div className={styles.cardImageContainer}>
                                <Image className={styles.cardImage} src={ride.map_url} alt="map" width={296} height={153} />
                            </div>
                            <div className={styles.cardContent}>
                                <p>Ride Id : <span>{ride.id}</span></p>
                                <p>Origin Station : <span>{ride.origin_station_code}</span></p>
                                <p>station_path : <span>{getStationPath(ride.station_path)}</span></p>
                                <p>Date : <span>{getDate(ride.date)}</span></p>
                                <p>Distance : <span>{ride.distance}</span></p>
                            </div>
                        </div>
                        <div className={styles.cardRight}>
                            <span>{ride.state}</span>
                            <span>{ride.city}</span>
                        </div>
                    </div>
                ))
                : <EmptyList />}
        </>
    )
}

export default RideList