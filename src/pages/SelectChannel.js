import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Channel from '../components/Channel'
import { getChannels } from '../store/channels.actions'

function SelectChannel() {
	const dispatch = useDispatch()

	const channels = useSelector(state => state.channels.channels)

	useEffect(() => dispatch(getChannels()), [])

	return (
		<div className="widgets">
			<div className="channels">
				<div className="panel">
					<div className="panel__list">
						{ 	
							channels.map(channel => <Channel 
								channel={channel} 
								key={channel.chid} 
							/>)
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SelectChannel;
