 export default (state={allPrescriptions: [], specificPrescription: {}}, action) => {
  switch (action.type) {
    case "SET_PRESCRIPTIONS":
      return Object.assign({}, state, {allPrescriptions: action.payload})
     case "SET_PRESCRIPTION":
     return Object.assign({}, state, {specificPrescription: action.payload})
    default:
      return state
  }
}
