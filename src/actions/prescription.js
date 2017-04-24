import axios from 'axios'
import { push } from 'react-router-redux'
import { setAuthHeader } from './account'
import { store } from '../index'

let config = setAuthHeader()

export const postPrescriptionEvent = (prescriptionData) => {
  return (dispatch) => {
    axios
    .post('http://localhost:4000/v1/prescriptions', {prescriptionData: prescriptionData}, config)
    .then(
      store.dispatch(push('/'))
    )
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

// export function getJWTToken(response) {
//   return (dispatch) => {
//     axios
//     .post('http://localhost:4000/v1/sessions', {account: {googleToken: response.Zi.access_token, googleId: response.El, name: response.w3.U3}})
//     .then(function(response){
//       let token = response.data.jwt
//       localStorage.setItem('token', token)
//       dispatch({
//         type: 'SET_TOKEN',
//         payload: {
//           token: token,
//           fullname: response.data.fullname
//         }
//       })
//     })
//   }
// }

