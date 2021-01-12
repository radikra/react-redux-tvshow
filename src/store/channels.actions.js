import axios from "axios"
import { GET_CHANNELS, SELECT_CHANNEL } from "./types";

export function getChannels() {
	return async dispatch => {
		let channels = []
		await axios.get('http://epg.domru.ru/channel/list?domain=perm')
			.then(response => channels = response.data)
			.catch(e => console.error(e))
		
		const formattedChannelsList = channels.filter(res => res.button != null).sort((a,b) => a.button - b.button)
		dispatch({type: GET_CHANNELS, payload: formattedChannelsList})
	}
}

export function selectChannel(chid) {
	return dispatch => dispatch({type: SELECT_CHANNEL, payload: chid})
}
