import React, { useCallback, useEffect, useState } from 'react';
import Field from './components/Field';
import Navigation from './components/Navigation';
import StartButton from './components/StartButton';
import MoveButton from './components/MoveButton';
import './App.css';

const FieldSize = 35
const DefaultDifficulty = 3
const IntervalList = [
  1000,
  550,
  100,
  50,
  10
]

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
  difficulty: DefaultDifficulty,
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

const isEatingMe = (fields, newPosition) => {
  return fields[newPosition.y][newPosition.x] === DotType.snake
}

const handleMoving = (direction, state) => {
  const { length, history, fields, position } = state
  const newPosition = DirectionTypeDelta[direction](position)
  const newHistory = [position, ...history].slice(0, length)
  if (
    !isConflict(newPosition)
    && !isEatingMe(fields, newPosition)
  ) {
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

let handleKeyPress = null

const App = () => {
  const [gameState, setGameState] = useState(getInitialGameState())
  const [tick, setTick] = useState(0)
  const [timer, setTimer] = useState()
  const [direction, setDirection] = useState(DirectionType.up)
  const { status, fields, difficulty } = gameState

  useEffect(() => {
    const timerId = setInterval(() => {
      setTick(tick => tick + 1)
    }, IntervalList[difficulty - 1])
    setTimer(timerId)
    return () => {
      clearInterval(timerId)
    }
  }, [difficulty])

  useEffect(() => {
    if (gameState.status !== StatusType.playing) {
      return
    }
    const newState = handleMoving(direction, gameState)
    setGameState(newState)
  }, [timer, direction, tick, setGameState]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = () => {
    setGameState(state => ({
      ...state,
      status: StatusType.playing
    }))
  }

  const handleRestart = () => {
    setDirection(DirectionType.up)
    setGameState(getInitialGameState())
  }

  const handleStop = () => {
    setGameState(state => ({ ...state, status: StatusType.suspended }))
  }

  const handleChangeDirection = useCallback((newDirection) => {
    if (
      !DirectionType[newDirection]
      || status !== StatusType.playing
      || OppositeDirectionType[direction] === newDirection
      || direction === newDirection
    ) {
      return
    }
    setDirection(newDirection)
  }, [direction, status, setDirection])

  useEffect(() => {
    if(handleKeyPress) {
      document.removeEventListener('keydown', handleKeyPress)
    }
    handleKeyPress = (e) => {
      const direction = DirectionKeyCodeMap[e.keyCode]
      handleChangeDirection(direction)
    }
    document.addEventListener('keydown', handleKeyPress)
  }, [handleChangeDirection])

  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation state={gameState}/>
      </header>
      <main className="main">
        <Field fields={fields}/>
      </main>
      <footer className="footer">
        <StartButton
          status={status}
          onStart={handleStart}
          onRestart={handleRestart}
          onStop={handleStop}
        />
        <MoveButton handleChangeDirection={handleChangeDirection}/>
      </footer>
    </div>
  );
}

export default App;
