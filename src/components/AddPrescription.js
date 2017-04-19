import moment from 'moment'
import React, { Component } from 'react'

class AddPrescription extends Component {

	constructor() {
		super()

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleFrequency = this.handleFrequency.bind(this)
		this.backButton = this.backButton.bind(this)
		this.showNextStep = this.showNextStep.bind(this)

		this.state={
			step: 1,
			frequency: "daily"
		}
	}

	backButton(e){
		e.preventDefault()
		if(this.state.step !== 1){
			let backStep = this.state.step - 1
			this.setState({
				step: backStep
			})
		}
	}

	renderStepOne(){
		if(this.state.step === 1){
			// sets default start date to today
			let date = new Date()
			let today = moment(date).format('YYYY-MM-DD')
			return(
				<div className="stepOne" >
					<input type="text" placeholder="Name of medicine" /><br />
					Start Date: <input type="date" value={today} /><br />
					<input type="textarea" placeholder="Instructions" /><br />
				</div>
			)
		}else{
			return null
		}
	}

	renderStepTwo(){
		if(this.state.step === 2){
			return (
			<div class="stepTwo" >
				<input type="number" placeholder="# per dose?" />
				<input type="text" placeholder="units (pill, mL, etc.)"/> <br />
				<input type="number" placeholder="amount per bottle?" /><br />
				<input type="number" placeholder="# of refills?" /><br />
			</div>)
		} else {
		return null
		}
	}

	renderStepThree(){
		if(this.state.step === 3){
			return (
				<div className="stepThree" >
					Frequency <select id="frequency" name="frequency" onChange={this.handleFrequency}>
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
					</select> <br />
				</div>
			)
		}else{
			return null
		}
	}

	renderStepThree_Daily(){
		if(this.state.step === 3 && this.state.frequency  === "daily"){
			return(
				<div className="dailyFrequency" >
					Time of dose: <input type="time" /><br/>
					Time of dose: <input type="time" /><br/>
					Time of dose: <input type="time" /><br/>
					Time of dose: <input type="time" />
				</div>
			)
		}else{
			return null
		}
	}

	renderStepThree_Weekly(){
		if(this.state.step === 3 && this.state.frequency === "weekly"){
			return(
				<div className="weeklyFrequency" >
					<input type="checkbox" value="Monday" checked /> Monday <br />
					<input type="checkbox" value="Tuesday" checked /> Tuesday <br />
					<input type="checkbox" value="Wednesday" checked /> Wednesday <br />
					<input type="checkbox" value="Thursday" checked /> Thursday <br />
					<input type="checkbox" value="Friday" checked /> Friday <br />
					<input type="checkbox" value="Saturday" checked /> Saturday <br />
					<input type="checkbox" value="Sunday" checked /> Sunday <br />
				</div>
			)
		}else{
			return null
		}
	}

	renderStepThree_Monthly(){
		if(this.state.step === 3 && this.state.frequency === "monthly"){
			return(
				<div className="monthlyFrequency" >
					Choose dates:<br/> <input type="number" name="monthFreq" min="1" max="31" /><br/>
					<input type="number" name="monthFreq" min="1" max="31" /><br/>
					<input type="number" name="monthFreq" min="1" max="31" /><br/>
					<input type="number" name="monthFreq" min="1" max="31" />
				</div>
			)
		}else{
			return null
		}

	}

	renderStepFour(){
		if(this.state.step === 4){
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

		var e = document.getElementById("frequency");
		var freq = e.options[e.selectedIndex].value;
		this.setState({
			frequency: freq
		})
	}

	showNextStep(e) {
		e.preventDefault()
		if(this.state.step < 4){
			this.setState({
				step: this.state.step + 1
			})
		}else{
			alert ("That's it! Click 'I'm Done' or 'Go Back'")
		}
}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{this.renderStepOne()}
				{this.renderStepTwo()}
				{this.renderStepThree()}
				{this.renderStepThree_Daily()}
				{this.renderStepThree_Weekly()}
				{this.renderStepThree_Monthly()}
				{this.renderStepFour()}
				<button onClick={this.showNextStep}>Continue</button> <br />
				<button onClick={this.backButton}>Go Back</button>
			</form>
		)
	}

}

export default AddPrescription
