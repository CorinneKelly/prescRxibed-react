import React, {Component} from 'react'
import MenuItem from './MenuItem'

class BurgerMenu extends Component {

	constructor(props) {
		super(props)
		  this.state = {
	      menuOpened: false,
	      menuIcon: "burgerIcon.svg"
	    }

	    this.exposeBurgerMenu = this.exposeBurgerMenu.bind(this)
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
			<div className={"burger-menu"}>
				<img id="menu-activator" src={this.state.menuIcon} height="40" width="auto" onClick={this.exposeBurgerMenu} />			
				<MenuItem />
			</div>
		)
	}
}

export default BurgerMenu
