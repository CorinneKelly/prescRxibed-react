import React, { Component } from 'react'
import { connect } from 'react-redux'
import SymptomListItem from './SymptomListItem'

const presImgPath = "../images/prescription/"
const homeImgPath = "../images/home/"

class Symptoms extends Component {

	getHandleDelete(){
		return this.props.handleDelete
	}

	getMouseOver(){
		return this.props.handleOnMouseOverSymp
	}

	getMouseOut(){
		return this.props.handleOnMouseOutSymp
	}

	render() {
		var symptoms = this.props.symptoms.allSymptoms.map((symp, index) => {
			return (
				<SymptomListItem
					symptomDetails={symp}
					sympID={symp.id}
					handleOnMouseOverSymp={this.getMouseOver()}
					handleOnMouseOutSymp={this.getMouseOut()}
					handleDelete={this.getHandleDelete()}
					originalImageSource={index%2 ? `${presImgPath}heartSympPurple.svg` : `${presImgPath}heartSympWhite.svg`}
					deleteImageSource={index%2 ? `${presImgPath}deleteCanPurple.svg` : `${homeImgPath}deleteCanWhite.svg`}
					className={index%2 ? "purple-font" : "white-font"}
				/>)
		})

		return (
			<div className="pres-test">
				{symptoms}

			</div>
		)
	}
}



const mapStateToProps = (state) => {
	return {
		symptoms: state.symptom,
		prescription: state.prescription
	}
}

export default connect(mapStateToProps)(Symptoms)
