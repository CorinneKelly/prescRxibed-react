export default (state={token: "", logged}, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return [action.payload]
    default:
      return state
  }
}
