import React, {Component} from 'react'

class Prescription extends Component {

	constructor(){
		super()

		this.state = {
			display:""
		}

		this.showSchedule = this.showSchedule.bind(this)
		this.showDetails = this.showDetails.bind(this)
		this.showSymptoms = this.showSymptoms.bind(this)
		this.showDrugInfo = this.showDrugInfo.bind(this)
	}

	showSchedule(){
		//display calendar with scheduled doses
		this.setState({
			display: "schedule"
		})
	}

	renderSchedule(){
		//retrieve and format dosing schedule for this Rx

	}

	showDetails(){
		this.setState({
			display: "details"
		})
	}

	renderDetails(){
		//retrieve and format info about Rx (dose, instructions,
		//when bottle will be empty, expiration date, # pills left, # refills left, doctor's name)

	}

	showSymptoms(){
		this.setState({
			display: "symptoms"
		})
	}


	//diplay list of symptoms being tracked
	//along with opportunity to add symptom
	renderSymptoms(){
		if (this.state.display==="symptoms"){
			//const symptoms = symptom array from api
			let symptoms = []
			let symptomList = symptoms.map((symptom)=>{
				return `<li> ${symptom} </li>`
			})
			symptomList.push('<input type="text" placeholder="Add new symptom"/input>')

			return `<ul>{symptomList}</ul>`
		}else{
			return null
		}
	}

	showDrugInfo(){
		this.setState({
			display: "drugInfo"
		})
	}

	renderDrugInfo(){
		//retrieve and format info about med from drug database api

	}

	render() {
		return (
			<div>

				<div>
				//need to retrieve next scheduled dose info to include in next line
					Schedule: <button onClick={this.showSchedule}> next scheduled dose </button>
				</div>
				<div>
					 <button onClick={this.showDetails}> Prescription Details </button>
				</div>
				<div>
					 <button onClick={this.showSymptoms}> Symptom Tracker </button>
				</div>
				<div>
					<button onClick={this.showDrugInfo}> Drug Information </button>
				</div>
				{this.renderSchedule()}
				{this.renderDetails()}
				{this.renderSymptoms()}
				{this.renderDrugInfo()}

			</div>
		)
	}
}

export default Prescription
