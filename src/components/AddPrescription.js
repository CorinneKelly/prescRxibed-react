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

		this.state={
			step: 1,
			frequency: "daily",
			prescription: {}
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
				hours: ["9:00", "12:00", "18:00"],
				weekdays: [],
				month_days: [],
				expiration_date: "2018-04-19"
			}
		}
		this.props.postPrescriptionEvent(fakeState)//should pass in this.state instead of fakeState

	}

	handleInputChange(field, nestedParent, event){
		debugger
		// event.preventDefault()
		// this.setState({
		// 	{nestedParent}: {...this.state.nestedParent, {field}: event.target.value}
		// })
	}

	handleFrequency() {
		// should display appropriate selections depending on selection value

		var e = document.getElementById("frequency");
		var freq = e.options[e.selectedIndex].value;
		this.setState({
			frequency: freq
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

	renderStepOne(){
		if(this.state.step === 1){
			// sets default start date to today
			let date = new Date()
			let today = moment(date).format('YYYY-MM-DD')
			return(
				<div className="stepOne" >
					<input type="text" placeholder="Name of medicine" name="prescription[name]" onChange={this.handleInputChange.bind(this, "name", "prescription")} /><br />
					Start Date: <input type="date" value={today} name="schedule[startDate]" /><br />
					End Date: <input type="date"  name="schedule[endDate]" /><br />
					<input type="textarea" placeholder="Instructions" name="prescription[instructions]" /><br />
				</div>
			)
		}else{
			return null
		}
	}

	renderStepTwo(){
		if(this.state.step === 2){
			return (
			<div className="stepTwo" >
				<input type="number" placeholder="# per dose?" name="prescription[dosage]" />
				<input type="text" placeholder="units (pill, mL, etc.)" name="prescription[units]" /> <br />
				<input type="number" placeholder="amount per bottle?" name="prescription[quantity]" /><br />
				<input type="number" placeholder="# of refills?" name="prescription[refills]" /><br />
			</div>)
		} else {
		return null
		}
	}

	renderStepThree(){
		if(this.state.step === 3){
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

	renderStepThree_Daily(){
		if(this.state.step === 3 && this.state.frequency  === "daily"){
			return(
				<div className="dailyFrequency" >
					Time of dose: <input type="time" name="schedule[hours][]" /><br/>
					Time of dose: <input type="time" name="schedule[hours][]" /><br/>
					Time of dose: <input type="time" name="schedule[hours][]" /><br/>
					Time of dose: <input type="time" name="schedule[hours][]" />
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
					<input type="checkbox" value="Monday" checked name="schedule[weekdays][]"/> Monday <br />
					<input type="checkbox" value="Tuesday" checked name="schedule[weekdays][]"/> Tuesday <br />
					<input type="checkbox" value="Wednesday" checked name="schedule[weekdays][]"/> Wednesday <br />
					<input type="checkbox" value="Thursday" checked name="schedule[weekdays][]"/> Thursday <br />
					<input type="checkbox" value="Friday" checked name="schedule[weekdays][]"/> Friday <br />
					<input type="checkbox" value="Saturday" checked name="schedule[weekdays][]"/> Saturday <br />
					<input type="checkbox" value="Sunday" checked name="schedule[weekdays][]"/> Sunday <br />
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
					Choose dates:<br/> <input type="number" min="1" max="31" name="schedule[monthDays][]" /><br/>
					<input type="number" min="1" max="31" name="schedule[monthDays][]" /><br/>
					<input type="number" min="1" max="31" name="schedule[monthDays][]" /><br/>
					<input type="number" min="1" max="31" name="schedule[monthDays][]" />
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
					<input type="text" placeholder="Name of Doctor" name="prescription[doctor]" /><br />
					Expiration Date <input type="date" name="schedule[expiration]" /><br />
					<input type="submit" value="I'm Done" />
				</div>
			)
		}else{
			return null
		}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postPrescriptionEvent},
    dispatch
  )
}




export default connect(null, mapDispatchToProps)(AddPrescription)
