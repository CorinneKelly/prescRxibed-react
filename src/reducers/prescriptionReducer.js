 export default (state={allPrescriptions: null}, action) => {
  switch (action.type) {
    case "SET_PRESCRIPTIONS":
      return action.payload
    default:
      return state
  }
}
