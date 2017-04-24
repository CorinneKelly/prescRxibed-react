import {combineReducers} from 'redux'
import {routerReducer } from 'react-router-redux'

import accountReducer from './accountReducer'
import eventsReducer from './eventsReducer'

export default combineReducers({
  account: accountReducer,
  router: routerReducer,
  events: eventsReducer
})
