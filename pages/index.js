import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import RideList from '../components/RideList'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

export const getStaticProps = async () => {
	const resRides = await fetch('https://assessment.api.vweb.app/rides')
	const dataRides = await resRides.json()

	const resUser = await fetch('https://assessment.api.vweb.app/user')
	const dataUser = await resUser.json()

	const GetDistance = (path, code) => {
		var distance = Infinity
		for (var i = 0; i < path.length; i++) {
			distance = Math.min(distance, Math.abs(path[i] - code))
		}

		return distance
	}

	const newData = dataRides.map(dataItem => {
		return {
			...dataItem,
			uid: uuid(),
			distance: GetDistance(dataItem.station_path, dataUser.station_code)
		}
	})

	return {
		props: {
			distRides: [...newData].sort((a, b) => a.distance - b.distance),
			dateRides: [...newData].sort((a, b) => new Date(b.date) - new Date(a.date)),
			user: dataUser
		}
	}
}

export default function Home({ distRides, dateRides, user }) {
	const [currList, setCurrList] = useState(distRides)
	const [upcomingList, setUpcomingList] = useState([])
	const [pastList, setPastList] = useState([])

	useEffect(() => {
		setUpcomingList(dateRides.filter(ride => new Date(ride.date) > new Date()))
		setPastList(dateRides.filter(ride => new Date(ride.date) < new Date()))
	}, [dateRides])

	const updateList = (option) => {
		switch (option) {
			case 'all':
				setCurrList(distRides)
				break
			case 'upcoming':
				setCurrList(upcomingList)
				break
			case 'past':
				setCurrList(pastList)
				break
		}
	}

	return (
		<>
			<Header user={user} />
			<Navbar handleClickOption={updateList} ulSize={upcomingList.length} pSize={pastList.length} />
			<RideList rides={currList} />
		</>
	)
}