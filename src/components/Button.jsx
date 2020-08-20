import React from 'react';

const Button = ({ status, onStart, onStop, onRestart }) => {
  return (
    <div className="button">
      { status === "gameover" && <button onClick={onRestart}>gameover</button> }
      { status === "init" && <button onClick={onStart}>start</button> }
      { status === "suspended" && <button onClick={onStart}>start</button> }
      { status === "playing" && <button onClick={onStop}>stop</button> }
    </div>
  );
};

export default Button;
