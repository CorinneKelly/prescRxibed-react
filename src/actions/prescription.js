import axios from 'axios'
//import { push } from 'react-router-redux'
import {setAuthHeader} from './account'

let config = setAuthHeader()

export const postPrescriptionEvent = (prescriptionData) => {
  return (dispatch) => {
    debugger
    axios
    .post('http://localhost:4000/v1/prescriptions', {prescriptionData: prescriptionData}, config)
    .then(
      console.log("successs posted from rails")
      //store.dispatch(push('/foo'))
    )
  }
}
