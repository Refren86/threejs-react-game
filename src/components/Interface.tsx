import { useRef, useEffect } from "react";
import { addEffect } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

import { Controls } from "@/types/common";
import useGame from "../stores/useGame";

let elapsedTime = 0.00;

const Interface = () => {
  const timeRef = useRef<HTMLDivElement>(null!);

  const { phase, startTime, endTime, restartGame } = useGame();

  const forward = useKeyboardControls<Controls>((state) => state.forward);
  const backward = useKeyboardControls<Controls>((state) => state.backward);
  const left = useKeyboardControls<Controls>((state) => state.left);
  const right = useKeyboardControls<Controls>((state) => state.right);
  const jump = useKeyboardControls<Controls>((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      if (phase === "playing") {
        elapsedTime = Date.now() - startTime;
      } else if (phase === "ended") {
        elapsedTime = endTime - startTime;
      }

      elapsedTime /= 1000;

      if (timeRef.current) {
        timeRef.current.textContent = elapsedTime.toFixed(2);
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, [phase]);

  console.log("timeRef", timeRef.current);

  return (
    <div className="interface">
      {/* Time */}
      <div className="time" ref={timeRef}>
        {elapsedTime}
      </div>
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
