 export default (state={token: localStorage.getItem('token'), fullname: null}, action) => {
  switch (action.type) {
    case "SET_TOKEN":
    	localStorage.setItem('token', action.payload.token)
      return action.payload
    default:
      return state
  }
}
