import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import BurgerMenu from './BurgerMenu'
import Symptoms from './Symptoms'
import { bindActionCreators } from 'redux'
import { getSymptoms } from '../actions/symptom'


class Prescription extends Component {

	constructor(){
		super()

		this.state = {
			display: ""
		}

		this.showDetails = this.showDetails.bind(this)
		this.showSymptoms = this.showSymptoms.bind(this)
		this.renderDetails = this.renderDetails.bind(this)
	}

	componentWillMount(){
		this.setState({
			prescriptionId: this.props.match.params.prescriptionId
		})
	}

	showDetails(){
		if (this.state.display === "presDetails") {
			this.setState({
				display: ""
			})
			
		} else {
			this.setState({
				display: "presDetails"
			})			
		}
	}

	renderDetails(){
		if (this.state.display === "presDetails") {
			var currRx = this.props.prescription.allPrescriptions[this.props.match.params.prescriptionId]
			return (
				<div>
					<li className="list-item">
						<div className="image-flex">Dosage: {currRx.dosage} {currRx.units}</div>
					</li>

					<li className="list-item">
						<div className="image-flex">Instructions: {currRx.instructions}</div>
					</li>

					<li className="list-item">
						<div className="image-flex">{currRx.refills} refill(s) left</div>
					</li>

					<li className="list-item">
						{currRx.doctor !== null ? currRx.doctor : null}
					</li>

				</div>
			)}
		
	}

	showSymptoms(){
		this.props.getSymptoms(this.state.prescriptionId)
		this.setState({
			display: "symptoms"
		})
	}

	renderSymptoms(){
		if (this.state.display === "symptoms"){
			return (
				<div>
					<Symptoms prescriptionId={this.state.prescriptionId} />
					<li className="list-item">
						<a className="image-flex" href={`/prescriptions/${this.state.prescriptionId}/newsymptom`}>Add New Symptom</a>
					</li>
				</div>)

		}else{
			return null
		}
	}

	render() {
		return (
			<div >
				<BurgerMenu />
				<ul>
					<li className="list-item  pres-page-list-item">
						<img className="image-flex" src="../rxBottleBrightBlue.svg" />
						<button className="list-flex" onClick={this.showDetails}> Prescription Details </button>
					</li>
					{this.renderDetails()}
					
					<li className="list-item  pres-page-list-item">
						<img className="image-flex" src="../symptomTrackerBrightBlue.svg" />
						<button className="list-flex" onClick={this.showSymptoms}> Symptom Tracker </button>
					</li>
					{this.renderSymptoms()}
					
				</ul>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		prescription: state.prescription
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getSymptoms
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Prescription)
