import React from 'react';

const Navigation = ({ length, difficulty = 3 }) => {
  return (
    <div className="navigation">
      <div className="navigation-item">
          <span className="navigation-label">Length: </span>
          <div className="navigation-item-number-container">
            <div className="num-board">{length}</div>
          </div>
      </div>
      <div className="navigation-item">
        <span className="navigation-label">Difficulty: </span>
        <div className="navigation-item-number-container">
          <span className="num-board">{difficulty}</span>
          <div className="difficulty-button-container">
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navigation;
