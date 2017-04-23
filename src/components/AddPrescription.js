import moment from 'moment'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { postPrescriptionEvent } from '../actions/prescription'
import { connect } from 'react-redux'
import BurgerMenu from './BurgerMenu'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group'




class AddPrescription extends Component {

	constructor() {
		super()

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleFrequency = this.handleFrequency.bind(this)

		this.backButton = this.backButton.bind(this)
		this.showNextStep = this.showNextStep.bind(this)

		this.addfreqField = this.addfreqField.bind(this)
		this.renderfreqFields = this.renderfreqFields.bind(this)
		this.handleWeekdaysChange = this.handleWeekdaysChange.bind(this)
		this.clearEmptyScheduleArrays = this.clearEmptyScheduleArrays.bind(this)

		// sets default start date to today
		let date = new Date()
		let today = moment(date).format('YYYY-MM-DD')

		this.state = {
			step: 1,
			schedule: {
				frequency: "daily",
				hours: [''],
				weekdays: ["SU","MO","TU","WE","TH",'FR','SA'],
				month_days: [''],
				start_date: today
			},
			prescription: {
				dosage:""
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
		this.props.postPrescriptionEvent(this.state)//should pass in this.state instead of fakeState


	}


	renderStepOne() {
		if(this.state.step === 1) {
			return(
				<ul className="stepOne" >

					<li className="list-item add-pres-list-item">
						<input className="list-flex add-pres-input" type="text" placeholder="Name of medicine" name="prescription[name]" onChange={this.handleInputChange.bind(this, "name", "prescription")} />
					</li>

					<li className="list-item add-pres-list-item">
						<div className="start-date">Start date:  </div>
						<input className="list-flex add-pres-input" type="date" value={this.state.schedule.start_date} name="schedule[start_date]" onChange={this.handleInputChange.bind(this, "start_date", "schedule")} />
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
				<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.backButton}>Go Back</button></li>

			</ul>)
		} else {
		return null
		}
	}

	renderStepThree() {
		if(this.state.step === 3) {
			return (
				<ul className="stepThree">
					<li className="freq">Frequency: <select id="frequency" name="schedule[frequency]" value={this.state.schedule.frequency} onChange={this.handleFrequency}>
						<option value="daily">Daily</option>
						<option value="weekly">Weekly</option>
						<option value="monthly">Monthly</option>
					</select> </li>

				</ul>
			)
		}else{
			return null
		}
	}



	renderStepThreeDaily() {
		if(this.state.step === 3 && this.state.schedule.frequency  === "daily") {
			return(

				<ul className="dailyFrequency" id="dailyFrequency">
					<p className="list-flex">Time of dose: {this.renderfreqFields("hours")}</p>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.addfreqField.bind(null,"hours")}>Add Another Time</button></li>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.showNextStep}>Continue</button> </li>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.backButton}>Go Back</button></li>

				</ul>
			)
		}else{
			return null
		}
	}

		addfreqField(freqField,event) {
			event.preventDefault()
			let newFieldState = this.state.schedule[freqField]
			newFieldState.push("")
			this.setState({
				schedule: {...this.state.schedule, [freqField]: newFieldState}
			})
		}

		renderfreqFields(freqField){
			let inputs = this.state.schedule[freqField]
			let mappedInputs = inputs.map((input, i)=>{
				if (freqField === "hours"){
					return <input type="time"  id={i} value={inputs[i]} onChange={this.handleInputChange.bind(this, freqField, "schedule")} />
				} else {
					return <input type="number" min="1" max="31" id={i} value={inputs[i]} onChange={this.handleInputChange.bind(this, freqField, "schedule")} />
				}
			})
			return(
				<div>
					{mappedInputs}
				</div>)
		}

	renderStepThreeWeekly() {
		if(this.state.step === 3 && this.state.schedule.frequency === "weekly") {
			let weekdays = this.state.schedule.weekdays
			return(

				<div>
					<CheckboxGroup name="weekdays" value={weekdays} onChange={this.handleWeekdaysChange}>
					  <p className="weekday"><label><Checkbox value="MO"/>Monday</label></p>
					  <p className="weekday"><label><Checkbox value="TU"/>Tuesday</label></p>
					  <p className="weekday"><label><Checkbox value="WE"/>Wednesday</label></p>
					  <p className="weekday"><label><Checkbox value="TH"/>Thursday</label></p>
					  <p className="weekday"><label><Checkbox value="FR"/>Friday</label></p>
					  <p className="weekday"><label><Checkbox value="SA"/>Saturday</label></p>
					  <p className="weekday"><label><Checkbox value="SU"/>Sunday</label></p>
					</CheckboxGroup>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.showNextStep}>Continue</button> </li>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.backButton}>Go Back</button></li>

				</div>
			)
		}else{
			return null
		}
	}

	handleWeekdaysChange(newWeekdays){
		this.setState({
			schedule: {...this.state.schedule, weekdays: newWeekdays}
		});
	}

	// renderStepThreeMonthly() {
	// 	if(this.state.step === 3 && this.state.schedule.frequency === "monthly") {
	// 		return(
	// 			<div className="monthlyFrequency" >
	//
	// 				Choose dates:<br/> <input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /><br/>
	// 				<input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /><br/>
	// 				<input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} /><br/>
	// 				<input type="number" min="1" max="31" name="schedule[monthDates][]" onChange={this.handleInputChange.bind(this, "monthDates", "schedule")} />
	// 				<button className="continue-button" onClick={this.showNextStep}>Continue</button> <br />
	// 			</div>
	// 		)
	// 	} else {
	// 		return null
	// 	}
	//
	// }

	renderStepThreeMonthly() {
		if(this.state.step === 3 && this.state.schedule.frequency  === "monthly") {
			return(

				<ul className="monthlyFrequency stepThree" id="monthlyFrequency">
				<p className="freq">	Day of dose:</p>
					<li className="freq">{this.renderfreqFields("month_days")}</li>
					<li className="list-item"><button className="list-flex" onClick={this.addfreqField.bind(null, "month_days")}>Add Another Day</button></li>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.showNextStep}>Continue</button> </li>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.backButton}>Go Back</button></li>

				</ul>
			)
		}else{
			return null
		}
	}

	renderStepFour() {
		if(this.state.step === 4) {
			return(
				<ul className="stepFour">
					<p className="freq">This section is optional, feel free to skip it by clicking "I'm done"</p>
					<li className='list-item add-pres-list-item'><input className="list-flex add-pres-input" type="text" placeholder="Name of Doctor" name="prescription[doctor]" /></li>
					<li className="freq">Expiration Date:</li>
					<li className="list-item add-pres-list-item"><input className="list-flex add-pres-input" type="date" name="schedule[expiration]" /></li>
					<li className="list-item add-pres-list-item"><button className="list-flex" onClick={this.backButton}>Go Back</button></li>

					<li className="freq"><button className="list-flex" onClick={this.handleSubmit}>I'm Done </button></li>
				</ul>
			)
		} else {
			return null
		}
	}


	handleInputChange(field, nestedParent, event){
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
