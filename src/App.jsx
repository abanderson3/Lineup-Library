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
const SpotifyWebApi = require('spotify-web-api-node')


export const App = () => {
  const [ userAccessToken, setAccessToken ] = useState('');
  const [ loggedIn, setIsLoggedIn ] = useState(false);
  const [ bonnarooArtists, setBonnarooArtists ] = useState([])
  const [ fest, selectFest ] = useState('');
  const [ selectedArtists, setSelectedArtists ] = useState([]);

  const signInOnClick = () => {
    window.location='http://localhost:8888/login'
  }

  console.log(selectedArtists)

  useEffect(() => {
    if (location.search) {
      let parsed = queryString.parse(location.search)
      let accessToken = parsed.access_token
      // console.log(accessToken)
      setAccessToken(accessToken)
      setIsLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    axios.get('/bonnarooArtists')
    .then((results) => {
      setBonnarooArtists(results.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [Dashboard])

  const isUserLoggedIn = () => {
    if (loggedIn) {
      return < Dashboard selectedArtists={selectedArtists} setSelectedArtists={ setSelectedArtists } fest={ fest } selectFest={ selectFest } bonnarooArtists={bonnarooArtists}/>
    } else {
      return < LoginButton signInOnClick={signInOnClick} />
    }
  }

  const titleOnClick = () => {
    selectFest('festList')
  }

  // console.log(bonnarooArtists)

  return (
    <div className="main">
      <div onClick={ titleOnClick } className="header">Festival Playlist!!</div>
      <div className="landing-page">
        { isUserLoggedIn() }
      </div>
    </div>

  )
};

{/* <Router>
<Routes>
  <Route exact path='/' element={<LoginButton signInOnClick={signInOnClick}/>}/>
  <Route exact path='dashboard' element={ <Dashboard userAccessToken={userAccessToken}/>}/>
</Routes>
</Router> */}