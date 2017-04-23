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

			presOpen: false,
			schedOpen: false,

			presImage: "closedBottlePink.svg",
			schedImage: "closedBottlePink.svg",

		}
	}

	handleOnClickSchedule(event) {
		event.preventDefault()
		if (!this.state.schedOpen) {
			document.getElementById("sched-image").animate([
		    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
		    { transform: `rotateX(180deg) rotateY(3600deg) rotateZ(0deg)`}
		  ], {
		    duration: 1000,
		    easing: "ease-in-out",
		    fill: "forwards"
		  })

			this.setState({
				presOpen: false,
				schedOpen: !this.state.schedOpen,
				schedImage: "openBottlePink.svg",
				presImage: "closedBottlePink.svg"
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
				schedImage: "closedBottlePink.svg",
				schedOpen: !this.state.schedOpen
			})
		}
	}


	handleOnClickPrescriptions(event) {
		event.preventDefault()

		if (!this.state.presOpen) {
			document.getElementById("pres-image").animate([
			    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
			    { transform: `rotateX(180deg) rotateY(3600deg) rotateZ(0deg)`}
			  ], {
			    duration: 1000,
			    easing: "ease-in-out",
			    fill: "forwards"
			  })

			this.setState ({
				presOpen: !this.state.presOpen,
				schedOpen: false,
				presImage: "openBottlePink.svg",
				schedImage: "closedBottlePink.svg"
			})

			document.getElementById("sched-image").animate([
				{ transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
				    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`}
				  ], {
				    duration: 1000,
				    easing: "ease-in-out",
				    fill: "forwards"
				  })
		} else {
			document.getElementById("pres-image").animate([
				{ transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`},
				    { transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg)`}
				  ], {
				    duration: 1000,
				    easing: "ease-in-out",
				    fill: "forwards"
				  })
			this.setState({
				presImage: "closedBottlePink.svg",
				presOpen: !this.state.presOpen
			})
		}
	}

	showPrescriptions(){
		if (this.state.presOpen && this.state.schedOpen){
			this.setState({
				schedOpen: false
			})
			return <Prescriptions />
			// prescriptions will return a list of <li>prescriptions</li>
		} else if(this.state.presOpen){
			this.setState({
				schedOpen: false
			})
			return <Prescriptions />
		} else {
			return null
		}
	}

	showSchedule(){
		if (this.state.schedOpen && this.state.presOpen){
			this.setState({
				presOpen: false
			})
			return <li><FullSchedule /></li>
		} else if (this.state.schedOpen) {
			this.setState({
				presOpen: false
			})
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
