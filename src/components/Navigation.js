import React from 'react'

const Navigation = ({
  state,
  editable,
  canUp,
  canDown,
  onChangeDifficulty
}) => {
  const { length, difficulty } = state

  const disabled = editable ? '' : 'disabled'
  const upVisiblity = canUp ? '' : 'is-hidden'
  const downVisibilty = canDown ? '' : 'is-hidden'
  const onUpDifficulty = () => onChangeDifficulty(1)
  const onDownDifficulty = () => onChangeDifficulty(-1)
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
          <div className={`difficulty-button-container ${disabled}`}>
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
}

export default Navigation
