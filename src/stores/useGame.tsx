import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type TPhase = "ready" | "playing" | "ended";

export type TGameState = {
  trapsCount: number;
  trapsSeed: number;
  startTime: number;
  endTime: number;
  phase: TPhase;
  startGame: () => void;
  restartGame: () => void;
  endGame: () => void;
};

// subscribeWithSelector allows to subscribe to store changes
export default create(
  subscribeWithSelector<TGameState>((set) => {
    return {
      trapsCount: 10,
      trapsSeed: 0,

      /**
       * Time
       */
      startTime: 0.0,
      endTime: 0.0,

      /**
       * Phases
       */
      phase: "ready",

      startGame: () => {
        set(({ phase }) => {
          if (phase === "ready") {
            console.info("Starting game...");
            return { phase: "playing", startTime: Date.now() };
          }

          return {};
        });
      },
      restartGame: () => {
        set(({ phase, trapsSeed }) => {
          if (phase === "playing" || phase === "ended") {
            console.log("Restarting game...");
            return {
              phase: "ready",
              trapsSeed: (trapsSeed += 1),
              startTime: 0.0,
              endTime: 0.0,
            };
          }

          return {};
        });
      },
      endGame: () => {
        set(({ phase }) => {
          if (phase !== "ended") {
            console.log("Game finished!");
            return { phase: "ended", endTime: Date.now() };
          }

          return {};
        });
      },
    };
  })
);
