import React from 'react'
import constants from '../constants'

const StartButton = ({ status, onStart, onStop, onRestart }) => {
  const handleClick = () => {
    const _onClick = {
      init: onStart,
      playing: onStop,
      gameover: onRestart,
      suspended: onStart,
    }
    _onClick[status]()
  }
  const text = constants.StatusText[status]
  return <div className="button-start">
    <button className={`btn btn-${status}`} tabIndex={1} onClick={handleClick}>{text}</button>
  </div>
}

export default StartButton
