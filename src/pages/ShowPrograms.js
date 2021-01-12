import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import Program from '../components/Program'
import GoBack from '../components/GoBackButton'

function ShowPrograms() {
	// получаю 
	let { title, logo, description, xvid } = useSelector(state => state.channels.channel)
	const date_from = useSelector(state => state.dates.date_from)
	const date_to = useSelector(state => state.dates.date_to)

	const PROGRAMS_PATH = 'http://epg.domru.ru/program/list?domain=perm'

	const [programs, setPrograms] = useState([])

	const fetchPrograms = async () => {
		await axios.get(`${PROGRAMS_PATH}&date_from=${date_from}&date_to=${date_to}&xvid=${xvid}`)
								.then(response => setPrograms(response.data[xvid]))
								.catch(e => console.error(e))
	}

	useEffect(() => {
		fetchPrograms()
	}, [])

	return (
		<div className="programs">
			{/* кнопка "назад" - возвращает к выбору канала */}
			<GoBack path={'/date'} />

			{/* отображение выбранных канала и даты */}
			<div className="programs__header">
				<img 
					src={'http://epg.domru.ru' + logo} alt="Логотип телеканала" className="programs__logo" />
				<h2 className="programs__title">{title}</h2>
				<p className="programs__date">Программа на {dayjs(date_from).format('DD.MM.YYYY')}</p>
			</div>

			{/* описание канала */}
			<p className="programs__desc">{description}</p>	

			{/* список программ */}
			<ul className="programs__list">
				{programs.map(program => 
					<Program 
						program={program}
						key={program.start}
					/>
				)}
			</ul>
		</div>
	)
}

export default ShowPrograms;
