import React from 'react';
import IndividualArtist from './IndividualArtist.jsx';
import axios from 'axios';

const ArtistList = ({bonnarooArtists, selectedArtists, setSelectedArtists}) => {

  const createPlaylistOnClick = () => {
    // need to create playlist with call to spotify api
    // request top tracks from db
    // load top tracks into playlist with call to spotify api
    axios.get('/selectedArtistTracks', {
      params: {
        artistIds: selectedArtists
      }
    })
      .then((result) => {
        console.log('FE', result)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="dashboard">
      <div className='dashboard-nav'>You are logged in, this is the dashboard.</div>
      <div className='artist-count'>There are {bonnarooArtists.length} artists playing at Bonnaroo</div>
      <button onClick={ createPlaylistOnClick }>Create Playlist</button>
      <div className="artist-list">
        <div className="artist-headers">
          <div className="col1">Artist Name</div>
          <div className="col2">Genres</div>
          <div className="col3">Popularity Ranking</div>
        </div>
        {bonnarooArtists && bonnarooArtists.map((artist) => {
          return < IndividualArtist selectedArtists={ selectedArtists } setSelectedArtists={ setSelectedArtists } artist={artist.json_build_object} />
        })}
      </div>
    </div>

  )
}

export default ArtistList;