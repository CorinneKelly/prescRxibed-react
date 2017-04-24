import axios from 'axios'
import { push } from 'react-router-redux'
import { setAuthHeader } from './account'
import { store } from '../index'

export const postSymptomEvent = (symptomData) => {
  return (dispatch) => {
    axios
    .post('http://localhost:4000/v1/symptoms', {symptomData: symptomData}, config)
    .then(
      store.dispatch(push('/'))
    )
  }
}


export const getPrescriptions = () => {
  return (dispatch) => {
    axios
    .get('http://localhost:4000/v1/symptoms', config)
    .then(function(response){
        console.log(response)
        
      dispatch({
        type: 'SET_SYMPTOMS',
        payload: {
          // allPrescriptions: allPrescriptions
        }
      })
    })
  }
}