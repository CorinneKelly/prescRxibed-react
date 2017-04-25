import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrescriptionListItem from './PrescriptionListItem'

class Prescriptions extends Component {
	getHandleDelete(){
		return this.props.handleDelete
	}

	getMouseOver(){
		return this.props.handleOnMouseOverPres
	}

	getMouseOut(){
		return this.props.handleOnMouseOutPres
	}

	render() {
		// debugger
		var prescriptions = this.props.prescription.allPrescriptions.map((pres, index) => {
			
			return (
				<PrescriptionListItem
					prescriptionDetails={pres}
					presID={pres.id}
					handleOnMouseOverPres={this.getMouseOver()}
					handleOnMouseOutPres={this.getMouseOut()}
					handleDelete={this.getHandleDelete()}
					originalImageSource={index%2 ? "pillBlue.svg" : "pillWhiteish.svg"}
					deleteImageSource={index%2 ? "deleteCanBrBlue.svg" : "deleteCanWhite.svg"}
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

