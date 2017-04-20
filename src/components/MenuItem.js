import React, {Component} from 'react'

class MenuItem extends Component {
	render() {
		return (
			<ul className="burger-menu-list" >
				<li><a href="/logout" >Log Out</a></li>
				<li><a href="/">Home</a></li>
			</ul>
		)
	}
}

export default MenuItem
