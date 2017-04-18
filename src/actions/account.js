import axios from 'axios'

export function getJWTToken(response) {
  return (dispatch) => {
    axios
    .post('http://localhost:4000/v1/sessions', {account: {googleToken: response.accessToken, googleId: response.googleId, name: response.profileObj.name}})
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
