import React from 'react'

const StatusText = {
  init: 'START',
  playing: 'STOP',
  gameover: 'GAME OVER',
  suspended: 'START'
}

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
  return <div className="button-start">
    <button className={`btn btn-${status}`} tabIndex={1} onClick={handleClick}>{StatusText[status]}</button>
  </div>
}

export default StartButton
