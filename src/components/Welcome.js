import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { GoogleLogin } from 'react-google-login-component';
import { bindActionCreators } from 'redux'
import { getJWTToken } from '../actions/account'
import { connect } from 'react-redux'
import '../stylesheets/welcome.css'

class Welcome extends Component {
	constructor(){
		super()
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(){
		event.preventDefault
	}

	render(){
		return (
			<div className="welcome-wrapper" >
			<ul>
			<li className="list-item">
				<div className="flex-auto">
	        <h1>PrescR<sub>x</sub>ibed</h1>

	        <h3>Connect with Google</h3>
	        <h3>to start managing your prescriptions</h3>
				</div>
			</li>

			<li className="list-item">
				<div className="flex-auto">
					<GoogleLogin socialId="60833227507-8v5bc1e54tjf098p279be3kn7prei20v.apps.googleusercontent.com"
										class="google-login"
										scope="profile"
										responseHandler={this.props.getJWTToken}
										buttonText="Connect With Google"
										/>
					</div>

				</li>
			</ul>
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
