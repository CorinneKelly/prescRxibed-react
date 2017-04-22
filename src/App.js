import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleLogin from 'react-google-login'
import './App.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './App.css'
import Home from './components/Home'
import Welcome from './components/Welcome'
import BurgerMenu from './components/BurgerMenu'

class App extends Component {

  isLoggedIn() {
    if (this.props.account.token) {
      return <Home />
    } else {
      return <Welcome />
    }
  }
  

  

  render() {
    return (
        
      <div className="App" >
        <BurgerMenu />
        {this.isLoggedIn()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {account: state.account}
}


export const ConnectedApp = connect(mapStateToProps)(App)
