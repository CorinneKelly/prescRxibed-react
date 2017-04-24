import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrescriptionListItem from './PrescriptionListItem'

class Prescriptions extends Component {

	render() {
		var prescriptions = this.props.prescription.allPrescriptions.map((pres, index) => {
			return (
				<PrescriptionListItem
					prescriptionDetails={pres}
					idx={index}
					imageSource={index%2 ? "pillBlue.svg" : "pillWhiteish.svg"}
				/> )
				
			
		})

		return (
			<div className="pres-test">
				{prescriptions}

			</div>
		)
	}
}



const mapStateToProps = (state) => {
	return {
		prescription: state.prescription
	}
}

export default connect(mapStateToProps)(Prescriptions)

