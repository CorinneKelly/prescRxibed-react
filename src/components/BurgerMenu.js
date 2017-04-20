import React, {Component} from 'react'
import MenuItem from './MenuItem'

class BurgerMenu extends Component {

	constructor(props) {
		super(props)

	}

	render() {
		return (
			<div className={"burger-menu"}>
				<img id="menu-activator" src={this.props.menuIcon} height="40" width="auto" onClick={this.props.handleClick} />			
				<MenuItem className="burger-menu-items" />
			</div>
		)
	}
}

export default BurgerMenu
