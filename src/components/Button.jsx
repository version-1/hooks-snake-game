import React from 'react';

const Button = ({ status, onStart, onRestart }) => {
  return (
    <div className="button">
      {
        status === "gameover" ?
        <button onClick={onRestart}>gameover</button>
        :
        <button onClick={onStart}>start</button>
      }
    </div>
  );
};

export default Button;
