import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleLogin from 'react-google-login'
import './App.css'
import AddPrescription from './components/AddPrescription'
import Prescription from './components/Prescription'
import FullSchedule from './components/FullSchedule'

// make sure store is right later

class App extends Component {
	render(){
		return (
			<div className="App" >
				<AddPrescription  />
				<Prescription  />
				<FullSchedule  />
			</div>
		)
	}
}

export default App