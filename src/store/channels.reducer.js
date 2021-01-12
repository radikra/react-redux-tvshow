import { GET_CHANNELS, SELECT_CHANNEL } from "./types";

const initialState = {
	channels: [],
	channel: {}
}

export const channelsReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_CHANNELS: 
			return {...state, channels: action.payload};
		case SELECT_CHANNEL:
			return {...state, channel: state.channels.filter(ch => ch.chid === action.payload)[0]}
		default: return state;
	}	
}