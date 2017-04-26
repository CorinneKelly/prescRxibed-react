import React, { Component } from 'react'
import { connect } from 'react-redux'
import SymptomListItem from './SymptomListItem'

class Symptoms extends Component {

	render() {

		var symptoms = this.props.prescription.symptoms.map((symp, index) => {
			return (
				<SymptomListItem
					symptomDetails={symp}
					idx={symp.id}
					imageSource={index%2 ? "pillBlue.svg" : "pillWhiteish.svg"}
				/> )
				
			
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

