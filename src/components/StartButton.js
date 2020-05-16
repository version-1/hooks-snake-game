import React from 'react'

const StatusText = {
  init: 'start',
  playing: 'stop',
  gameover: 'gameover',
  suspended: 'start'
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
    <button onClick={handleClick}>{StatusText[status]}</button>
  </div>
}

export default StartButton
