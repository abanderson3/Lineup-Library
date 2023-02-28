import React from 'react'

const LoginButton = ({signInOnClick}) => {




  return (
    <div>
      <button onClick={signInOnClick}>Sign In with Spotify</button>
    </div>

  )
}

export default LoginButton