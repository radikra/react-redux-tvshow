import React from 'react'
import { useHistory } from 'react-router-dom'

function GoBack({path}) {
	let history = useHistory()

	return (
		<button type='button' className="go-back" onClick={() => history.push(path)}>
			<span>&#10094;</span>
		</button>
	)
}

export default GoBack;
