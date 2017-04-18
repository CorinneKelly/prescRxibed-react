 export default (state={token: ""}, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return [action.payload]
    default:
      return state
  }
}
