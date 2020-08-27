import { initFields } from '../utils'

const fieldSize = 35
export const initialPosition = { x: 17, y: 17 }
export const initialValues = initFields(fieldSize, initialPosition)
export const defaultInterval = 100
export const defaultDifficulty = 3

export const Difficulty = [1000, 500, 100, 50, 10]

export const GameStatus = Object.freeze({
  init: 'init',
  playing: 'playing',
  suspended: 'suspended',
  gameover: 'gameover'
})

export const Direction = Object.freeze({
  up: 'up',
  right: 'right',
  left: 'left',
  down: 'down'
})

export const DirectionKeyCodeMap = Object.freeze({
  37: Direction.left,
  38: Direction.up,
  39: Direction.right,
  40: Direction.down,
})

export const OppositeDirection = Object.freeze({
  up: 'down',
  right: 'left',
  left: 'right',
  down: 'up'
})

export const Delta = Object.freeze({
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
})

