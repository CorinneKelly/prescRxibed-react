 const initial = () => {
 	return {
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
 	  expiresAt: localStorage.getItem('expiresAt')
  }
 }

 export default (state=initial(), action) => {
  switch (action.type) {
    case "SET_TOKEN":
    	localStorage.setItem('token', action.payload.token)
    	localStorage.setItem('expiresAt', action.payload.expiresAt)
    	localStorage.setItem('email', action.payload.email)
      return action.payload

    case "EXPIRE_SESSION":
    	localStorage.clear()
    	return initial()
    default:
      return state
  }
}
