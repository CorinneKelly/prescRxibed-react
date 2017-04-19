import {combineReducers} from 'redux'
import {routerReducer } from 'react-router-redux'

import accountReducer from './accountReducer'

export default combineReducers({
  account: accountReducer,
  router: routerReducer,
})
