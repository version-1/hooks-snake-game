import React from 'react'

const Navigation = ({ state }) => {
  const { length, difficulty } = state
  return (
    <div className="navigation">
      <div className='navigation-item'>
        <span className='navigation-label'>Length: {length}</span>
      </div>
      <div className='navigation-item'>
        <span className='navigation-label'>Difficulty: {difficulty}</span>
      </div>
    </div>
  )
}

export default Navigation
