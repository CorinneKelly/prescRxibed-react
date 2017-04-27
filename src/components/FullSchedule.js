import React, { Component } from 'react'
import BurgerMenu from './BurgerMenu'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'
BigCalendar.momentLocalizer(moment)
import { getEvents } from '../actions/prescription'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
require('react-big-calendar/lib/css/react-big-calendar.css')

class FullSchedule extends Component {

	componentWillMount () {
		this.props.getEvents()
	}

	render() {
		return (
			<BigCalendar
				style={{height: '420px'}}
				events={this.props.events.events}
			/>
		)
	}
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getEvents},
    dispatch
  )
}

const mapStateToProps = (state) => {
  return {events: state.events}
}




export default connect(mapStateToProps, mapDispatchToProps)(FullSchedule)
