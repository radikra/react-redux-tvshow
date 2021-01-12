import React from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import Ru from 'dayjs/locale/ru'

import { ReactComponent as Done } from '../assets/done.svg'
import { ReactComponent as Playing } from '../assets/playing.svg'
import { ReactComponent as Next } from '../assets/next.svg'

dayjs.extend(isBetween)
dayjs.extend(localizedFormat)
dayjs.locale(Ru)

function Program({program}) {
	// вычисляю время окончания передачи
	program.end = dayjs(program.start).add(program.duration, 'seconds')

	return (
		<li className="programs__item details">
			{
				(dayjs().isAfter(program.end, 'minute')) ? <Done className="details__icon"/> // иконка для прошедших передач
				: (dayjs().isBetween(program.start, program.end, 'minute')) ? <Playing className="details__icon"/> // иконка для текущей передачи
				: <Next className="details__icon"/> // иконка для будущих передач
			}
			<p className="details__desc">
				<span>{dayjs(program.start).format('LT')}: </span>
				<span>{program.title}</span>
			</p>
		</li>
	)
}

export default Program;
