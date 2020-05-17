import React from 'react'

const MoveButton = ({ handleChangeDirection }) => {
  return (
    <div className="move-button">
      <button className="btn btn-move btn-left" onClick={() => handleChangeDirection('left')}>←</button>
      <div className="btn-up-down">
        <button className="btn btn-move btn-up" onClick={() => handleChangeDirection('up')}>↑</button>
        <button className="btn btn-move btn-down" onClick={() => handleChangeDirection('down')}>↓</button>
      </div>
      <button className="btn btn-move btn-right" onClick={() => handleChangeDirection('right')}>→</button>
    </div>
  )
}

export default MoveButton
