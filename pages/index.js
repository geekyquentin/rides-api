import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import RideList from '../components/RideList'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

export const getStaticProps = async () => {
	const res = await fetch('https://assessment.api.vweb.app/rides')
	const data = await res.json()

	const resUser = await fetch('https://assessment.api.vweb.app/user')
	const dataUser = await resUser.json()

	const GetDistance = (path, code) => {
		var distance = Infinity
		for (var i = 0; i < path.length; i++) {
			distance = Math.min(distance, Math.abs(path[i] - code))
		}

		return distance
	}

	const newData = data.map(dataItem => {
		return {
			...dataItem,
			uid: uuid(),
			distance: GetDistance(dataItem.station_path, dataUser.station_code)
		}
	})

	return {
		props: {
			rides: newData,
			user: dataUser
		}
	}
}

export default function Home({ rides, user }) {
	const [sortedList, setSortedList] = useState([])
	const [upcomingList, setUpcomingList] = useState([])
	const [pastList, setPastList] = useState([])
	const [currList, setCurrList] = useState([])

	useEffect(() => {
		const getSortedList = () => {
			const sortedRides = [...rides]
			return sortedRides.sort((a, b) => a.distance - b.distance)
		}

		const getUpcomingList = () => {
			const upcomingRides = rides.filter(ride => new Date(ride.date) > new Date())
			return upcomingRides.sort((a, b) => new Date(b.date) - new Date(a.date))
		}

		const getPastList = () => {
			const pastRides = rides.filter(ride => new Date(ride.date) < new Date())
			return pastRides.sort((a, b) => new Date(b.date) - new Date(a.date))
		}

		setSortedList(getSortedList())
		setUpcomingList(getUpcomingList())
		setPastList(getPastList())
		setCurrList(getSortedList())
	}, [rides, user])

	const updateList = (option) => {
		if (option === 'home') {
			setCurrList(sortedList)
		} else if (option === 'upcoming-rides') {
			setCurrList(upcomingList)
		} else if (option === 'past-rides') {
			setCurrList(pastList)
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