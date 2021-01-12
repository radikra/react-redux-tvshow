import { combineReducers } from "redux"
import { channelsReducer } from './channels.reducer'
import { datesReducer } from './dates.reducer'

export const rootReducer = combineReducers({
	channels: channelsReducer,
	dates: datesReducer
})