import { useCallback, useEffect, useState } from 'react';
import {
  defaultInterval,
  defaultDifficulty,
  initialPosition,
  initialValues,
  Delta,
  Difficulty,
  Direction,
  DirectionKeyCodeMap,
  GameStatus,
  OppositeDirection,
} from '../constants'
import { initFields, isCollision, isEatingMyself, getFoodPostion } from '../utils'

let timer = null

const unsubscribe = () => {
  if (!timer) {
    return
  }
  clearInterval(timer)
}

const useSnakeGame = () => {
  const [fields, setFields] = useState(initialValues)
  const [body, setBody] = useState([])
  const [status, setStatus] = useState(GameStatus.init)
  const [direction, setDirection] = useState(Direction.up)
  const [difficulty, setDifficulty] = useState(defaultDifficulty)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setBody([initialPosition])

    // ゲームの中の時間を管理する
    const interval = Difficulty[difficulty-1]
    timer = setInterval(() => {
      setTick(tick => tick + 1)
    }, interval)
    return unsubscribe
  }, [difficulty])

  useEffect(() => {
    if (body.length === 0 || status !== GameStatus.playing) {
      return
    }
    const canContinue = handleMoving()
    if (!canContinue) {
      unsubscribe()
      setStatus(GameStatus.gameover)
    }
  }, [tick])

  const start = () => setStatus(GameStatus.playing)
  const stop = () => setStatus(GameStatus.suspended)

  const reload = () => {
    timer = setInterval(() => {
      setTick(tick => tick + 1)
    }, defaultInterval)
    setStatus(GameStatus.init)
    setBody([initialPosition])
    setDirection(Direction.up)
    setFields(initFields(fields.length, initialPosition))
  }

  const updateDirection = useCallback((newDirection) => {
    if (status !== GameStatus.playing) {
      return
    }
    if (OppositeDirection[direction] === newDirection) {
      return
    }
    setDirection(newDirection)
  }, [direction ,status])

  const updateDifficulty = useCallback((difficulty) => {
    if (status !== GameStatus.init) {
      return
    }
    if (difficulty < 1 || difficulty > Difficulty.length) {
      return
    }
    setDifficulty(difficulty)
  }, [status])

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newDirection = DirectionKeyCodeMap[e.keyCode];
      if (!newDirection) {
        return
      }
      updateDirection(newDirection);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [updateDirection])


  const handleMoving = () => {
    const { x, y } = body[0]
    const delta = Delta[direction]
    const newPosition = {
      x: x + delta.x,
      y: y + delta.y
    }
    if (isCollision(fields.length, newPosition) || isEatingMyself(fields, newPosition)) {
      return false
    }
    const newBody = [...body]
    if (fields[newPosition.y][newPosition.x] !== 'food') {
      const removingTrack = newBody.pop()
      fields[removingTrack.y][removingTrack.x] = ''
    } else {
      const food = getFoodPostion(fields.length, [...newBody, newPosition])
      fields[food.y][food.x] = 'food'
     }
    fields[newPosition.y][newPosition.x] = 'snake'
    newBody.unshift(newPosition)

    setBody(newBody)
    setFields(fields)
    return true
  }
  return {
    body,
    difficulty,
    fields,
    status,
    start,
    stop,
    reload,
    updateDirection,
    updateDifficulty
  }
}

export default useSnakeGame
