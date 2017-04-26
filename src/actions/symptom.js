import axios from 'axios'
import { push } from 'react-router-redux'
import { setAuthHeader } from './account'
import { store } from '../index'


export const postSymptomEvent = (symptomData) => {
  return (dispatch) => {
    let config = setAuthHeader()
    if (symptomData.prescriptionId){
      axios
      .post('http://localhost:4000/v1/symptoms', {symptomData: symptomData}, config)
      .then(
          console.log("success"),
          store.dispatch(push(`/prescriptions/${symptomData.prescriptionId}`)),
          alert("You just added a symptom!")
      )
    } else {
      axios
      .post('http://localhost:4000/v1/symptom_logs', {symptomData: symptomData}, config)
      .then(function(response) {
          console.log("success")
          let specificSymptom = response.data
          dispatch({
            type: 'SET_SPECIFIC_SYMPTOM',
            payload: {
              specificSymptom: specificSymptom.symptom,
              symptomLogs: specificSymptom.symptomLogs
            }
          })
          store.dispatch(push(`/symptoms/${symptomData.symptomId}`))
          alert("You just added a symptom Log!")
      })
    }
  }
}


export const getSymptoms = (prescriptionId) => {
  return (dispatch) => {
    let config = setAuthHeader()
    axios
    .get(`http://localhost:4000/v1/prescriptions/${prescriptionId}`, config)
    .then(function(response){
        console.log("get symptoms worked")
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
          specificSymptom: specificSymptom.symptom,
          symptomLogs: specificSymptom.symptomLogs
        }
      })
    })
  }
}
