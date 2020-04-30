import React from 'react'

const StatusText = {
  init: 'start',
  playing: 'stop',
  gameover: 'restart',
  suspended: 'start'
}

const StartButton = ({ status, onStart, onRestart }) => {
  const handleClick = () => {
    const _onClick = {
      init: onStart,
      playing: () => { /*do nothing */},
      gameover: onRestart,
      supended: () => { /*do nothing */},
    }
    _onClick[status]()
  }
  return <div className="button-start">
    <button onClick={handleClick}>{StatusText[status]}</button>
  </div>
}

export default StartButton
