import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { selectChannel } from '../store/channels.actions'

function Channel({channel}) {
	const dispatch = useDispatch()

	return (
		<Link to='/date' 
			className="panel__item channel"
			onClick={() => dispatch(selectChannel(channel.chid))}
		>
			<img src={'http://epg.domru.ru' + channel.logo} alt={channel.title} className="channel__logo" />
			<p className="channel__title">{channel.title}</p>
		</Link>
	)
}

export default Channel;
