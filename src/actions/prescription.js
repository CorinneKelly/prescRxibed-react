import axios from 'axios'
import { push } from 'react-router-redux'
import { setAuthHeader } from './account'
import { store } from '../index'


export const postPrescriptionEvent = (prescriptionData) => {
  return (dispatch) => {
    let config = setAuthHeader()
    axios
    .post('http://localhost:4000/v1/prescriptions', {prescriptionData: prescriptionData}, config)
    .then(

      store.dispatch(push('/')),
      alert("You just added a prescription!")
    )
  }
}

export const getPrescriptions = () => {
  return (dispatch) => {
    let config = setAuthHeader()
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
