 export default (state={token: null, fullname: null}, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload
    default:
      return state
  }
}
