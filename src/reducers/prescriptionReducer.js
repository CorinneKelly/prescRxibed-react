 export default (state={allPrescriptions: []}, action) => {
  switch (action.type) {
    case "SET_PRESCRIPTIONS":
      return action.payload
    default:
      return state
  }
}
