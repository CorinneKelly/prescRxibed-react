import React, { Component } from 'react'
import AddPrescription from './AddPrescription'
import Prescription from './Prescription'
import FullSchedule from './FullSchedule'


class Home extends Component {
	render(){
		return (
			<div className="Home" >
				<AddPrescription  />
				<Prescription  />
				<FullSchedule  />
			</div>
		)
	}
}

export default Home

