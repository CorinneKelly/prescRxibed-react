import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GoogleLogin from 'react-google-login'
import './App.css';
import { bindActionCreators } from 'redux';
import { getJWTToken } from './actions/account';
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleLogin
          clientId= "60833227507-6ncphb190ddr1ma1bq5k8ap4piv2ui37.apps.googleusercontent.com"
          buttonText = "Login with Google"
          onSuccess = {this.props.getJWTToken}
          onFailure = {this.props.getJWTToken}
         />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getJWTToken},
    dispatch
  )
}
export const ConnnectedApp = connect(null, mapDispatchToProps)(App);
