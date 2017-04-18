import moment from 'moment'
import React, { Component } from 'react'

class AddPrescription extends Component {

	constructor() {
		super()

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFrequency = this.handleFrequency.bind(this)
		this.addDoseTime = this.addDoseTime.bind(this)
		this.addDoseMonth = this.addDoseMonth.bind(this)
		this.showStepTwo = this.showStepTwo.bind(this)
		this.showStepThree = this.showStepThree.bind(this)
		this.showStepFour = this.showStepFour.bind(this)

		this.state={
			step: 1
	}
}

	renderStepOne(){
		if(this.state.step == 1){
			// sets default start date to today
			let date = new Date()
			let today = moment(date).format('YYYY-MM-DD')
			return(
				<div class="stepOne" >
					<input type="text" placeholder="Name of medicine" /><br />
					Start Date: <input type="date" value={today} /><br />
					<input type="textarea" placeholder="Instructions" /><br />
					<button onClick={this.showStepTwo} >Continue</button>
				</div>
			)
		}else{
			return null
		}
	}

	renderStepTwo(){
		if(this.state.step == 2){
			return (
			<div class="stepTwo" >
				<input type="number" placeholder="# of pills per dose?" /><br />
				<input type="number" placeholder="Dosage amount?" /><br />
				 // possible dropdown menu with 'mg' etc
				<input type="number" placeholder="# of pills per bottle?" /><br />
				<input type="number" placeholder="# of refills?" /><br />
				<button onClick={this.showStepThree} >Continue</button>
			</div>)
		} else {
		return null
		}
	}

	renderStepThree(){
		if(this.state.step == 3){
			return (
				<div className="stepThree" >
					Frequency <select name="frequency" onChange={this.handleFrequency}>
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
					</select> <br />

				// if daily is selected
					<div className="dailyFrequency" >
						1st dose: <input type="time" />
						<button onClick={this.addDoseTime}>Add another dose for this day</button>
					</div>


					// if weekly is selected
					<div className="weeklyFrequency" >
						<input type="checkbox" value="Monday" checked /> Monday <br />
						<input type="checkbox" value="Tuesday" checked /> Tuesday <br />
						<input type="checkbox" value="Wednesday" checked /> Wednesday <br />
						<input type="checkbox" value="Thursday" checked /> Thursday <br />
						<input type="checkbox" value="Friday" checked /> Friday <br />
						<input type="checkbox" value="Saturday" checked /> Saturday <br />
						<input type="checkbox" value="Sunday" checked /> Sunday <br />
					</div>

					// if monthly is selected
					<div className="monthlyFrequency" >
						Choose by date <input type="number" name="monthFreq" min="1" max="31" />
						<button onClick={this.addDoseMonth}>Add another dose for this month</button><br />
						<button onClick={this.showStepFour} >Continue</button>
					</div>
				</div>)
		}else{
			return null
		}
	}

	renderStepFour(){
		if(this.state.step == 4){
			return(
				<div>
					<p>This section is optional, feel free to skip it by clicking "I'm done"</p>
					<input type="text" placeholder="Name of Doctor" /><br />
					Expiration Date <input type="date" /><br />
					<input type="submit" value="I'm Done" />
				</div>
			)
		}else{
			return null
		}
	}


	handleSubmit() {
	}

	handleFrequency() {
		// should display appropriate selections depending on selection value
	}

	addDoseTime() {
		//  should add "2nd Dose" with new time input
		//  can change to "add dose time" if too complex
	}

	addDoseMonth() {
		//  should add another monthly dose line
	}

	showStepTwo() {
		// hide first part of form and show second part
		this.setState({
			step: 2
		})
	}
	showStepThree() {
		// hide second part of form and show third part
		this.setState({
			step: 3
		})
	}
	showStepFour() {
		// hide third part of form and show fourth part
		this.setState({
			step: 4
		})
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{this.renderStepOne()}
				{this.renderStepTwo()}
				{this.renderStepThree()}
				{this.renderStepFour()}
			</form>
		)
	}

}

export default AddPrescription
