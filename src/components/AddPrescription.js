import moment from 'moment'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { postPrescriptionEvent } from '../actions/prescription'
import { connect } from 'react-redux'


class AddPrescription extends Component {

	constructor() {
		super()

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleFrequency = this.handleFrequency.bind(this)

		this.backButton = this.backButton.bind(this)
		this.showNextStep = this.showNextStep.bind(this)

		this.addHoursField = this.addHoursField.bind(this)
		this.renderHoursFields = this.renderHoursFields.bind(this)

		this.state = {
			step: 1,
			schedule: {
				frequency: "daily",
				hours: [''],
				weekdays: [''],
				month_days: [''],
			},
			prescription: {
			},
		}
	}

	clearEmptyScheduleArrays(){
		let schedule = this.state.schedule
		switch (schedule.frequency) {
			case "daily":
				schedule["weekdays"] = []
				schedule["month_days"] = []
				break;
			case "weekly":
				schedule["hours"] = []
				schedule["month_days"] = []
				break;
			case "monthly":
				schedule["hours"] = []
				schedule["weekdays"] = []
		}

		Object.keys(schedule).forEach((key)=>{
			if (["hours", "weekdays", "month_days"].includes(key)){
				schedule[key].forEach((el,i,array)=>{
					if (el === ''){
						array.splice(i,1)
					}
				})
			}
		})

		this.setState({
			schedule: schedule
		})
	}

	handleSubmit(event) {
		debugger
		event.preventDefault()
		this.clearEmptyScheduleArrays()

		// let fakeState = {
		// 	prescription: {
		// 		name: "DrugName",
		// 		instructions: "Take This",
		// 		dosage: 2,
		// 		units: "pills",
		// 		quantity: 60,
		// 		refills: 3,
		// 		doctor: ""
		// 	},
		// 	schedule: {
		// 		start_date: "2017-04-19",
		// 		end_date: "2017-07-19",
		// 		frequency: "Daily",
		// 		hours: ["9:00", "12:00", "18:00"],
		// 		weekdays: [],
		// 		month_days: [],
		// 		expiration_date: "2018-04-19"
		// 	}
		// }
		this.props.postPrescriptionEvent(this.state)//should pass in this.state instead of fakeState
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
					Time of dose:<br/>
					{this.renderHoursFields()}
					<button onClick={this.addHoursField}>Add Another Time</button><br />
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
					<input type="checkbox" value="Monday" id="0"  name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Monday <br />
					<input type="checkbox" value="Tuesday" id="1"  name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Tuesday <br />
					<input type="checkbox" value="Wednesday" id="2"  name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Wednesday <br />
					<input type="checkbox" value="Thursday" id="3" name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Thursday <br />
					<input type="checkbox" value="Friday" id="4" name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Friday <br />
					<input type="checkbox" value="Saturday" id="5"  name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Saturday <br />
					<input type="checkbox" value="Sunday" id="6"  name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Sunday <br />
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
		debugger

		event.preventDefault()
		let input = this.state[nestedParent][field]
		if (typeof input === "object"){
			input[event.target.id] = event.target.value
			this.setState({
				[nestedParent]: {...this.state[nestedParent], [field]: input}
			})
		} else {
			this.setState({
				[nestedParent]: {...this.state[nestedParent], [field]: event.target.value}
			})
		}
	}

	handleFrequency() {
		var e = document.getElementById("frequency")
		var freq = e.options[e.selectedIndex].value
		this.setState({
			schedule: {...this.state.schedule, frequency: freq}
		})
	}

	addHoursField(event) {
		debugger
		event.preventDefault()
		let newHours = this.state.schedule.hours
		newHours.push("")
		this.setState({
			schedule: {...this.state.schedule, hours: newHours}
		})
	}


	renderHoursFields(){
		debugger
		let inputs = this.state.schedule.hours
		let mappedInputs = inputs.map((input, i)=>{
			return <input type="time" name="schedule[hours][]" id={i} value={inputs[i]} onChange={this.handleInputChange.bind(this, "hours", "schedule")} />
		})
		return(
			<div>
				{mappedInputs}
			</div>)
	}

	showNextStep(event) {
		event.preventDefault()
		this.setState({
			step: this.state.step + 1
		})
	}

	backButton(event){
		event.preventDefault()
		if(this.state.step !== 1){
			let backStep = this.state.step - 1
			this.setState({
				step: backStep
			})
		}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postPrescriptionEvent},
    dispatch
  )
}




export default connect(null, mapDispatchToProps)(AddPrescription)
