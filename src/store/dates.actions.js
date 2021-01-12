import { SELECT_DATE } from './types'

export function selectDate({date_from, date_to}) {
	return dispatch => dispatch({type: SELECT_DATE, payload: {date_from, date_to}})
}