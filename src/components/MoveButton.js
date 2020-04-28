import React from 'react'

const MoveButton = ({ handleChangeDirection }) => {
  return (
    <div className="move-button">
      <button onClick={() => handleChangeDirection('left')}>←</button>
      <button onClick={() => handleChangeDirection('up')}>↑</button>
      <button onClick={() => handleChangeDirection('down')}>↓</button>
      <button onClick={() => handleChangeDirection('right')}>→</button>
    </div>
  )
}

export default MoveButton
