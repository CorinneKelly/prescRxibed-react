import React, {Component} from 'react'

class MenuItem extends Component {
	render() {
		return (
			<ul className="burger-menu-list" >
				<li ><a className="burger-menu-list-items" href="/logout" >Log Out</a></li>
				<li><a className="burger-menu-list-items" href="/">Home</a></li>
			</ul>
		)
	}
}

export default MenuItem
