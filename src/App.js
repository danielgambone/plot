import React, { useState } from 'react';
import './App.css';

const GRID_SIZE = 21; // -10 to 10 inclusive
const AXIS_MIN = -10;
const AXIS_MAX = 10;

function getRandomPoint() {
  const x = Math.floor(Math.random() * (AXIS_MAX - AXIS_MIN + 1)) + AXIS_MIN;
  const y = Math.floor(Math.random() * (AXIS_MAX - AXIS_MIN + 1)) + AXIS_MIN;
  return { x, y };
}

function App() {
  const [target, setTarget] = useState(getRandomPoint());
  const [userPoint, setUserPoint] = useState(null);
  const [result, setResult] = useState(null);

  const handleGridClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const size = rect.width;
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const x = Math.round(((offsetX / size) * (AXIS_MAX - AXIS_MIN)) + AXIS_MIN);
    const y = Math.round((AXIS_MAX - ((offsetY / size) * (AXIS_MAX - AXIS_MIN))));
    setUserPoint({ x, y });
    setResult(null);
  };

  const checkAnswer = () => {
    if (!userPoint) return;
    if (userPoint.x === target.x && userPoint.y === target.y) {
      setResult('Correct!');
    } else {
      setResult('Incorrect. Try again!');
    }
  };

  const newProblem = () => {
    setTarget(getRandomPoint());
    setUserPoint(null);
    setResult(null);
  };

  // Render grid lines and axes
  const gridLines = [];
  for (let i = 0; i <= GRID_SIZE; i++) {
    const pos = (i / GRID_SIZE) * 100;
    gridLines.push(
      <line key={`v${i}`} x1={`${pos}%`} y1="0%" x2={`${pos}%`} y2="100%" stroke="#ccc" />
    );
    gridLines.push(
      <line key={`h${i}`} x1="0%" y1={`${pos}%`} x2="100%" y2={`${pos}%`} stroke="#ccc" />
    );
  }

  // Axes
  const axisX = ((-AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100;
  const axisY = ((AXIS_MAX) / (AXIS_MAX - AXIS_MIN)) * 100;

  return (
    <div className="container">
      <h2>Plot the Point: ({target.x}, {target.y})</h2>
      <svg
        viewBox="0 0 100 100"
        className="grid"
        onClick={handleGridClick}
      >
        {gridLines}
        {/* Axes */}
        <line x1="0%" y1={`${axisY}%`} x2="100%" y2={`${axisY}%`} stroke="black" strokeWidth="0.5" />
        <line x1={`${axisX}%`} y1="0%" x2={`${axisX}%`} y2="100%" stroke="black" strokeWidth="0.5" />
        {/* Target point (for reference, could be hidden) */}
        {/* <circle cx={`${((target.x-AXIS_MIN)/(AXIS_MAX-AXIS_MIN))*100}%`} cy={`${((AXIS_MAX-target.y)/(AXIS_MAX-AXIS_MIN))*100}%`} r="1.5" fill="red" /> */}
        {/* User point */}
        {userPoint && (
          <circle
            cx={`${((userPoint.x-AXIS_MIN)/(AXIS_MAX-AXIS_MIN))*100}%`}
            cy={`${((AXIS_MAX-userPoint.y)/(AXIS_MAX-AXIS_MIN))*100}%`}
            r="2"
            fill="blue"
          />
        )}
      </svg>
      <div className="controls">
        <button onClick={checkAnswer} disabled={!userPoint}>Check Answer</button>
        {result === 'Correct!' && (
          <button onClick={newProblem}>New Problem</button>
        )}
      </div>
      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default App;
