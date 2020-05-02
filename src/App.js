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

const getFoodPosition = (excludes) => {
  while(true) {
    const pos = {
      x: getRandomNum(1, FieldSize - 2),
      y: getRandomNum(1, FieldSize - 2)
    }
    const check = excludes.every(item => (
      pos.x !== item.x
      || pos.y !== item.y
    ))
    if (check) {
      return pos
    }
  }
}

const setFood = (excludes, fields) => {
  const foodPos = getFoodPosition(excludes)
  fields[foodPos.y][foodPos.x] = DotType.food
  return foodPos
}

const setSnake = (fields) => {
  fields[SnakeStartPosition.y][SnakeStartPosition.x] = DotType.snake
  return SnakeStartPosition
}

const initFields = () => {
  const fields = []
  for (let i = 0; i < FieldSize; i++) {
    const cols = new Array(FieldSize).fill(DotType.none)
    fields.push(cols)
  }
  const snakePos = setSnake(fields)
  setFood([snakePos], fields)
  return fields
}

const getInitialGameState = () => ({
  position: SnakeStartPosition,
  history: [],
  length: 1,
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

const handleMoving = (index, state) => {
  const { length, history, fields, direction, position } = state
  const newPosition = DirectionTypeDelta[direction](position)
  const newHistory = [position, ...history].slice(0, length)
  if (!isConflict(newPosition)) {
    // ゲーム続行
    const newFields = [...fields]
    let newLength = length;
    if (newFields[newPosition.y][newPosition.x] === DotType.food) {
      setFood([newPosition, ...newHistory], newFields)
      newLength = length + 1
    }
    const removingPos = newHistory.slice(-1)[0]
    newFields[newPosition.y][newPosition.x] = DotType.snake
    newFields[removingPos.y][removingPos.x] = DotType.none

    return {
      ...state,
      index,
      status: StatusType.playing,
      history: newHistory,
      length: newLength,
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

let tickId = null
let index = 0

const App = () => {
  const [gameState, setGameState] = useState(getInitialGameState())
  const { status, fields } = gameState

  const handleStart = () => {
    tickId = setInterval(() => {
      setGameState((prevState) => {
        index++
        if(index && index % 2 === 0) {
          return prevState
        }
        const newState = handleMoving(index, prevState)
        if (newState.status === StatusType.gameover) {
          clearInterval(tickId)
        }
        return newState
      })
    }, MoveInterval)
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
