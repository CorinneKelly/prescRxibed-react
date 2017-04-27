import moment from 'moment'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { postPrescriptionEvent } from '../actions/prescription'
import { forceLogout } from '../actions/account'
import { connect } from 'react-redux'
import BurgerMenu from './BurgerMenu'
import { Checkbox, CheckboxGroup } from 'react-checkbox-group'
import '../stylesheets/addPrescription.css'


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
		this.postScrip = this.postScrip.bind(this)

		// sets default start date to today
		let date = new Date()
		let today = moment(date).format('YYYY-MM-DD')

		this.state = {
			step: 1,
			schedule: {
				frequency: 'daily',
				hours: [''],
				weekdays: ['SU','MO','TU','WE','TH','FR','SA'],
				month_days: [''],
				start_date: today
			},
			message: false,
			prescription: {
			},
		}
	}

	componentWillMount(){
		this.props.forceLogout(this.props.account.expiresAt)
	}


	clearEmptyScheduleArrays(){
		let schedule = this.state.schedule
		switch (schedule.frequency) {
			case "daily":
				schedule["weekdays"] = []
				schedule["month_days"] = []
				break
			case "weekly":
				schedule["hours"] = []
				schedule["month_days"] = []
				break
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
		event.preventDefault()
		this.clearEmptyScheduleArrays()
		this.setState({
			message: true
		})
		setTimeout(()=>{this.postScrip()}, 3000)
	}

	postScrip(){
		this.props.postPrescriptionEvent(this.state)
	}


	renderStepOne() {
		if(this.state.step === 1) {
			return(
				<ul className="ul-format-addPres">

					<li className="list-item list-item-margin">
						<input className="flex-60 list-item-field" type="text" placeholder="Name of medicine" name="prescription[name]" onChange={this.handleInputChange.bind(this, "name", "prescription")} required />
					</li>

					<li className="list-item list-item-margin">
						<div className="flex-auto">Start date:  </div>
						<input className="flex-60 list-item-field" type="date" value={this.state.schedule.start_date} name="schedule[start_date]" onChange={this.handleInputChange.bind(this, "start_date", "schedule")} />
					</li>

					<li className="list-item list-item-margin">
						<input className="flex-60 list-item-field" type="textarea" placeholder="Instructions" name="prescription[instructions]" onChange={this.handleInputChange.bind(this, "instructions", "prescription")} /><br />
					</li>

					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.showNextStep}>
							Continue
						</button>
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
			<ul className="ul-format-addPres" >
				<li className="list-item list-item-margin">
					<input className="flex-60 list-item-field" type="number" placeholder="# per dose?" name="prescription[dosage]" onChange={this.handleInputChange.bind(this, "dosage", "prescription")} />
				</li>
				
				<li className="list-item list-item-margin">
					<input className="flex-60 list-item-field" type="text" placeholder="units (pill, mL, etc.)" name="prescription[units]" onChange={this.handleInputChange.bind(this, "units", "prescription")} /> 
				</li>
				
				<li className="list-item list-item-margin">
					<input className="flex-60 list-item-field" type="number" placeholder="amount per bottle?" name="prescription[quantity]" onChange={this.handleInputChange.bind(this, "quantity", "prescription")} />
				</li>
				
				<li className="list-item list-item-margin">
					<input className="flex-60 list-item-field" type="number" placeholder="# of refills?" name="prescription[refills]" onChange={this.handleInputChange.bind(this, "refills", "prescription")} />
				</li>
				
				<li className="list-item list-item-margin">
					<button className="button-format flex-auto list-item-field" onClick={this.showNextStep}>
						Continue
					</button>
				</li>
				
				<li className="list-item list-item-margin">
					<button className="button-format flex-auto list-item-field" onClick={this.backButton}>
						Go Back
					</button>
				</li>

			</ul>)
		} else {
		return null
		}
	}

	renderStepThree() {
		if(this.state.step === 3) {
			return (
				<ul className="ul-format-addPres">
					<li className="list-item list-item-margin">
						<div className="list-text flex-auto">
							Frequency:
						</div>

						<select className="flex-60 list-item-field" id="frequency" name="schedule[frequency]" value={this.state.schedule.frequency} onChange={this.handleFrequency}>
							<option value="daily">Daily</option>
							<option value="weekly">Weekly</option>
							<option value="monthly">Monthly</option>
						</select>
					</li>
				</ul>
			)
		}else{
			return null
		}
	}



	renderStepThreeDaily() {
		if(this.state.step === 3 && this.state.schedule.frequency  === "daily") {
			return(

				<ul className="ul-format-addPres">
					<li className="list-item list-item-margin">
						<div className="list-text flex-auto" >
							Time of dose: 
						</div>
					{this.renderfreqFields("hours")}
					</li>

					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.addfreqField.bind(null,"hours")}>
							Add Another Time
						</button>
					</li>
					
					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.showNextStep}>
							Continue
						</button>
					</li>
					
					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.backButton}>
							Go Back
						</button>
					</li>

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
					return <input type="time" className="flex-auto list-item-field" id={i} value={inputs[i]} onChange={this.handleInputChange.bind(this, freqField, "schedule")}/>
						
				} else {
					return <input type="number" className="flex-auto list-item-field" min="1" max="31" id={i} value={inputs[i]} onChange={this.handleInputChange.bind(this, freqField, "schedule")} />
						
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

				<ul className="ul-format-addPres">
					<CheckboxGroup name="weekdays" value={weekdays} onChange={this.handleWeekdaysChange}>
					  <li className="list-item list-item-margin"><Checkbox value="MO"/>Monday</li>
					  <li className="list-item list-item-margin"><Checkbox value="TU"/>Tuesday</li>
					  <li className="list-item list-item-margin"><Checkbox value="WE"/>Wednesday</li>
					  <li className="list-item list-item-margin"><Checkbox value="TH"/>Thursday</li>
					  <li className="list-item list-item-margin"><Checkbox value="FR"/>Friday</li>
					  <li className="list-item list-item-margin"><Checkbox value="SA"/>Saturday</li>
					  <li className="list-item list-item-margin"><Checkbox value="SU"/>Sunday</li>
					</CheckboxGroup>
					
					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.showNextStep}>
							Continue
						</button>
					</li>
					
					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.backButton}>
							Go Back
						</button>
					</li>
				</ul>
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

	renderStepThreeMonthly() {
		if(this.state.step === 3 && this.state.schedule.frequency  === "monthly") {
			return(

				<ul className="ul-format-addPres">
					<li className="list-item list-item-margin">
						<div className="flex-auto list-text" >
							Day of dose:
						</div>
						{this.renderfreqFields("month_days")}
					</li>

					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.addfreqField.bind(null, "month_days")}>
							Add Another Day
						</button>
					</li>
					
					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.showNextStep}>
							Continue
						</button>
					</li>
					
					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.backButton}>
							Go Back
						</button>
					</li>
				</ul>
			)
		}else{
			return null
		}
	}

	renderStepFour() {
		if(this.state.step === 4) {
			return(

				<ul className="ul-format-addPres">
					<li className='list-item list-item-margin'>
						<div className="list-text flex-auto">Feel free to skip this section</div>
					</li>

					<li className="list-item list-item-margin">
						<input className="flex-60 list-item-field" type="text" placeholder="Name of Doctor" name="prescription[doctor]" />
					</li>

					<li className="list-item list-item-margin">
						<div className="flex-auto list-text"> 
							Expires on:
						</div>
						<input className="flex-60 list-item-field" type="date" name="schedule[expiration]" />
					</li>
					
					<li className="list-item list-item-margin">
						<button className="button-format flex-60 list-item-field" onClick={this.backButton}>
						Go Back
						</button>
					</li>

					<li className="list-item list-item-margin">
						<button className="button-format flex-auto list-item-field" onClick={this.handleSubmit}>
							I'm Done 
						</button>
					</li>
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
				{this.state.message ? "Your prescriptions have been updated" : null}

			</div>

		)
	}

}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postPrescriptionEvent,
		forceLogout
	  }, dispatch)
}

const mapStateToProps = (state) => {
  return {account: state.account}
}


export default connect(mapStateToProps, mapDispatchToProps)(AddPrescription)
