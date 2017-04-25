const INITIAL_STATE = {
	allSymptoms: [],
	specificSymptom: {}
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SYMPTOMS":
      return [...state.allSymptoms, action.payload]
    case "SET_SPECIFIC_SYMPTOM":
    	debugger
    	return {...state, specificSymptom: action.payload}
    default:
      return state
  }
}
