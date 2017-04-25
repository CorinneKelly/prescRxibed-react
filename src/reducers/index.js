import {combineReducers} from 'redux'
import {routerReducer } from 'react-router-redux'

import accountReducer from './accountReducer'
import prescriptionReducer from './prescriptionReducer'
import symptomReducer from './symptomReducer'

export default combineReducers({
  account: accountReducer,
  prescription: prescriptionReducer,
  symptom: symptomReducer,
  router: routerReducer,
})
