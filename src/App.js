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

const initialGameState = {
  position: snakeStartPosition,
  fields: initialFields,
  tickId: null,
  status: StatusType.init,
}

const App = () => {
  const [gameState, setGameState] = useState(initialGameState)
  const { status, fields } = gameState

  const handleStart = () => {
    const tickId = setInterval(() => {
      setGameState((prevState) => {
        const { fields, position, tickId } = prevState
        const { x, y } = position
        if (y < 1) {
          clearInterval(tickId)
          return {
            ...prevState,
            status: StatusType.gameover,
            tickId: null
          }
        }
        const newPosition = { x, y: y - 1 }
        const newFields = [...fields]
        newFields[y][x] = ''
        newFields[newPosition.y][newPosition.x] = 'snake'
        return {
          ...prevState,
          position: newPosition,
          fields: newFields
        }
      })
    }, moveInterval)
    setGameState({
      ...gameState,
      status: StatusType.playing,
      tickId
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
        <MoveButton />
      </footer>
    </div>
  );
}

export default App;
