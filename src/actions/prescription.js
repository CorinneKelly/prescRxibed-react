import axios from 'axios'
import { push } from 'react-router-redux'
import { setAuthHeader } from './account'
import { store } from '../index'


export const postPrescriptionEvent = (prescriptionData) => {
  let config = setAuthHeader()
  return (dispatch) => {
    let config = setAuthHeader()
    axios
    .post('http://localhost:4000/v1/prescriptions', {prescriptionData: prescriptionData}, config)
    .then(
      store.dispatch(push('/')),
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
    let config = setAuthHeader()
    axios
    .get('http://localhost:4000/v1/prescriptions', config)
    .then(function(response){
    	let allPrescriptions = response.data
      dispatch({
        type: 'SET_PRESCRIPTIONS',
        payload: allPrescriptions
      })
    })
  }
}

export const getPrescription = (prescriptionId) => {
  return (dispatch) => {
    let config = setAuthHeader()
    axios
    .get(`http://localhost:4000/v1/prescriptions/${prescriptionId}`, config)
    .then(function(response){
      console.log("you hit that thing, its just a matter of time")
      let data = response.data
      dispatch({
        type: 'SET_PRESCRIPTION',
        payload: data.prescription
      })
    })
  }
}

export const deletePrescription = (prescriptionId) => {
    let config = setAuthHeader()
    config.headers['Content-Type'] = 'application/json'
  return (dispatch) => {
    axios
    .delete(`http://localhost:4000/v1/prescriptions/${prescriptionId}`, config, 'Access-Control-Allow-Origin')
    .then(function(response){
      console.log("give yourself a round of applause")
      let allPrescriptions = response.data
      dispatch({
        type: 'SET_PRESCRIPTIONS',
        payload: allPrescriptions
      })
    })
  }
}
