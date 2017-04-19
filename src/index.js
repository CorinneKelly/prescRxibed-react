import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import './index.css'
import rootReducer from './reducers'
import { ConnectedApp } from './App'
import AddPrescription from './components/AddPrescription'
import { Home } from './components/Home'
import { Prescription } from './components/Prescription'
import { Symptom } from './components/Symptom'
import { BurgerMenu } from './components/BurgerMenu'
import { NotFound } from './components/NotFound'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
  	<Router >
	  	<div>
        < Route exact path="/" component={ConnectedApp} />
        < Route path="/prescriptions/new" component={AddPrescription} />
        <Route path='/:id' component={Home} />
        <Route path='/prescriptions/:prescription' component={Prescription} />
        <Route path='/prescriptions/:prescription/symptoms/:symptom' component={Symptom} />
        <Route component={NotFound} />
	  	</div>
	  </Router>

  </Provider>,
  document.getElementById('root')
)
