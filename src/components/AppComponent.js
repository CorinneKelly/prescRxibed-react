import React, { Component } from 'react'
import AddPrescription from './AddPrescription'
import Prescription from './Prescription'
import FullSchedule from './FullSchedule'

// make sure store is right later

class AppComponent extends Component {
	render(){
		return (
			<div className="AppComponent" >
				<AddPrescription  />
				<Prescription  />
				<FullSchedule  />
			</div>
		)
	}
}

export default AppComponent