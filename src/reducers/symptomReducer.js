 export default (state={allSymptoms: []}, action) => {
  switch (action.type) {
    case "SET_SYMPTOMS":
      return action.payload
    case "SET_SPECIFIC_SYMPTOM":
    	return action.payload
    default:
      return state
  }
}
