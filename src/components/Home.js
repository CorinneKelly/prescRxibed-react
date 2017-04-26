import React, { Component } from 'react'
import AddPrescription from './AddPrescription'
import Prescriptions from './Prescriptions'
import FullSchedule from './FullSchedule'
import { connect } from 'react-redux'
import { getPrescriptions, deletePrescription } from '../actions/prescription'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'
import { store } from '../index'
import '../stylesheets/home.css'
import { forceLogout } from '../actions/account'

const imgPath = "images/home/"

class Home extends Component {
	constructor (){
		super()
		this.state = {
			presOpen: false,
			schedOpen: false,
			presImage: `${imgPath}closedBottlePink.svg`,
			schedImage: `${imgPath}calendarPink.svg`
		}
		this.handleOnClickPrescriptions = this.handleOnClickPrescriptions.bind(this)
		this.handleOnClickSchedule = this.handleOnClickSchedule.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleOnMouseOverPres = this.handleOnMouseOverPres.bind(this)
		this.handleOnMouseOutPres = this.handleOnMouseOutPres.bind(this)
	}

	handleDelete(prescriptionId){
		this.props.deletePrescription(prescriptionId)
	}

	handleOnMouseOverPres(prescriptionId, deleteImage){
		document.getElementById(`pres-list-item${prescriptionId}`).setAttribute('src', deleteImage)
	}

	handleOnMouseOutPres(prescriptionId, originalImage){
		document.getElementById(`pres-list-item${prescriptionId}`).setAttribute('src', originalImage)
	}

	componentWillMount(){
    this.props.forceLogout(this.props.account.expiresAt)
  }

	handleOnClickSchedule(event) {
		event.preventDefault()

		if (!this.state.schedOpen) {
			document.getElementById("sched-image").animate([
		    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
		    { transform: `rotateX(360deg) rotateY(1800deg) rotateZ(360deg)`}
		  ], {
		    duration: 1000,
		    easing: "ease-in-out",
		    fill: "forwards"
		  })

			this.setState({
				presOpen: false,
				schedOpen: !this.state.schedOpen,
				presImage: `${imgPath}closedBottlePink.svg`
			})

			document.getElementById("pres-image").animate([
				{ transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
				    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`}
				  ], {
				    duration: 1000,
				    easing: "ease-in-out",
				    fill: "forwards"
				  })

		} else {
				document.getElementById("sched-image").animate([
				{ transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
				    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`}
				  ], {
				    duration: 1000,
				    easing: "ease-in-out",
				    fill: "forwards"
				  })
			this.setState({
				schedOpen: !this.state.schedOpen
			})
		}
	}


	handleOnClickPrescriptions(event) {
		event.preventDefault()
		this.props.getPrescriptions()

		if (!this.state.presOpen) {
			document.getElementById("pres-image").animate([
			    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
			    { transform: `rotateX(540deg) rotateY(1800deg) rotateZ(0deg)`}
			  ], {
			    duration: 1000,
			    easing: "ease-in-out",
			    fill: "forwards"
			  })

			document.getElementById("sched-image").animate([
				{ transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
				    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`}
				  ], {
				    duration: 1000,
				    easing: "ease-in-out",
				    fill: "forwards"
				  })

			this.setState ({
				presOpen: !this.state.presOpen,
				schedOpen: false,
				presImage: `${imgPath}openBottlePink.svg`,
			})

		} else {
			document.getElementById("pres-image").animate([
				{ transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
				    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`}
				  ], {
				    duration: 1,
				    easing: "ease-in-out",
				    fill: "forwards"
				  })
			this.setState({
				presImage: `${imgPath}closedBottlePink.svg`,
				presOpen: !this.state.presOpen
			})
		}
	}


	showSchedule(){
		if (this.state.schedOpen){
			return <li><FullSchedule /></li>
		} else if (this.state.schedOpen) {
			return <li><FullSchedule /></li>
		} else {
			return null
		}
	}

	render(){
		return (
			<div className="home-wrapper" >
				<ul className="home-list">
					<li className="list-item">
						<img className="flex-auto" src={`${imgPath}addpillPink.svg`} width="90" height="85" />
						<button className="flex-60 main-item-format" >
							<a href="/add-prescription" className="add-pres-link" >
								Add a Prescription
							</a>
						</button>
					</li>

					<li className="list-item">
						<img className="flex-auto" id="pres-image" width="90" height="85" src={this.state.presImage}  />
						<button className="flex-60 main-item-format" onClick={this.handleOnClickPrescriptions} >
							Your Prescriptions
						</button>
					</li>
							{this.state.presOpen ? <Prescriptions handleDelete={this.handleDelete} handleOnMouseOverPres={this.handleOnMouseOverPres} handleOnMouseOutPres={this.handleOnMouseOutPres} /> : null}

					<li className="list-item">
						<img className="flex-auto" id="sched-image" width="90" height="85" src={this.state.schedImage} />
						<button className="flex-60 main-item-format" onClick={this.handleOnClickSchedule} >
							Schedule
						</button>
					</li>
							{this.showSchedule()}
				</ul>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		account: state.account
	}
}


const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getPrescriptions, deletePrescription, forceLogout
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
