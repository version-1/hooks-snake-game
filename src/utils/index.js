export const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

export const getRandomPosition = (fieldSize, excludes) => {
  while (true) {
    const pos = {
      x: getRandomNum(1, fieldSize - 2),
      y: getRandomNum(1, fieldSize - 2)
    }
    const check = excludes.every((item) => pos.x !== item.x || pos.y !== item.y)
    if (check) {
      return pos
    }
  }
}

export const setValue = (fields, pos, value) => {
  fields[pos.y][pos.x] = value
  return pos
}

export const setValueRandomly = (fieldSize) => (excludes, fields, value) => {
  const pos = getRandomPosition(fieldSize, excludes)
  setValue(fields, pos, value)
  return pos
}

export const initFields = (fieldSize, dotType, startPos) => {
  const fields = []
  for (let i = 0; i < fieldSize; i++) {
    const cols = new Array(fieldSize).fill(dotType.none)
    fields.push(cols)
  }
  const snakePos = setValue(fields, startPos, dotType.snake)
  setValueRandomly(fieldSize)([snakePos], fields, dotType.food)
  return fields
}

export const isConflict = (fieldSize) => (position) =>
  position.y < 0 ||
  position.x < 0 ||
  position.y > fieldSize - 1 ||
  position.x > fieldSize - 1


