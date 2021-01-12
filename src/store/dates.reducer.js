import { SELECT_DATE } from './types'

const initialState = {
	date_from: '',
	date_to: ''
}

export const datesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SELECT_DATE:
			return {...state, date_from: action.payload.date_from, date_to: action.payload.date_to}
		default: return state;
	}
}