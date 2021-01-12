import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectDate } from '../store/dates.actions'
import GoBack from '../components/GoBackButton'

function SelectDate() {
	const dispatch = useDispatch()

	// получаю название и лого выбранного канала для отображения на странице
	let { logo, title } = useSelector(state => state.channels.channel)

	// начало диапазона дат: по умолчанию - текущая дата
	const dateStart = dayjs().format('YYYY-MM-DD')
	// конец диапазона дат: текущая дата + 5 дней - столько отдает API 
	const dateEnd = dayjs().add(5, 'day').format('YYYY-MM-DD')

	// следим за сменой дня выбора - по умолчанию на старте это текущая дата
	const [dateRange, setDateRange] = useState(dateStart)
	// переменная в дальнейшем служит в качестве date_to в строке запроса списка передач
	let dateNext = dayjs(dateRange).add(1, 'day').format('YYYY-MM-DD')

	// прокрутка списка дат "назад"
	function prevDate() {
		if (dayjs(dateRange).isAfter(dateStart, 'day')) {
			// убавляем день выбора на 1...
			setDateRange(dayjs(dateRange).subtract(1, 'day').format('YYYY-MM-DD'))
		} else {
			// ...пока не достигнем дня окончания
			setDateRange(dateEnd)
		}
	}
	
	// прокрутка списка дат "вперед"
	function nextDate() {
		if (dayjs(dateRange).isBefore(dateEnd, 'day')) {
			// увеличиваем день выбора на 1...
			setDateRange(dayjs(dateRange).add(1, 'day').format('YYYY-MM-DD'))
		} else {
			// ...пока не достигнем дня старта
			setDateRange(dateStart)
		}
	}
	
	return (
		<div className="widgets">
			<div className="dates">
				{/* возврат к выбору канала */}
				<GoBack path={'/'} />
				<div className="desc">
					<img src={'http://epg.domru.ru' + logo} alt="Логотип телеканала" className="desc__logo" />
					<h1 className="desc__title">{title}</h1>
				</div>
				<div className="date">
					<div className="date__display">
						 {/* прокурутка диапазона дат "назад" */}
						<button 
							type="button" 
							className="date__prev" 
							onClick={prevDate}
						/>
						<div className="date__inside">
							{/* диапазон дат: предыдущая, текущая, следующая */}
							<p className="date__numbers">
								{/* предыдущий от дня выбора день - его тоже уменьшаем до start/end */}
								<span className="date__prevnext">{
									(dayjs(dateRange).get('date') === dayjs(dateStart).get('date')) ? dayjs(dateEnd).get('date') : dayjs(dateRange).subtract(1, 'day').get('date')
								}</span>
								{/* день выбора */}
								<span className="date__actual">{ dayjs(dateRange).get('date') }</span>
								{/* следующий после дня выбора день - его тоже увеличиваем до start/end */}
								<span className="date__prevnext">{
									(dayjs(dateRange).get('date') === dayjs(dateEnd).get('date')) ? dayjs(dateStart).get('date') : dayjs(dateRange).add(1, 'day').get('date')
								}</span>
							</p>
						</div>
						{/* прокурутка диапазона дат "вперед" */}
						<button 
							type="button" 
							className="date__next" 
							onClick={nextDate}
						/>
						{/* кнопка выбора даты; date_from и date_to диспатчатся в стор и подтягиваются из стора в компоненте ShowPrograms */}
						<Link 
							to='/programs' 
							type="button" 
							className="date__done"
							onClick={() => dispatch(selectDate({date_from: dateRange, date_to: dateNext}))}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SelectDate;
