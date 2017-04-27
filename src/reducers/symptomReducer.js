const INITIAL_STATE = {
	allSymptoms: [],
	specificSymptom: {},
	symptomLogs: []
}

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SYMPTOMS":
      return Object.assign({}, state, {allSymptoms: action.payload})
    case "SET_SPECIFIC_SYMPTOM":
    	return Object.assign({}, state, {specificSymptom: action.payload.symptom, symptomLogs:  action.payload.symptomLogs})
    default:
      return state
  }
}
