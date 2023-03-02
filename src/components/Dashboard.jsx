import React, {useState, useEffect } from 'react';
import axios from 'axios';
import ArtistList from './ArtistList.jsx'
import FestivalList from './FestivalList'

const Dashboard = ({bonnarooArtists, fest, selectFest, selectedArtists, setSelectedArtists}) => {


  const isFestSelected = () => {
    if (fest === 'bonnaroo') {
      return < ArtistList selectedArtists={ selectedArtists } setSelectedArtists={ setSelectedArtists } bonnarooArtists={ bonnarooArtists }/>
    } else if (fest = 'festList'){
      return < FestivalList selectFest={selectFest} fest={fest}/>
    }
  }

  return (
    <div>
      { isFestSelected() }
    </div>
  )
}

export default Dashboard
