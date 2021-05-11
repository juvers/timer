import { useState, useRef } from "react";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function App() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [isRunning, setIsRunning] = useState(false);
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);
  const intervalRef = useRef(null);

  function startTimer() {
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) {
          return timeLeft - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setTimeLeft(600);
    setIsRunning(false);
  }

  return (
    <div className="container">
      <h1>
        <u>Timer</u>
      </h1>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {/* Conditional rendering that removes the start and reset button if the timer
            is running and removes the stop button if the timer is not running */}
        {!isRunning && <button onClick={startTimer}>Start</button>}
        <br />
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        {!isRunning && <button onClick={resetTimer}>Reset</button>}
      </div>
    </div>
  );
}

export default App;
