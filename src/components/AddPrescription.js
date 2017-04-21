import moment from 'moment'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { postPrescriptionEvent } from '../actions/prescription'
import { connect } from 'react-redux'
import BurgerMenu from './BurgerMenu'



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
  
	handleSubmit(event) {
		event.preventDefault()
		let fakeState = {
			prescription: {
				name: "DrugName",
				instructions: "Take This",
				dosage: 2,
				units: "pills",
				quantity: 60,
				refills: 3,
				doctor: ""
			},
			schedule: {
				start_date: "2017-04-19",
				end_date: "2017-07-19",
				frequency: "Daily",
				// format time with double digits "09"
				hours: ["9:00", "12:00", "18:00"],
				weekdays: [],
				// need to specify a time of day
				month_days: [],
				expiration_date: "2018-04-19"
			}
		}
		this.props.postPrescriptionEvent(fakeState)//should pass in this.state instead of fakeState
	}


	renderStepOne() {
		if(this.state.step === 1) {
			// sets default start date to today
			let date = new Date()
			let today = moment(date).format('YYYY-MM-DD')
			return(
				<ul className="stepOne" >

					<li className="list-item add-pres-list-item">
						<input className="list-flex add-pres-input" type="text" placeholder="Name of medicine" name="prescription[name]" onChange={this.handleInputChange.bind(this, "name", "prescription")} />
					</li>
					
					<li className="list-item add-pres-list-item">
						<div className="list-flex add-pres-input">Start date: </div>
						<input className="list-flex add-pres-input" type="date" value={today} name="schedule[startDate]" onChange={this.handleInputChange.bind(this, "startDate", "schedule")} />
					</li>

					<li className="list-item">
						<input className="list-flex add-pres-input" type="textarea" placeholder="Instructions" name="prescription[instructions]" onChange={this.handleInputChange.bind(this, "instructions", "prescription")} /><br />
					</li>

					<li className="list-item">
						<button className="list-flex" onClick={this.showNextStep}>Continue</button> <br />
					</li>
				</ul>
			)
		}else{
			return null
		}
	}

	renderStepTwo() {
		if(this.state.step === 2) {
			return (
			<ul className="stepTwo" >
				<li className="list-item add-pres-list-item"><input className="list-flex add-pres-input" type="number" placeholder="# per dose?" name="prescription[dosage]" onChange={this.handleInputChange.bind(this, "dosage", "prescription")} /></li>
				<li className="list-item add-pres-list-item"><input className="list-flex add-pres-input" type="text" placeholder="units (pill, mL, etc.)" name="prescription[units]" onChange={this.handleInputChange.bind(this, "units", "prescription")} /> </li>
				<li className="list-item add-pres-list-item"><input className="list-flex add-pres-input" type="number" placeholder="amount per bottle?" name="prescription[quantity]" onChange={this.handleInputChange.bind(this, "quantity", "prescription")} /></li>
				<li className="list-item add-pres-list-item"><input className="list-flex add-pres-input" type="number" placeholder="# of refills?" name="prescription[refills]" onChange={this.handleInputChange.bind(this, "refills", "prescription")} /></li>
				<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.showNextStep}>Continue</button> </li>
			</ul>)
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
				<ul className="dailyFrequency" id="dailyFrequency">
					<li className="list-item add-pres-list-item">Time of dose: <input className="list-flex add-pres-input" type="time" name="schedule[hours][]" onChange={this.handleInputChange.bind(this, "hours", "schedule")} /></li>
					<li className="list-item add-pres-list-item"><button onClick={this.addDailyTime}>Add Another Time</button></li>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.showNextStep}>Continue</button> </li>
				</ul>
			)
		}else{
			return null
		}
	}

	renderStepThreeWeekly() {
		if(this.state.step === 3 && this.state.schedule.frequency === "weekly") {
			return(
				<ul className="weeklyFrequency" >
					<li><input type="checkbox" value="Monday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Monday </li>
					<li><input type="checkbox" value="Tuesday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Tuesday </li>
					<li><input type="checkbox" value="Wednesday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Wednesday </li>
					<li><input type="checkbox" value="Thursday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Thursday </li>
					<li><input type="checkbox" value="Friday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Friday </li>
					<li><input type="checkbox" value="Saturday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Saturday </li>
					<li><input type="checkbox" value="Sunday" checked name="schedule[weekdays][]" onChange={this.handleInputChange.bind(this, "weekdays", "schedule")} /> Sunday </li>
					<li><button className="list-flex" onClick={this.showNextStep}>Continue</button> </li>
				</ul>
			)
		}else{
			return null
		}
	}

	renderStepThreeMonthly() {
		if(this.state.step === 3 && this.state.schedule.frequency === "monthly") {
			return(
				<ul className="monthlyFrequency" >

					<li>Choose dates:<br/> <input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /></li>
					<li><input className="list-item add-pres-list-item" type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /></li>
					<li><input className="list-item add-pres-list-item" type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /></li>
					<li><input className="list-item add-pres-list-item" type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")}/>< /li>
					<li><button className="list-flex" onClick={this.showNextStep}>Continue</button> </li>
				</ul>
			)
		} else {
			return null
		}

	}

	renderStepFour() {
		if(this.state.step === 4) {
			return(
				<ul>
					<p>This section is optional, feel free to skip it by clicking "I'm done"</p>
					<input className="list-item add-pres-list-item" type="text" placeholder="Name of Doctor" name="prescription[doctor]" /><br />
					Expiration Date <input className="list-item add-pres-list-item" type="date" name="schedule[expiration]" /><br />
					<input className="list-flex" type="submit" value="I'm Done" />
				</ul>
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
			<div className="add-presc-page">
				<BurgerMenu />
				<form onSubmit={this.handleSubmit}>
					{this.renderStepOne()}
					{this.renderStepTwo()}
					{this.renderStepThree()}
					{this.renderStepThreeDaily()}
					{this.renderStepThreeWeekly()}
					{this.renderStepThreeMonthly()}
					{this.renderStepFour()}

					<button className="list-flex" onClick={this.backButton}>Go Back</button>
				</form>
			</div>
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
