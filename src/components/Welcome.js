import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleLogin from 'react-google-login'
import { bindActionCreators } from 'redux'
import { getJWTToken } from '../actions/account'
import { connect } from 'react-redux'

class Welcome extends Component {
	render(){
		return (
			<div className="Welcome" >
        <h1>Welcome to Your Prescription Tracker</h1>
        <h3>Login with Google to start managing your prescriptions</h3>
        <GoogleLogin
          clientId= "60833227507-11381756v8udc4kutj454916kl3m0ta8.apps.googleusercontent.com"
          buttonText = "Login with Google"
          onSuccess = {()=>console.log("Failed")}
          onFailure = {()=>console.log("Failed")}

        />
			</div>
		)
	}
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getJWTToken},
    dispatch
  )
}

export default connect(null, mapDispatchToProps)(Welcome)
