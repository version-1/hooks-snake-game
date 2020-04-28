import React from 'react'

const StatusText = {
  init: 'start',
  playing: 'stop',
  gameover: 'gameover',
  suspended: 'start'
}

const StartButton = ({ status, onStart }) => {
  const handleClick = () => {
    const _onClick = {
      init: onStart,
      playing: () => { /*do nothing */},
      gameover: () => { /*do nothing */},
      supended: () => { /*do nothing */},
    }
    _onClick[status]()
  }
  return <div className="button-start">
    <button onClick={handleClick}>{StatusText[status]}</button>
  </div>
}

export default StartButton
