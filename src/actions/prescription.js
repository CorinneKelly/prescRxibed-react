import axios from 'axios'
//import { push } from 'react-router-redux'
import {setAuthHeader} from './account'


let config = setAuthHeader()

export const postPrescriptionEvent = (prescriptionData) => {
  let config = setAuthHeader()
  return (dispatch) => {
    axios
    .post('http://localhost:4000/v1/prescriptions', {prescriptionData: prescriptionData}, config)
    .then(
      console.log("successs posted from rails")
      //store.dispatch(push('/foo'))
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
    }
      //store.dispatch(push('/foo'))
    )
  }
}
