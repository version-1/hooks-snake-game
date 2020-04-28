import React, { useState } from 'react';
import Field from './components/Field';
import Navigation from './components/Navigation';
import StartButton from './components/StartButton';
import MoveButton from './components/MoveButton';
import './App.css';

const fieldSize = 35
const moveInterval = 50 // 50ms

// 1行分のドット
const getCols = () => new Array(fieldSize).fill("")

// 縦のドット
const initFields = () => {
  const fields = []
  for (let i = 0; i < fieldSize; i++) {
    fields.push(getCols())
  }
  return fields
}

const initialFields = initFields()

// へびの初期表示位置をセット
const snakeStartPosition = {
  x: Math.round(fieldSize / 2) - 1,
  y: Math.round(fieldSize / 2) - 1
}

initialFields[snakeStartPosition.y][snakeStartPosition.x] = "snake"

const StatusType = {
  init: 'init',
  playing: 'playing',
  suspended: 'suspended',
  gameover: 'gameover',
}

const DirectionType = {
  up: 'up',
  down: 'down',
  right: 'right',
  left: 'left'
}

const OppositeDirectionType = {
  up: 'down',
  down: 'up',
  right: 'left',
  left: 'right'
}

const DirectionTypeDelta = {
  up: ({ x, y }) => ({ x, y: y - 1 }),
  down: ({ x, y }) => ({ x, y: y + 1 }),
  right: ({ x, y }) => ({ x: x + 1, y }),
  left: ({ x, y }) => ({ x: x - 1, y })
}

const initialGameState = {
  position: snakeStartPosition,
  fields: initialFields,
  tickId: null,
  status: StatusType.init,
  direction: DirectionType.up,
}

const isConflict = (position) => (
  position.y < 0
  || position.x < 0
  || position.y > fieldSize - 1
  || position.x > fieldSize - 1
)

const handleMoving = (state) => {
  const { fields, direction, position } = state
  const newPosition = DirectionTypeDelta[direction](position)
  if (!isConflict(newPosition)) {
    // ゲーム続行
    const newFields = [...fields]
    newFields[position.y][position.x] = ''
    newFields[newPosition.y][newPosition.x] = 'snake'
    return {
      ...state,
      position: newPosition,
      fields: newFields
    }
  }

  return ({
    ...state,
    status: StatusType.gameover,
    tickId: null
  })
}

const App = () => {
  const [gameState, setGameState] = useState(initialGameState)
  const { status, fields } = gameState

  const handleStart = () => {
    const tickId = setInterval(() => {
      setGameState((prevState) => {
        const newState = handleMoving(prevState)
        if (newState.status === StatusType.gameover) {
          clearInterval(prevState.tickId)
        }
        return newState
      })
    }, moveInterval)
    setGameState({
      ...gameState,
      status: StatusType.playing,
      tickId
    })
  }

  const handleChangeDirection = (direction) => () => {
    if (
      !DirectionType[direction]
      || gameState.status !== StatusType.playing
      || OppositeDirectionType[gameState.direction] === direction
    ) {
      return
    }
    setGameState({
      ...gameState,
      direction
    })
  }

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation />
      </header>
      <main className="main">
        <Field fields={fields}/>
      </main>
      <footer className="footer">
        <StartButton
          status={status}
          onStart={handleStart}
        />
        <MoveButton handleChangeDirection={handleChangeDirection}/>
      </footer>
    </div>
  );
}

export default App;
