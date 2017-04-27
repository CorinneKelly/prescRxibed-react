import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import GoogleLogin from 'react-google-login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from './components/Home'
import Welcome from './components/Welcome'
import BurgerMenu from './components/BurgerMenu'
import { forceLogout } from './actions/account'


class App extends Component {

  isLoggedIn() {
    if (this.props.account.token) {
      return <Home />
    } else {
      return <Welcome />
    }
  }

  componentWillMount(){
    this.props.forceLogout(this.props.account.expiresAt)
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    forceLogout
	  }, dispatch)
}

export const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
