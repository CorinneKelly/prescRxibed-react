 const INITIAL_STATE = {
 	token: localStorage.getItem('token'),
 	email: null,
 	expiresAt: localStorage.getItem('expiresAt')
 }

 export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_TOKEN":
    	localStorage.setItem('token', action.payload.token)
    	localStorage.setItem('expiresAt', action.payload.expiresAt)
    	localStorage.setItem('email', action.payload.email)
      return action.payload

    case "EXPIRE_SESSION":
    	localStorage.clear()
    	return INITIAL_STATE
    default:
      return state
  }
}
