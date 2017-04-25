import axios from 'axios'
import { push } from 'react-router-redux'
import { setAuthHeader } from './account'
import { store } from '../index'


export const postPrescriptionEvent = (prescriptionData) => {
  let config = setAuthHeader()
  return (dispatch) => {
    axios
    .post('http://localhost:4000/v1/prescriptions', {prescriptionData: prescriptionData}, config)
    .then(
      store.dispatch(push('/'))
    )
  }
}


export const getEvents = () => {
  let config = setAuthHeader()
  return (dispatch) => {
    axios
    .get('http://localhost:4000/v1/events', config)
    .then((response)=>{
      let events = response.data.response.items.map((event)=>{
        return {
          start: event.start.dateTime,
          end: event.end.dateTime,
          title: event.summary
        }
      })
      dispatch({
        type: 'GET_EVENTS',
        payload: {
          events: events
        }
      })
    })
  }
}

export const getPrescriptions = () => {
  return (dispatch) => {
    axios
    .get('http://localhost:4000/v1/prescriptions', config)
    .then(function(response){
    	console.log("you hit that thing, its just a matter of time")
    	let allPrescriptions = response.data
      dispatch({
        type: 'SET_PRESCRIPTIONS',
        payload: {
          allPrescriptions: allPrescriptions
        }
      })
    })
  }
}

