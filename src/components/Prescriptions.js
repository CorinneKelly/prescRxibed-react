import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrescriptionListItem from './PrescriptionListItem'

const imgPath = "../images/home/"

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
					originalImageSource={index%2 ? `${imgPath}pillBlue.svg` : `${imgPath}pillWhiteish.svg`}
					deleteImageSource={index%2 ? `${imgPath}deleteCanBrBlue.svg` : `${imgPath}deleteCanWhite.svg`}
					className={index%2 ? "blue-font" : "white-font"}
				/> )
				
			
		})

		return (
			<div>
				{prescriptions}
			</div>)
	}
}



const mapStateToProps = (state) => {
	return {
		prescription: state.prescription
	}
}

export default connect(mapStateToProps)(Prescriptions)

