import axios from 'axios'
import moment from 'moment'
import { store } from '../index'
import { push } from 'react-router-redux'



export function getJWTToken(response) {
  return (dispatch) => {
    axios
    .post('http://localhost:4000/v1/sessions', {account: {googleToken: response.Zi.access_token, googleId: response.El, name: response.w3.U3}})
    .then(function(response){
      let token = response.data.jwt
      let secondsToExpiration =  (moment().unix() + 60*60*1000)

      dispatch({
        type: 'SET_TOKEN',
        payload: {
          token: token,
          email: response.data.fullname,
          expiresAt: secondsToExpiration
        }
      })

      setTimeout(
        () => {
          console.log("time to log out")
          dispatch({
            type: "EXPIRE_SESSION"
          })
          store.dispatch(push('/'))

        }, (secondsToExpiration - moment().unix())
      )
      console.log(secondsToExpiration)
      console.log(secondsToExpiration - moment().unix())
    })
  }
}

export function setAuthHeader(){
  return {headers: {"token": localStorage.getItem("token")}}
}

export function handleLogout(){
  return(dispatch) => {
    dispatch({
      type: "EXPIRE_SESSION"
    })
    store.dispatch(push('/'))
  }
}
