import React, {Component} from 'react'
import MenuItem from './MenuItem'

class BurgerMenu extends Component {

	constructor() {
		super()
		this.handleClick = this.handleClick.bind(this)
	}
	
	showMenuItems() {

	}

	handleClick() {
		event.preventDefault()
		this.setState({
			visible: true
		})
	}

	render() {
		return (
			<div>
				<img src="burgerIcon.svg" height="60" width="auto" onClick={this.handleClick} />			
				{this.showMenuItems()}
			</div>
		)
	}
}

export default BurgerMenu
