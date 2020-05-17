import { useCallback, useEffect, useMemo, useState } from 'react'
import constants from '../constants'

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
  fields[constants.SnakeStartPosition.y][constants.SnakeStartPosition.x] =
    constants.DotType.snake
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

const getInitialState = () => ({
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

const useSnakeGame = () => {
  const [state, setState] = useState(getInitialState())
  const [tick, setTick] = useState(0)
  const [timer, setTimer] = useState()
  const [direction, setDirection] = useState(constants.DirectionType.up)
  const { status, difficulty } = state

  const editable = useMemo(() => status === constants.StatusType.init, [status])
  const canDifficultyUp = useMemo(
    () => difficulty - 1 < constants.IntervalList.length - 1,
    [difficulty]
  )
  const canDifficultyDown = useMemo(() => difficulty - 1 > 0, [difficulty])

  const selector = {
    editable,
    canDifficultyUp,
    canDifficultyDown
  }

  const handleStart = () => {
    setState((state) => ({
      ...state,
      status: constants.StatusType.playing
    }))
  }

  const handleRestart = useCallback(() => {
    setDirection(constants.DirectionType.up)
    setState(getInitialState())
  }, [setState, setDirection])

  const handleStop = useCallback(() => {
    setState((state) => ({ ...state, status: constants.StatusType.suspended }))
  }, [setState])

  const handleChangeDifficulty = useCallback(
    (delta) => {
      if (!editable) {
        return
      }
      setState((state) => {
        if (!constants.IntervalList[state.difficulty - 1 + delta]) {
          return state
        }
        return {
          ...state,
          difficulty: state.difficulty + delta
        }
      })
    },
    [editable, setState]
  )

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

  const handler = {
    handleChangeDirection,
    handleChangeDifficulty,
    handleStart,
    handleStop,
    handleRestart
  }

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
    if (state.status !== constants.StatusType.playing) {
      return
    }
    const newState = handleMoving(direction, state)
    setState(newState)
  }, [timer, direction, tick, setState]) // eslint-disable-line react-hooks/exhaustive-deps

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

  return [state, handler, selector]
}

export default useSnakeGame
