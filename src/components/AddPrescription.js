import moment from 'moment'
import React, { Component } from 'react'

class AddPrescription extends Component {

	constructor() {
		super()

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleFrequency = this.handleFrequency.bind(this)

		this.backButton = this.backButton.bind(this)
		this.showNextStep = this.showNextStep.bind(this)

		this.addDailyTime = this.addDailyTime.bind(this)

		this.state = {
			step: 1,
			schedule: {
				frequency: "daily"
			}
		}

	}

	renderStepOne() {
		if(this.state.step === 1) {
			// sets default start date to today
			let date = new Date()
			let today = moment(date).format('YYYY-MM-DD')
			return(
				<div className="stepOne" >
					<input type="text" placeholder="Name of medicine" name="prescription[name]" onChange={this.handleInputChange.bind(this, "name", "prescription")} /><br />
					Start Date: <input type="date" value={today} name="schedule[startDate]" onChange={this.handleInputChange.bind(this, "startDate", "schedule")} /><br />
					<input type="textarea" placeholder="Instructions" name="prescription[instructions]" onChange={this.handleInputChange.bind(this, "instructions", "prescription")} /><br />
					<button className="continue-button" onClick={this.showNextStep}>Continue</button> <br />
				</div>
			)
		}else{
			return null
		}
	}

	renderStepTwo() {
		if(this.state.step === 2) {
			return (
			<div className="stepTwo" >
				<input type="number" placeholder="# per dose?" name="prescription[dosage]" onChange={this.handleInputChange.bind(this, "dosage", "prescription")} />
				<input type="text" placeholder="units (pill, mL, etc.)" name="prescription[units]" onChange={this.handleInputChange.bind(this, "units", "prescription")} /> <br />
				<input type="number" placeholder="amount per bottle?" name="prescription[quantity]" onChange={this.handleInputChange.bind(this, "quantity", "prescription")} /><br />
				<input type="number" placeholder="# of refills?" name="prescription[refills]" onChange={this.handleInputChange.bind(this, "refills", "prescription")} /><br />
				<button className="continue-button" onClick={this.showNextStep}>Continue</button> <br />
			</div>)
		} else {
		return null
		}
	}

	renderStepThree() {
		if(this.state.step === 3) {
			return (
				<div className="stepThree" >
					Frequency <select id="frequency" name="schedule[frequency]" onChange={this.handleFrequency}>
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

	renderStepThreeDaily() {
		if(this.state.step === 3 && this.state.schedule.frequency  === "daily") {
			return(
				<div className="dailyFrequency" id="dailyFrequency">
					Time of dose: <input type="time" name="schedule[hours][]" onChange={this.handleInputChange.bind(this, "hours", "schedule")} /><br/>
					<button onClick={this.addDailyTime}>Add Another Time</button><br />
					<button className="continue-button" onClick={this.showNextStep}>Continue</button> <br />
				</div>
			)
		}else{
			return null
		}
	}

	renderStepThreeWeekly() {
		if(this.state.step === 3 && this.state.schedule.frequency === "weekly") {
			return(
				<div className="weeklyFrequency" >
					<input type="checkbox" value="Monday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Monday <br />
					<input type="checkbox" value="Tuesday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Tuesday <br />
					<input type="checkbox" value="Wednesday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Wednesday <br />
					<input type="checkbox" value="Thursday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Thursday <br />
					<input type="checkbox" value="Friday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Friday <br />
					<input type="checkbox" value="Saturday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Saturday <br />
					<input type="checkbox" value="Sunday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Sunday <br />
					<button className="continue-button" onClick={this.showNextStep}>Continue</button> <br />
				</div>
			)
		}else{
			return null
		}
	}

	renderStepThreeMonthly() {
		if(this.state.step === 3 && this.state.schedule.frequency === "monthly") {
			return(
				<div className="monthlyFrequency" >
					Choose dates:<br/> <input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /><br/>
					<input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /><br/>
					<input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /><br/>
					<input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} />
					<button className="continue-button" onClick={this.showNextStep}>Continue</button> <br />
				</div>
			)
		} else {
			return null
		}

	}

	renderStepFour() {
		if(this.state.step === 4) {
			return(
				<div>
					<p>This section is optional, feel free to skip it by clicking "I'm done"</p>
					<input type="text" placeholder="Name of Doctor" name="prescription[doctor]" /><br />
					Expiration Date <input type="date" name="schedule[expiration]" /><br />
					<input type="submit" value="I'm Done" />
				</div>
			)
		} else {
			return null
		}
	}

	handleInputChange(field, nestedParent, event){
		event.preventDefault()
		this.setState({
			[nestedParent]: {...this.state[nestedParent], [field]: event.target.value}
		})
	}

	handleFrequency() {
		var e = document.getElementById("frequency")
		var freq = e.options[e.selectedIndex].value
		this.setState({
			schedule: {...this.state.schedule, frequency: freq} 
		})
	}

	addDailyTime(event) {
		event.preventDefault()
		document.getElementById("dailyFrequency").create(<input type="time" name="schedule[hours][]" onChange={this.handleInputChange.bind(this, "hours", "schedule")} />)
		// return(<input type="time" name="schedule[hours][]" onChange={this.handleInputChange.bind(this, "hours", "schedule")} />)
	}

	showNextStep(event) {
		event.preventDefault()
		this.setState({
			step: this.state.step + 1
		})
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

	handleSubmit() {
		debugger
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				{this.renderStepOne()}
				{this.renderStepTwo()}
				{this.renderStepThree()}
				{this.renderStepThreeDaily()}
				{this.renderStepThreeWeekly()}
				{this.renderStepThreeMonthly()}
				{this.renderStepFour()}

				<button className="go-back-button" onClick={this.backButton}>Go Back</button>
			</form>
		)
	}

}

export default AddPrescription
