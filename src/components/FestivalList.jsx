import React from 'react';
import BonnarooLineup from './../../images/bonnaroo.png'
import OkeeLineup from './../../images/okee.jpg'
import EForestLineup from './../../images/Eforest.jpg'
import UltraLineup from './../../images/ultra.jpg'
import RollingLoudLineup from './../../images/rollingLoud.jpg'

const FestivalList = ({fest, selectFest}) => {

  const bonnarooCardOnClick = () => {
    selectFest('bonnaroo')
  }

  const okeeCardOnClick = () => {

  }

  const eForestOnClick = () => {

  }

  const ultraOnClick = () => {

  }

  const rollingLoudOnClick = () => {

  }


  return (
    <div className="festival-list">

      <div onClick={bonnarooCardOnClick} className="festival-card">
          <div className="festival-card-title">
            Bonnaroo
          </div>
          <div className="festival-card-date">
            June 15-18
          </div>
      <img width="250px" height="340px" src={ BonnarooLineup } alt="bonnaroo lineup"></img>
      </div>

      <div onClick={ eForestOnClick } className="festival-card">
          <div className="festival-card-title">
            Electric Forest
          </div>
          <div className="festival-card-date">
            June 22-25
          </div>
      <img width="250px" height="340px" src={ EForestLineup } alt="Eforest lineup"></img>
      </div>

      <div onClick={ ultraOnClick } className="festival-card">
          <div className="festival-card-title">
            Ultra
          </div>
          <div className="festival-card-date">
            March 20-22
          </div>
      <img width="250px" height="340px" src={ UltraLineup } alt="Ultra lineup"></img>
      </div>

      <div onClick={ rollingLoudOnClick } className="festival-card">
          <div className="festival-card-title">
            Ultra
          </div>
          <div className="festival-card-date">
            March 3-5
          </div>
      <img width="250px" height="340px" src={ RollingLoudLineup } alt="Rolling Lineup lineup"></img>
      </div>

      <div onClick={okeeCardOnClick} className="festival-card">
          <div className="festival-card-title">
            Okeechobee
          </div>
          <div className="festival-card-date">
            March 2-5
          </div>
      <img width="250px" height="340px" src={ OkeeLineup } alt="okee lineup"></img>
      </div>

    </div>
  )
}

export default FestivalList;