import axios from 'axios'
import moment from 'moment'

export function getJWTToken(response) {
  return (dispatch) => {
    axios
    .post('http://localhost:4000/v1/sessions', {account: {googleToken: response.Zi.access_token, googleId: response.El, name: response.w3.U3}})
    .then(function(response){
      let token = response.data.jwt

      dispatch({
        type: 'SET_TOKEN',
        payload: {
          token: token,
          email: response.data.fullname,
          expiresAt: secondsToExpiration
        }
      })

      let secondsToExpiration =  (moment().unix() + 60*60*1000)
      setTimeout(
        () => {
          console.log("time to log out")
          dispatch({
            type: "EXPIRE_SESSION"
          })
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
  }
}

