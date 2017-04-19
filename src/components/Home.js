import React, { Component } from 'react'
import AddPrescription from './AddPrescription'
import Prescriptions from './Prescriptions'
import FullSchedule from './FullSchedule'
import '../stylesheets/home.css'


class Home extends Component {
	constructor (){
		super()
		this.handleOnClickPrescriptions = this.handleOnClickPrescriptions.bind(this)
		this.handleOnClickSchedule = this.handleOnClickSchedule.bind(this)
		this.state = {
			schedule: false,
			prescriptions: false
		}
	}

	handleOnClickSchedule() {
		this.setState({
			schedule: !this.state.schedule
		})
		console.log(this.state.schedule)
	}
	handleOnClickPrescriptions() {
		this.setState ({
			prescriptions: !this.state.prescriptions
		})
		console.log(this.state.prescriptions)
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
				<ul>
					<li><a href="/prescriptions/new"><button className="large-button" >Add a Prescription</button></a></li>

					<li><button type="button" className="large-button" onClick={this.handleOnClickPrescriptions}>Your Prescriptions</button></li>
							{this.showPrescriptions()}

					<li><button type="button" className="large-button" onClick={this.handleOnClickSchedule}>Schedule</button></li>
							{this.showSchedule()}
				</ul>

			</div>
		)
	}
}

export default Home
