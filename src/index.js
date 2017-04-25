import React from 'react'
import ReactDOM from 'react-dom'

import createHistory from 'history/createBrowserHistory'
import {
  ConnectedRouter as Router,
  routerMiddleware,
  Link
} from 'react-router-redux'
import { Route } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import './index.css'
import rootReducer from './reducers'
import { ConnectedApp } from './App'
import AddPrescription from './components/AddPrescription'
import { Home } from './components/Home'
import Prescription from './components/Prescription'
import Symptom from './components/Symptom'
import SymptomForm from './components/SymptomForm'
import { BurgerMenu } from './components/BurgerMenu'
import { NotFound } from './components/NotFound'
import { setAuthHeader, getJWTToken } from './actions/account'
import { getPrescriptions, postPrescriptionEvent } from './actions/prescription'

// npm i --save react-router-redux@next react-router-dom
// import createHistory from 'history/createBrowserHistory'
// import {
//   ConnectedRouter as Router,
//   routerMiddleware
// } from 'react-router-redux'
// import { Route } from 'react-router-dom'

const history = createHistory()
const rMiddleware = routerMiddleware(history)
export const store = createStore(rootReducer, applyMiddleware(thunk, rMiddleware))

setAuthHeader()
// getJWTToken(response)
getPrescriptions()
// postPrescriptionEvent(presData)


ReactDOM.render(
  <Provider store={store}>
  	<Router history={history}>
      <div>
        < Route exact path="/" component={ConnectedApp} />
        < Route path='/add-prescription' component={AddPrescription}  />
        <Route path='/prescriptions/:prescriptionId' component={Prescription} />
        <Route path='/symptomform' component={SymptomForm} />
        <Route path='/symptomform-check' component={SymptomForm} />
        <Route path='/symptom-check' component={Symptom} />
        <Route path='/home' component={Home} />
        <Route path='/symptom' component={Symptom} />
        <Route component={NotFound} />
      </div>
	  </Router>

  </Provider>,
  document.getElementById('root')
)
