import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Field from './components/Field'
import Navigation from './components/Navigation'
import StartButton from './components/StartButton'
import MoveButton from './components/MoveButton'
import constants from './constants'

const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const getFoodPosition = (excludes) => {
  while (true) {
    const pos = {
      x: getRandomNum(1, constants.FieldSize - 2),
      y: getRandomNum(1, constants.FieldSize - 2)
    }
    const check = excludes.every((item) => pos.x !== item.x || pos.y !== item.y)
    if (check) {
      return pos
    }
  }
}

const setFood = (excludes, fields) => {
  const foodPos = getFoodPosition(excludes)
  fields[foodPos.y][foodPos.x] = constants.DotType.food
  return foodPos
}

const setSnake = (fields) => {
  fields[constants.SnakeStartPosition.y][constants.SnakeStartPosition.x] = constants.DotType.snake
  return constants.SnakeStartPosition
}

const initFields = () => {
  const fields = []
  for (let i = 0; i < constants.FieldSize; i++) {
    const cols = new Array(constants.FieldSize).fill(constants.DotType.none)
    fields.push(cols)
  }
  const snakePos = setSnake(fields)
  setFood([snakePos], fields)
  return fields
}

const getInitialGameState = () => ({
  position: constants.SnakeStartPosition,
  history: [],
  length: 1,
  difficulty: constants.DefaultDifficulty,
  fields: initFields(),
  tickId: null,
  status: constants.StatusType.init,
  direction: constants.DirectionType.up
})

const isConflict = (position) =>
  position.y < 0 ||
  position.x < 0 ||
  position.y > constants.FieldSize - 1 ||
  position.x > constants.FieldSize - 1

const isEatingMe = (fields, newPosition) => {
  return fields[newPosition.y][newPosition.x] === constants.DotType.snake
}

const handleMoving = (direction, state) => {
  const { length, history, fields, position } = state
  const newPosition = constants.DirectionTypeDelta[direction](position)
  const newHistory = [position, ...history].slice(0, length)
  if (!isConflict(newPosition) && !isEatingMe(fields, newPosition)) {
    // ゲーム続行
    const newFields = [...fields]
    let newLength = length
    if (newFields[newPosition.y][newPosition.x] === constants.DotType.food) {
      setFood([newPosition, ...newHistory], newFields)
      newLength = length + 1
    }
    const removingPos = newHistory.slice(-1)[0]
    newFields[newPosition.y][newPosition.x] = constants.DotType.snake
    newFields[removingPos.y][removingPos.x] = constants.DotType.none

    return {
      ...state,
      status: constants.StatusType.playing,
      history: newHistory,
      length: newLength,
      position: newPosition,
      fields: newFields
    }
  }

  return {
    ...state,
    status: constants.StatusType.gameover,
    tickId: null
  }
}

let handleKeyPress = null

const App = () => {
  const [gameState, setGameState] = useState(getInitialGameState())
  const [tick, setTick] = useState(0)
  const [timer, setTimer] = useState()
  const [direction, setDirection] = useState(constants.DirectionType.up)
  const { status, fields, difficulty } = gameState

  const editable = useMemo(() => status === constants.StatusType.init, [status])
  const canDifficultyUp = useMemo(
    () => difficulty - 1 < constants.IntervalList.length - 1,
    [difficulty]
  )
  const canDifficultyDown = useMemo(() => difficulty - 1 > 0, [difficulty])

  useEffect(() => {
    const timerId = setInterval(() => {
      setTick((tick) => tick + 1)
    }, constants.IntervalList[difficulty - 1])
    setTimer(timerId)
    return () => {
      clearInterval(timerId)
    }
  }, [difficulty])

  useEffect(() => {
    if (gameState.status !== constants.StatusType.playing) {
      return
    }
    const newState = handleMoving(direction, gameState)
    setGameState(newState)
  }, [timer, direction, tick, setGameState]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleStart = () => {
    setGameState((state) => ({
      ...state,
      status: constants.StatusType.playing
    }))
  }

  const handleRestart = () => {
    setDirection(constants.DirectionType.up)
    setGameState(getInitialGameState())
  }

  const handleStop = () => {
    setGameState((state) => ({ ...state, status: constants.StatusType.suspended }))
  }

  const handleChangeDifficulty = (delta) => {
    if (!editable) {
      return
    }
    setGameState((state) => {
      if (!constants.IntervalList[state.difficulty - 1 + delta]) {
        return state
      }
      return {
        ...state,
        difficulty: state.difficulty + delta
      }
    })
  }

  const handleChangeDirection = useCallback(
    (newDirection) => {
      if (
        !constants.DirectionType[newDirection] ||
        status !== constants.StatusType.playing ||
        constants.OppositeDirectionType[direction] === newDirection ||
        direction === newDirection
      ) {
        return
      }
      setDirection(newDirection)
    },
    [direction, status, setDirection]
  )

  useEffect(() => {
    if (handleKeyPress) {
      document.removeEventListener('keydown', handleKeyPress)
    }
    handleKeyPress = (e) => {
      const direction = constants.DirectionKeyCodeMap[e.keyCode]
      handleChangeDirection(direction)
    }
    document.addEventListener('keydown', handleKeyPress)
  }, [handleChangeDirection])

  return (
    <div className="app">
      <header className="header">
        <div className="title-container">
          <h1 className="title">SNAKE GAME</h1>
        </div>
        <Navigation
          state={gameState}
          editable={editable}
          canUp={canDifficultyUp}
          canDown={canDifficultyDown}
          onChangeDifficulty={handleChangeDifficulty}
        />
      </header>
      <main className="main">
        <Field fields={fields} />
      </main>
      <footer className="footer">
        <StartButton
          status={status}
          onStart={handleStart}
          onRestart={handleRestart}
          onStop={handleStop}
        />
        <MoveButton handleChangeDirection={handleChangeDirection} />
      </footer>
    </div>
  )
}

export default App
