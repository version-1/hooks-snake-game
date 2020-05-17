import React from 'react'
import Field from './components/Field'
import Navigation from './components/Navigation'
import StartButton from './components/StartButton'
import MoveButton from './components/MoveButton'
import useSnakeGame from './hooks'

const App = () => {
  const [state, handler, selector] = useSnakeGame()
  const { status, fields } = state
  const { editable, canDifficultyUp, canDifficultyDown } = selector
  const {
    handleChangeDifficulty,
    handleStart,
    handleRestart,
    handleStop,
    handleChangeDirection
  } = handler

  return (
    <div className="app">
      <header className="header">
        <div className="title-container">
          <h1 className="title">SNAKE GAME</h1>
        </div>
        <Navigation
          state={state}
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
