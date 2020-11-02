import React from 'react';
import { defaultDifficulty, Difficulty } from '../constants';

const Navigation = ({ length, difficulty = defaultDifficulty, onChangeDifficulty }) => {
  const upVisiblity = difficulty < Difficulty.length ? '' : 'is-hidden'
  const downVisibilty = difficulty > 1 ? '' : 'is-hidden'
  const onUpDifficulty = () => onChangeDifficulty(difficulty + 1)
  const onDownDifficulty = () => onChangeDifficulty(difficulty -1)
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
            <div
              className={`difficulty-button difficulty-up ${upVisiblity}`}
              onClick={onUpDifficulty}
            ></div>
            <div
              className={`difficulty-button difficulty-down ${downVisibilty}`}
              onClick={onDownDifficulty}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Navigation;
