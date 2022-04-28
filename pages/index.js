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

	const newData = data.map(dataItem => {
		return {
			...dataItem,
			uid: uuid(),
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
		const SortByUserDestination = (a, b) => {
			let diffMin = [Infinity, Infinity], minIndex = [0, 0], curr = [a, b]

			for (let i = 0; i < 2; i++) {
				for (let j = 0; j < curr[i].station_path.length; j++) {
					let diff = Math.abs(curr[i].station_path[j] - user.station_code)

					if (diff < diffMin[i]) {
						diffMin[i] = diff
						minIndex[i] = j
					}
				}
			}

			return diffMin[0] == diffMin[1] ? minIndex[0] - minIndex[1] : diffMin[0] - diffMin[1]
		}

		const getSortedList = () => {
			const sortedRides = [...rides]
			return sortedRides.sort(SortByUserDestination)
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