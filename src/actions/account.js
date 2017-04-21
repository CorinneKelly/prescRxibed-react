import axios from 'axios'

export function getJWTToken(response) {
  debugger
  return (dispatch) => {
    axios
    .post('http://localhost:4000/v1/sessions', {account: {googleToken: response.Zi.access_token, googleId: response.El, name: response.w3.U3}})
    .then(function(response){
      let token = response.data.jwt
      localStorage.setItem('token', token)
      dispatch({
        type: 'SET_TOKEN',
        payload: {
          token: token,
          fullname: response.data.fullname
        }
      })
    })
  }
}

export function setAuthHeader(){
  return {headers: {"token": localStorage.token}}
}
