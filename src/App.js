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

  constructor() {
    super()
    this.state = {
      menuOpened: false,
      menuIcon: "burgerIcon.svg"
    }
    this.exposeBurgerMenu = this.exposeBurgerMenu.bind(this)
  }

  isLoggedIn() {
    if (this.props.account.token) {
      return <Home />
    } else {
      return <Home />
    }
  }
  
  exposeBurgerMenu() {
    
    if(this.state.menuOpened) {
      document.getElementById("root").style.transform = "translate(0, 0)"
      this.setState({
        menuOpened: false,
        menuIcon: "burgerIcon.svg"
      })      
    } else {
      document.getElementById("root").style.transform = "translate(200px, 0)"
      this.setState({
        menuOpened: true,
        menuIcon: "x.svg"
      })
      
    }

  }
  

  render() {
    return (
        
      <div className="App" >
        <BurgerMenu handleClick={this.exposeBurgerMenu} menuIcon={this.state.menuIcon} />
        {this.isLoggedIn()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {account: state.account}
}


export const ConnectedApp = connect(mapStateToProps)(App)
