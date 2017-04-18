import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import App from './App';
import './index.css';


const responseGoogle = (response) => {
  debugger
  axios
  .post('http://localhost:4000/v1/sessions', {account: {googleToken: response.accessToken, googleId: response.googleId}})
  .then(function(response){
    console.log('logged in successfully')
    console.log(response)
  });
}




ReactDOM.render(
  <div>
    <App />
    <GoogleLogin
      //clientId="" add it from evernote
      
      buttonText = "Login with Google"
      responseType
      onSuccess = {responseGoogle}
      onFailure = {responseGoogle}
     />
  </div>,
  document.getElementById('root')
);
