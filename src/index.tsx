import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";

import { Controls } from "./types/common";
import Experience from "./components/Experience";
import Interface from "./components/Interface";

import "./style.scss";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <KeyboardControls
      map={[
        {
          name: Controls.forward,
          keys: ["ArrowUp", "KeyW"],
        },
        {
          name: Controls.backward,
          keys: ["ArrowDown", "KeyS"],
        },
        {
          name: Controls.left,
          keys: ["ArrowLeft", "KeyA"],
        },
        {
          name: Controls.right,
          keys: ["ArrowRight", "KeyD"],
        },
        {
          name: Controls.jump,
          keys: ["Space"],
        },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Experience />
      </Canvas>

      <Interface />
    </KeyboardControls>
  </StrictMode>
);
