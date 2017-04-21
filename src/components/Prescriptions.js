import React from 'react'



// ask about diff between this method
// and making a constant that exports on the bottom

export default class Prescriptions extends React.Component {


	render() {
		// let prescriptions = map through props? to get array of <li> prescription components
		// li should have an image input of "pill" and class of pill-flex
		// li text should have class of "list-flex"
		// ul should have "display:flex;"

		// let pillImg = ["pillBlue.svg", "pillWhiteish.svg"]
		// this.props.prescriptions.map((pres, index) => {
		// return <li><img className="image-flex" src={`this.state.pillImg[${index}%2]`} /><Prescription /></li>			
		// })

		return (
			<div>
				This is a list of links with your perscriptions
			</div>
		)
	}
}
