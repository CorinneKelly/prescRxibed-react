import React from 'react'
import {connect} from 'react-redux'

const Notification = () => {
	return (
			<ul className="list-item"><li className="flex-auto notification">Your records have been updated!</li></ul>
		)
}

export default connect()(Notification)