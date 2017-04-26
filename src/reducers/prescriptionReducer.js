 export default (state={allPrescriptions: [], data: {}}, action) => {
  switch (action.type) {
    case "SET_PRESCRIPTIONS":
      return action.payload
     case "SET_PRESCRIPTION":
     return action.payload
    default:
      return state
  }
}
