import React, {Component} from 'react'
import MenuItem from './MenuItem'

class BurgerMenu extends Component {

	constructor() {
		super()
		this.state={
			visible: false,
			classToggle: "burger-menu-items"
		}

		this.handleClick = this.handleClick.bind(this)
	}
	
	showMenuItems() {
		if (this.state.visible) {
			
		}
	}

	handleClick() {
		event.preventDefault()
		this.setState({
			visible: !this.state.visible,
			// classToggle: (this.state.classToggle === "burger-menu-items" ? "burger-menu-items-view" : "burger-menu-items")
		})
	}

	render() {
		return (
			<div className="burger-menu">
				<img src="burgerIcon.svg" height="40" width="auto" onClick={this.handleClick} />			
				{this.state.visible ? <MenuItem className={this.state.classToggle}/> : null}
			</div>
		)
	}
}

export default BurgerMenu
