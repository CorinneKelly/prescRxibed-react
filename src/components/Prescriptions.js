import React from 'react'
import { connect } form 'react-redux'

// ask about diff between this method 
// and making a constant that exports on the bottom

export class Prescriptions extends React.Component {
	render() {
		// let prescriptions = map through props? to get array of <li> prescription components

		return (
			<div>
				<ul>
					{prescriptions}
				</ul>
			<div>
		)
	}
}