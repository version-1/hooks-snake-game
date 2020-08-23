import React from 'react';

const Button = ({ status, onStart, onStop, onRestart }) => {
  return (
    <div className="button">
      { status === "gameover" && <button className="btn btn-gameover" onClick={onRestart}>GAMEOVER</button> }
      { status === "init" && <button className="btn btn-init" onClick={onStart}>START</button> }
      { status === "suspended" && <button className="btn btn-suspended" onClick={onStart}>START</button> }
      { status === "playing" && <button className="btn btn-playing" onClick={onStop}>STOP</button> }
    </div>
  );
};

export default Button;
