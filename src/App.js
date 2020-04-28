import React from 'react';
import Field from './components/Field';
import Navigation from './components/Navigation';
import StartButton from './components/StartButton';
import MoveButton from './components/MoveButton';
import './App.css';


const App = () => {
  return (
    <div className="App">
      <header className="header">
        <div className="title-container">
          <h1 className="title">Snake Game</h1>
        </div>
        <Navigation />
      </header>
      <main className="main">
        <Field />
      </main>
      <footer className="footer">
        <StartButton />
        <MoveButton />
      </footer>
    </div>
  );
}

export default App;
