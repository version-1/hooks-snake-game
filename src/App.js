import React, { useCallback, useEffect, useState } from 'react';
import Field from './components/Field';
import Navigation from './components/Navigation';
import StartButton from './components/StartButton';
import MoveButton from './components/MoveButton';
import './App.css';

const FieldSize = 35
const MoveInterval = 100 // 50ms

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

const DotType = {
  none: '',
  snake: 'snake',
  food: 'food'
}

const DirectionTypeDelta = {
  up: ({ x, y }) => ({ x, y: y - 1 }),
  down: ({ x, y }) => ({ x, y: y + 1 }),
  right: ({ x, y }) => ({ x: x + 1, y }),
  left: ({ x, y }) => ({ x: x - 1, y })
}

const DirectionKeyCodeMap = {
  37: DirectionType.left,
  38: DirectionType.up,
  39: DirectionType.right,
  40: DirectionType.down
}

// へびの初期表示位置をセット
const SnakeStartPosition = {
  x: Math.round(FieldSize / 2) - 1,
  y: Math.round(FieldSize / 2) - 1
}

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const getFoodPosition = () => {
  while(true) {
    const pos = {
      x: getRandomNum(1, FieldSize - 1),
      y: getRandomNum(1, FieldSize - 1)
    }
    if (
      pos.x !== SnakeStartPosition.x
      || pos.y !== SnakeStartPosition.y
    ) {
      return pos
    }
  }
}

const initFields = () => {
  const fields = []
  for (let i = 0; i < FieldSize; i++) {
    const cols = new Array(FieldSize).fill(DotType.none)
    fields.push(cols)
  }
  const foodPos = getFoodPosition()
  fields[SnakeStartPosition.y][SnakeStartPosition.x] = DotType.snake
  fields[foodPos.y][foodPos.x] = DotType.food
  return fields
}

const getInitialGameState = () => ({
  position: SnakeStartPosition,
  fields: initFields(),
  tickId: null,
  status: StatusType.init,
  direction: DirectionType.up,
})

const isConflict = (position) => (
  position.y < 0
  || position.x < 0
  || position.y > FieldSize - 1
  || position.x > FieldSize - 1
)

const handleMoving = (state) => {
  const { fields, direction, position } = state
  const newPosition = DirectionTypeDelta[direction](position)
  if (!isConflict(newPosition)) {
    // ゲーム続行
    const newFields = [...fields]
    newFields[position.y][position.x] = DotType.none
    newFields[newPosition.y][newPosition.x] = DotType.snake
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
  const [gameState, setGameState] = useState(getInitialGameState())
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
    }, MoveInterval)
    setGameState({
      ...gameState,
      status: StatusType.playing,
      tickId
    })
  }

  const handleRestart = () => {
    setGameState(getInitialGameState())
  }

  const handleChangeDirection = useCallback((setGameState) => (direction) => {
    setGameState(prevState => {
      if (
        !DirectionType[direction]
        || prevState.status !== StatusType.playing
        || OppositeDirectionType[prevState.direction] === direction
      ) {
        return prevState
      }
      return {
        ...prevState,
        direction
      }
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      const direction = DirectionKeyCodeMap[e.keyCode]
      handleChangeDirection(setGameState)(direction)
    }
    document.addEventListener('keydown', (e) => handleKeyPress(e))

    return function (){
      document.removeEventListener('keydown', (e) => handleKeyPress(e))
    }
  }, [handleChangeDirection, setGameState])

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
          onRestart={handleRestart}
        />
        <MoveButton handleChangeDirection={handleChangeDirection(setGameState)}/>
      </footer>
    </div>
  );
}

export default App;
