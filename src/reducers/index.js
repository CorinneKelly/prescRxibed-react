import {combineReducers} from 'redux'
import {routerReducer } from 'react-router-redux'
import accountReducer from './accountReducer'
import eventsReducer from './eventsReducer'
import prescriptionReducer from './prescriptionReducer'

export default combineReducers({
  account: accountReducer,
  prescription: prescriptionReducer,
  router: routerReducer,
  events: eventsReducer
})
