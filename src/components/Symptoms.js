import React, { Component } from 'react'
import { connect } from 'react-redux'
import SymptomListItem from './SymptomListItem'

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
		debugger
		var symptoms = this.props.symptom.allSymptoms.map((symp, index) => {
			return (
				<SymptomListItem
					symptomDetails={symp}
					idx={symp.id}
					handleOnMouseOverPres={this.getMouseOver()}
					handleOnMouseOutPres={this.getMouseOut()}
					handleDelete={this.getHandleDelete()}
					imageSource={index%2 ? "pillBlue.svg" : "pillWhiteish.svg"}
					deleteImageSource={index%2 ? "deleteCanBrBlue.svg" : "deleteCanWhite.svg"}
					className={index%2 ? "blue-font" : "white-font"}
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
		symptom: state.symptom,
		prescription: state.prescription
	}
}

export default connect(mapStateToProps)(Symptoms)

