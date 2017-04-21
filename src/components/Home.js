import React, { Component } from 'react'
import AddPrescription from './AddPrescription'
import Prescriptions from './Prescriptions'
import FullSchedule from './FullSchedule'


class Home extends Component {
	constructor (){
		super()
		this.handleOnClickPrescriptions = this.handleOnClickPrescriptions.bind(this)
		this.handleOnClickSchedule = this.handleOnClickSchedule.bind(this)
		this.state = {
			schedule: false,
			prescriptions: false,

			presOpen: false,
			schedOpen: false,

			presAngle: 180,
			schedAngle: 180,

			presImage: "closedBottlePink.svg",
			schedImage: "closedBottlePink.svg",

		}
	}

	handleOnClickSchedule(event) {
		event.preventDefault()

		document.getElementById("sched-image").animate([
	    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
	    { transform: `rotateX(180deg) rotateY(3600deg) rotateZ(0deg)`}
	  ], {
	    duration: 1000,
	    easing: "ease-in-out",
	    fill: "forwards"
	  })

		this.setState ({
			schedule: !this.state.schedule,
			presOpen: false,
			schedOpen: true,
			schedImage: "openBottlePink.svg"
		})


	}

	handleOnClickPrescriptions(event) {
		event.preventDefault()
		let oldState = this.state.presAngle
		this.setState({
			presAngle: this.state.presAngle + 180
		})
		document.getElementById("pres-image").animate([
			    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
			    { transform: `rotateX(180deg) rotateY(3600deg) rotateZ(0deg)`}
			  ], {
			    duration: 1000,
			    easing: "ease-in-out",
			    fill: "forwards"
			  })

		this.setState ({
			prescriptions: !this.state.prescriptions,
			presOpen: true,
			schedOpen: false,
			presImage: "openBottlePink.svg"
		})
	}

	showPrescriptions(){
		if (this.state.prescriptions === true){
			return <Prescriptions />
			// prescriptions will return a list of <li>prescriptions</li>
		}
		else {
			return null
		}
	}

	showSchedule(){
		if (this.state.schedule === true){
			return <li><FullSchedule /></li>
		}
		else {
			return null
		}
	}

	render(){


		return (
			<div className="Home" >
				<ul className="home-list">
					<li className="list-item">
						<img className="image-flex" src="add-pillPink.svg"/>
						<button className="list-flex" ><a href="/add-prescription" id="add-pres-link" >
						Add a Prescription
						</a></button>
					</li>

					<li className="list-item">
						<img className="image-flex" id="pres-image" src={this.state.presImage} />
						<button className="list-flex" onClick={this.handleOnClickPrescriptions} >
						Your Prescriptions
						</button>
					</li>
							{this.showPrescriptions()}

					<li className="list-item">
						<img className="image-flex" id="sched-image" src={this.state.schedImage} />
						<button className="list-flex" onClick={this.handleOnClickSchedule} >
						Schedule
						</button>
					</li>
							{this.showSchedule()}
				</ul>

			</div>
		)
	}
}

export default Home
