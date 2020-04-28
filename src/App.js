import React, { useState } from 'react';
import Field from './components/Field';
import Navigation from './components/Navigation';
import StartButton from './components/StartButton';
import MoveButton from './components/MoveButton';
import './App.css';

const fieldSize = 35

// 1行分のドット
const getCols = () => new Array(fieldSize).fill("")

// 縦のドット
const initFields = () => {
  const fields = []
  for (let i = 0; i < fieldSize; i++) {
    fields.push(getCols())
  }
  return fields
}
const initialFields = initFields()
// へびの初期表示位置をセット
const snakeStartPosition = {
  x: Math.round(fieldSize / 2) - 1,
  y: Math.round(fieldSize / 2) - 1
}
initialFields[snakeStartPosition.y][snakeStartPosition.x] = "snake"

const App = () => {
  const [fields, setFields] = useState(initialFields)
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
        <StartButton />
        <MoveButton />
      </footer>
    </div>
  );
}

export default App;
