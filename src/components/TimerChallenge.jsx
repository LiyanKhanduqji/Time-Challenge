import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [timerIsActive, setTimerIsActive] = useState(false);

  const timer = useRef();
  const dialogg = useRef();

  const handleStart = () => {
    setTimerIsActive(true);
    timer.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer.current);
          setTimerIsActive(false);
          dialogg.current.open();
          return 0;
        }
        return prevTime - 10;
      });
    }, 10);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    setTimerIsActive(false);
    dialogg.current.open();
  };

  const handleReset = () => {
    setTimeRemaining(targetTime * 1000);
  };

  return (
    <>
      <ResultModal
        ref={dialogg}
        targetTime={targetTime}
        timeRemaining={timeRemaining}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : ""}>
          {timerIsActive ? "Time is running..." : "Timer inactive"}
        </p>
        <p>Time remaining: {(timeRemaining / 1000).toFixed(2)} seconds</p>
      </section>
    </>
  );
}
