import React, {useState, useEffect } from 'react';
import axios from 'axios';
import ArtistList from './ArtistList.jsx'

const Dashboard = ({bonnarooArtists}) => {


  return (
    <div>
      You are logged in, this is the dashboard.
      <div>There are {bonnarooArtists.length} artists playing at Bonnaroo</div>
      < ArtistList />
    </div>
  )
}

export default Dashboard