import { useCallback, useEffect, useMemo, useState, useReducer } from 'react'
import constants from '../constants'
import { isConflict, setValue, setValueRandomly, initFields } from '../utils'

const _isConflict = isConflict(constants.FieldSize)
const _setValueRandomly = setValueRandomly(constants.FieldSize)
const isEatingMe = (fields, newPosition) => {
  return fields[newPosition.y][newPosition.x] === constants.DotType.snake
}

const getInitialState = () => ({
  position: constants.SnakeStartPosition,
  history: [],
  length: 1,
  difficulty: constants.DefaultDifficulty,
  fields: initFields(
    constants.FieldSize,
    constants.DotType,
    constants.SnakeStartPosition
  ),
  tickId: null,
  status: constants.StatusType.init
})

const {
  moving,
  restart,
  gameover,
  start,
  stop,
  changeDifficulty
} = {
  moving: (payload) => ({ type: 'moving', payload }),
  restart: (payload) => ({ type: 'restart', payload }),
  gameover: () => ({
    type: 'gameover',
    payload: { status: constants.StatusType.gameover }
  }),
  start: () => ({
    type: 'start',
    payload: { status: constants.StatusType.playing }
  }),
  stop: () => ({
    type: 'stop',
    payload: { status: constants.StatusType.suspended }
  }),
  changeDifficulty: ({ delta }) => ({
    type: 'changeDifficulty',
    payload: { delta }
  })
}

const reducer = (state, action) => {
  switch (action.type) {
    case restart.name:
    case moving.name:
      return action.payload
    case gameover.name:
    case start.name:
    case stop.name:
      return { ...state, status: action.payload.status }
    case changeDifficulty.name:
      const { delta } = action.payload
      if (!constants.IntervalList[state.difficulty - 1 + delta]) {
        return state
      }
      return {
        ...state,
        difficulty: state.difficulty + delta
      }
    default:
      return state
  }
}

const handleMoving = (dispatch, direction, state) => {
  const { length, history, fields, position } = state
  const newPosition = constants.DirectionTypeDelta[direction](position)
  const newHistory = [position, ...history].slice(0, length)
  if (_isConflict(newPosition) || isEatingMe(fields, newPosition)) {
    return dispatch(
      gameover({
        ...state,
        status: constants.StatusType.gameover,
        tickId: null
      })
    )
  }
  // ゲーム続行
  const newFields = [...fields]
  let newLength = length
  if (newFields[newPosition.y][newPosition.x] === constants.DotType.food) {
    _setValueRandomly(
      [newPosition, ...newHistory],
      newFields,
      constants.DotType.food
    )
    newLength = length + 1
  }
  const removingPos = newHistory.slice(-1)[0]
  setValue(newFields, newPosition, constants.DotType.snake)
  setValue(newFields, removingPos, constants.DotType.none)

  return dispatch(
    moving({
      ...state,
      status: constants.StatusType.playing,
      history: newHistory,
      length: newLength,
      position: newPosition,
      fields: newFields
    })
  )
}

let handleKeyPress = null

const useSnakeGame = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const [tick, setTick] = useState(0)
  const [, setTimer] = useState()
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

  const handleStart = () => dispatch(start())

  const handleRestart = () => {
    setDirection(constants.DirectionType.up)
    dispatch(restart(getInitialState()))
  }

  const handleStop = () => dispatch(stop())

  const handleChangeDifficulty = useCallback(
    (delta) => {
      if (!editable) {
        return
      }
      dispatch(changeDifficulty({ delta }))
    },
    [editable, dispatch]
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
    [direction, status]
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
    handleMoving(dispatch, direction, state)
  }, [direction, tick, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

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
