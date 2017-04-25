import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleLogout} from '../actions/account'


class MenuItem extends Component {

	constructor(){
		super()
		this.handleLogoutCallBack = this.handleLogoutCallBack.bind(this)
	}

	handleLogoutCallBack(event){
		event.preventDefault()
		this.props.handleLogout()
	}

	render() {

		return (
			<ul className="burger-menu-list" >
				<li ><a className="burger-menu-list-items" href="/logout" onClick={this.handleLogoutCallBack}>Log Out</a></li>
				<li><a className="burger-menu-list-items" href="/">Home</a></li>
			</ul>
		)
	}
}


const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		handleLogout
	}, dispatch)
}

export default connect(null, mapDispatchToProps)(MenuItem)
