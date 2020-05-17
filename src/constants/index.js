
const FieldSize = 35
const DefaultDifficulty = 3
const IntervalList = [500, 300, 100, 50, 10]

const StatusType = {
  init: 'init',
  playing: 'playing',
  suspended: 'suspended',
  gameover: 'gameover'
}

const StatusText = {
  init: 'START',
  playing: 'STOP',
  gameover: 'GAME OVER',
  suspended: 'START'
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

export default {
  FieldSize,
  DefaultDifficulty,
  IntervalList,
  StatusType,
  StatusText,
  DirectionType,
  OppositeDirectionType,
  DotType,
  DirectionTypeDelta,
  DirectionKeyCodeMap,
  SnakeStartPosition
}
