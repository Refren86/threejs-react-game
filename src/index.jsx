import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";

import Experience from "./components/Experience.jsx";

import "./style.css";
import Interface from "./components/Interface.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <KeyboardControls
      map={[
        {
          name: "forward",
          keys: ["ArrowUp", "KeyW"],
        },
        {
          name: "backward",
          keys: ["ArrowDown", "KeyS"],
        },
        {
          name: "left",
          keys: ["ArrowLeft", "KeyA"],
        },
        {
          name: "right",
          keys: ["ArrowRight", "KeyD"],
        },
        {
          name: "jump",
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
