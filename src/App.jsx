import React, { useState, useEffect } from 'react';
import queryString from 'query-string'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate
} from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx'
import LoginButton from './components/LoginButton.jsx'


export const App = () => {
  const [ userAccessToken, setAccessToken ] = useState('');
  const [ loggedIn, setIsLoggedIn ] = useState(false);

  const signInOnClick = () => {
    window.location='http://localhost:8888/login'
  }

  useEffect(() => {
    if (location.search) {
      let parsed = queryString.parse(location.search)
      let accessToken = parsed.access_token
      // console.log(accessToken)
      setAccessToken(accessToken)
      setIsLoggedIn(true)
    }
  }, [])

  const userIsLoggedIn = () => {
    if (loggedIn) {
      return < Dashboard />
    } else {
      return <LoginButton signInOnClick={signInOnClick}/>
    }
  }


  return (
    <div>
      <h1>Festival Playlist!</h1>
      {userIsLoggedIn()}
    </div>

  )
};

{/* <Router>
<Routes>
  <Route exact path='/' element={<LoginButton signInOnClick={signInOnClick}/>}/>
  <Route exact path='dashboard' element={ <Dashboard userAccessToken={userAccessToken}/>}/>
</Routes>
</Router> */}