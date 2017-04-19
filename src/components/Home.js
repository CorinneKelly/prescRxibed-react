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
		}
		else {
			return null
		}
	}
	showSchedule(){
		if (this.state.schedule === true){
			return <FullSchedule />
		}
		else {
			return null
		}
	}

	render(){
		return (
			<div className="Home" >
				<form action="/prescriptions/new">
				  <button className="large-button" type="submit">Add a Prescription</button>
				</form>
				<button type="button" className="large-button" onClick={this.handleOnClickPrescriptions}>Your Prescriptions</button><br/>
				{this.showPrescriptions()}
				<button type="button" className="large-button" onClick={this.handleOnClickSchedule}>Schedule</button>
				{this.showSchedule()}

			</div>
		)
	}
}

export default Home
