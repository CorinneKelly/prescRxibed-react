import React, { Component } from 'react'
import moment from 'moment'
import BurgerMenu from './BurgerMenu'
import Symptoms from './Symptoms'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSymptoms, deleteSymp } from '../actions/symptom'
import { getPrescription } from '../actions/prescription'
import '../stylesheets/prescription.css'
import { forceLogout } from '../actions/account'

const imgPath = "../images/prescription/"

class Prescription extends Component {

	constructor(){
		super()

		this.state = {
			display: "",
			prescriptionId: ""
		}

		this.showDetails = this.showDetails.bind(this)
		this.showSymptoms = this.showSymptoms.bind(this)
		this.renderDetails = this.renderDetails.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleOnMouseOverSymp = this.handleOnMouseOverSymp.bind(this)
		this.handleOnMouseOutSymp = this.handleOnMouseOutSymp.bind(this)

	}

	handleDelete(sympId){
		this.props.deleteSymp(sympId)
	}

	handleOnMouseOverSymp(sympId, deleteImage){
		document.getElementById(`symp-list-item${sympId}`).setAttribute('src', deleteImage)
	}

	handleOnMouseOutSymp(sympId, originalImage){
		document.getElementById(`symp-list-item${sympId}`).setAttribute('src', originalImage)
	}

	componentWillMount(){
		this.setState({
			prescriptionId: this.props.match.params.prescriptionId
		})

		this.props.forceLogout(this.props.account.expiresAt)
		this.props.getPrescription(this.props.match.params.prescriptionId)
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
			var currRx = this.props.prescription.specificPrescription
			return (
				<div>
					<li className="list-item">
						<div className="flex-auto">Dosage: {currRx.dosage} {currRx.units}</div>
					</li>

					<li className="list-item">
						<div className="flex-auto">Instructions: {currRx.instructions}</div>
					</li>

					<li className="list-item">
						<div className="flex-auto">{currRx.refills} refill(s) left</div>
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
					<Symptoms handleDelete={this.handleDelete} handleOnMouseOverSymp={this.handleOnMouseOverSymp} handleOnMouseOutSymp={this.handleOnMouseOutSymp} />
					<li className="list-item">
						<img className="flex-auto" src={`${imgPath}addSymptomPeach.svg`} height="60px" width="60px" />
						<a className="flex-60 new-symptom-link symp-list-link" href={`/prescriptions/${this.state.prescriptionId}/newsymptom`}>
							Add New Symptom
						</a>
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
						<img className="flex-auto" src={`${imgPath}rxBottleBrightBlue.svg`} />
						<button className="flex-60 prescription-main-list-item" onClick={this.showDetails}>
							Prescription Details 
						</button>
					</li>
					{this.renderDetails()}

					<li className="list-item  pres-page-list-item">
						<img className="flex-auto" src={`${imgPath}symptomTrackerBrightBlue.svg`} />
						<button className="flex-60 prescription-main-list-item" onClick={this.showSymptoms}>
							Symptom Tracker 
						</button>
					</li>
					{this.renderSymptoms()}

				</ul>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		prescription: state.prescription,
		account: state.account
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getSymptoms, getPrescription, forceLogout, deleteSymp
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Prescription)
