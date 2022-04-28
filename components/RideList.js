import { useState, useEffect } from 'react'
import Image from 'next/image'
import EmptyList from './EmptyList'
import styles from '../styles/RideList.module.css'

const RideList = ({ rides }) => {
    const getStationPath = (ride) => {
        var pathStr = ""
        for (var i = 0; i < ride.station_path.length; i++) {
            pathStr += ride.station_path[i]

            if (i < ride.station_path.length - 1) {
                pathStr += ", "
            }
        }

        return '[' + pathStr + ']'
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
                                <p>id: <span>{ride.id}</span></p>
                                <p>origin station code: <span>{ride.origin_station_code}</span></p>
                                <p>station path: <span>{getStationPath(ride)}</span></p>
                                <p>destination station code: <span>{ride.destination_station_code}</span></p>
                                <p>date: <span>{ride.date}</span></p>
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