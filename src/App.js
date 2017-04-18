import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleLogin from 'react-google-login'

import './App.css'
import { bindActionCreators } from 'redux'
import { getJWTToken } from './actions/account'
import { connect } from 'react-redux'
import './App.css'
import Home from './components/Home'

// make sure store is right later

class App extends Component {

  constructor() {
    super()
  }

  isloggedin() {
    if (this.props.account) {
      return <Home />
    } else {
      return (<GoogleLogin
        clientId= "60833227507-6ncphb190ddr1ma1bq5k8ap4piv2ui37.apps.googleusercontent.com"
        buttonText = "Login with Google"
        onSuccess = {this.props.getJWTToken}
        onFailure = {this.props.getJWTToken}
      />)
    }
  }

  render() {
    return (
      <div className="App" >
        {this.isloggedin()}
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {account: state.account}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getJWTToken},
    dispatch
  )
}
export const ConnnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

