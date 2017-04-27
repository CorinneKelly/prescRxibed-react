import axios from 'axios'
import { push } from 'react-router-redux'
import { setAuthHeader } from './account'
import { store } from '../index'





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

export const deleteSymp = (sympID) => {
  let config = setAuthHeader()
  config.headers['Content-Type'] = 'application/json'
  return (dispatch) => {
    axios
    .delete(`http://localhost:4000/v1/symptoms/${sympID}`, config, 'Access-Control-Allow-Origin')
    .then(function(response){
      console.log("delet symp request went thru")
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
