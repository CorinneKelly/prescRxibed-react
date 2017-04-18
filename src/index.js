import React from 'react';
import ReactDOM from 'react-dom';
import {ConnnectedApp} from './App';
import './index.css';
import { createStore, applyMiddleware } from 'redux'
import { Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'


const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <ConnnectedApp />
  </Provider>,
  document.getElementById('root')
)
