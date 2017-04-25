export default (state={events: []}, action) => {
 switch (action.type) {
   case "GET_EVENTS":
    return action.payload
   default:
     return state
 }
}
