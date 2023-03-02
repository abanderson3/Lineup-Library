import React from 'react';
import axios from 'axios';

const IndividualArtist = ({ artist, selectedArtists, setSelectedArtists }) => {

  // console.log('single artist test', artist)

  // STILL HAVE A BUG WHEN TRYING TO REMOVE FINAL ARTIST FROM SELECTED ARTISTS

  const artistOnClick = () => {
    if (selectedArtists.filter(id => (id === artist.spotify_id)).length) {
      const index = selectedArtists.indexOf(artist.spotify_id)
      const artistsCopy = selectedArtists.slice();
      artistsCopy.splice(index, 1)
      setSelectedArtists(artistsCopy)
    } else if (selectedArtists.length === 1 && selectedArtists[0] === artist.spotify_id) {
      setSelectedArtists([])
    } else if (selectedArtists.indexOf(artist.spotify_id) === -1){
      setSelectedArtists([artist.spotify_id, ...selectedArtists])
    }
  }



  // function toggleCheckboxSelection(event) {
  //   // get the target element of the event
  //   const target = event.target;

  //   // check if the target is a div containing a checkbox
  //   if (target.nodeName.toLowerCase() === 'div' && target.querySelector('input[type="checkbox"]')) {
  //     // get the checkbox element
  //     const checkbox = target.querySelector('input[type="checkbox"]');

  //     // toggle the checkbox selection
  //     checkbox.checked = !checkbox.checked;
  //   }
  // }






  // function toggleCheckboxSelection(event) {   ---> onClick={(event) => toggleCheckboxSelection(event)}
  //   // get the target element of the event
  //   const target = event.target;

  //   // check if the target is a div containing a checkbox
  //   if (target.nodeName.toLowerCase() === 'div' && target.querySelector('input[type="checkbox"]')) {
  //     // get the checkbox element
  //     const checkbox = target.querySelector('input[type="checkbox"]');

  //     // toggle the checkbox selection
  //     checkbox.checked = !checkbox.checked;

  //     // toggle the background color of the parent div
  //     const parentDiv = target.closest('.single-artist');
  //     if (parentDiv) {
  //       parentDiv.classList.toggle('selected');
  //     }
  //   }
  // }

  function handleArtistClick(event) {
    const target = event.target;
    const parentDiv = target.closest('.single-artist');

    if (parentDiv) {
      parentDiv.classList.toggle('selected');
    }
  }

  return (
    <div onClick={handleArtistClick} className="row">
      <div onClick={artistOnClick} className="single-artist">
        <div className="artist-name">
          {/* <input id="check" type="checkbox" /> */}
          &nbsp;{artist.name}
        </div>
        <div className="artist-genres">
          {artist.genres.map((genre) => {
            return <div className="genre">{genre}</div>;
          })}
        </div>
        <div className="artist-popularity">{artist.popularity + '%'}</div>
      </div>
    </div>
  );
}

export default IndividualArtist;