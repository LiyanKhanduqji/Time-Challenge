import { useImperativeHandle, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(
  ({ result, targetTime, timeRemaining, onReset }, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
      open() {
        dialog.current.showModal();
      },
    }));

    const targetTimeMs = targetTime * 1000;

    const remainingSeconds = (timeRemaining / 1000).toFixed(2);

    const userWon = timeRemaining > 0 && timeRemaining <= targetTimeMs;

    return createPortal(
      <dialog className="result-modal" ref={dialog}>
        <h2>You {userWon ? "Won" : "Lost"}</h2>
        <p>
          The target time was <strong>{targetTime} seconds</strong>
        </p>
        <p>
          You stopped the timer with{" "}
          <strong>
            {remainingSeconds >= 0 ? remainingSeconds : 0} seconds left
          </strong>
        </p>

        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

export default ResultModal;
