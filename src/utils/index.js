export const getFoodPostion = (fieldSize, excludes) => {
  while(true) {
    const x = Math.floor(Math.random() * (fieldSize - 1 - 1)) + 1;
    const y = Math.floor(Math.random() * (fieldSize - 1 - 1)) + 1;
    const conflict = excludes.some(item => item.x === x && item.y === y)

    if (!conflict) {
      return { x, y };
    }
  }
}

export const initFields = (fieldSize, snake) => {
  const fields = []; // 新しい配列を作成
  // フィールドの縦の長さを作る分だけループ
  for (let i = 0; i < fieldSize; i++) {
    // フィールドの列の長さ分の配列を作成
    const cols = new Array(fieldSize).fill('');
    // フィールドの列を配列の追加
    fields.push(cols);
  }
  fields[snake.y][snake.x] = 'snake'

  const food = getFoodPostion(fieldSize, [snake])
  fields[food.y][food.x] = 'food'

  return fields; // 作成した配列を返却
};
