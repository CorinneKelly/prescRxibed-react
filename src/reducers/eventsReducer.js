export default (state={events: []}, action) => {
 switch (action.type) {
   case "GET_EVENTS":
    debugger
    return action.payload
   default:
     return state
 }
}
