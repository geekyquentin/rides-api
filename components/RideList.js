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
                                <p>Ride Id : <span>{ride.id}</span></p>
                                <p>Origin Station : <span>{ride.origin_station_code}</span></p>
                                <p>station_path : <span>{getStationPath(ride)}</span></p>
                                <p>Date : <span>{ride.date}</span></p>
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