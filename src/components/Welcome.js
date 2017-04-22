import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {GoogleLogin} from 'react-google-login-component';
import { bindActionCreators } from 'redux'
import { getJWTToken } from '../actions/account'
import { connect } from 'react-redux'

class Welcome extends Component {
	render(){
		return (
			<div className="Welcome" >
        <h1>Welcome to Your Prescription Tracker</h1>

        <h3>Connect with Google to start managing your prescriptions</h3>


				<GoogleLogin socialId="60833227507-8v5bc1e54tjf098p279be3kn7prei20v.apps.googleusercontent.com"
										class="google-login"
										scope="profile"
										responseHandler={this.props.getJWTToken}
										buttonText="Connect With Google"/>

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
