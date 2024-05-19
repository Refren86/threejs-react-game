import { useRef, useEffect } from "react";
import { addEffect } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

import useGame from "../stores/useGame";

const Interface = () => {
  const timeRef = useRef()

  const { restartGame, phase } = useGame();

  const { forward, backward, left, right, jump } = useKeyboardControls(
    (state) => state
  );

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const gameState = useGame.getState()

      let elapsedTime = 0;

      if (gameState.phase === "playing") {
        elapsedTime = Date.now() - gameState.startTime
      } else if (gameState.phase === "ended") {
        elapsedTime = gameState.endTime - gameState.startTime
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2)

      if (timeRef.current) {
        timeRef.current.textContent = elapsedTime
      }
    })

    return () => {
      unsubscribeEffect()
    }
  }, [])

  console.log('rerender');

  return (
    <div className="interface">
      {/* Time */}
      <div className="time" ref={timeRef}>0.00</div>
      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restartGame}>
          Restart
        </div>
      )}
      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${left ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${right ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Interface;
