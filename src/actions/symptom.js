import axios from 'axios'
import { push } from 'react-router-redux'
import { setAuthHeader } from './account'
import { store } from '../index'


export const postSymptomEvent = (symptomData, prescriptionId) => {
  return (dispatch) => {
    let config = setAuthHeader()
    axios
    .post('http://localhost:4000/v1/symptoms', {symptomData: symptomData, prescriptionId: prescriptionId}, config)
    .then(
        console.log("success"),
        store.dispatch(push(`/prescriptions/${prescriptionId}`)),
        alert("You just added a symptom!")
    )
  }
}


export const getSymptoms = (prescriptionId) => {
  return (dispatch) => {
    let config = setAuthHeader()
    axios
    .get(`http://localhost:4000/v1/prescriptions/${prescriptionId}`, config)
    .then(function(response){
        console.log(response)
        let allSymptoms = response.data
        
      dispatch({
        type: 'SET_SYMPTOMS',
        payload: {
          allSymptoms: allSymptoms
        }
      })
    })
  }
}

export const getSymptom = (symptomId) => {
  return (dispatch) => {
    let config = setAuthHeader()
    axios
    .get(`http://localhost:4000/v1/symptoms/${symptomId}`, config)
    .then(function(response){
      let specificSymptom = response.data
      dispatch({
        type: 'SET_SPECIFIC_SYMPTOM',
        payload: {
          specificSymptom: specificSymptom
        }
      })
    })
  }
}