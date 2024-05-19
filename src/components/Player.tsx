import * as THREE from "three";
import { useState, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";

import useGame from "../stores/useGame";

const Player = () => {
  const bodyRef = useRef<RapierRigidBody>();

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  const { trapsCount, startGame, restartGame, endGame } = useGame();

  const { rapier, world: rapierWorld } = useRapier();

  // 1st - fn to subscribe to key change; 2nd - fn to get current keys state
  const [subscribeKeys, getKeys] = useKeyboardControls();

  useFrame(({ camera }, delta) => {
    /**
     * Controls
     */
    const { forward, backward, left, right } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength; // x-axis rotation
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength; // x-axis rotation
    }

    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength; // z-axis rotation
    }

    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength; // z-axis rotation
    }

    bodyRef.current?.applyImpulse(impulse, true);
    bodyRef.current?.applyTorqueImpulse(torque, true);

    /**
     * Camera
     */
    const bodyPosition = bodyRef.current?.translation(); // Vector 3

    if (bodyPosition && smoothedCameraPosition) {
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(bodyPosition);
      cameraPosition.z += 2.25;
      cameraPosition.y += 0.65;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(bodyPosition);
      cameraTarget.y += 0.25;

      // zooming camera (lerping - linear interpolation)
      smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
      smoothedCameraTarget.lerp(cameraPosition, 5 * delta);

      camera.position.copy(smoothedCameraPosition);
      camera.lookAt(smoothedCameraTarget);

      /**
       * Phases
       */
      if (bodyPosition.z < -(trapsCount * 4 + 2)) {
        endGame();
      }

      if (bodyPosition.y < -4) {
        console.log("AAAAAAHHHHH!");
        restartGame();
      }
    }
  });

  useEffect(() => {
    const phaseUnsubscribe = useGame.subscribe(
      // selector, where we listen to field value change
      (state) => state.phase,
      (phase) => {
        if (phase === "ready") {
          resetBodyPosition();
        }
      }
    );

    /**
     * Keys subscription
     */
    const jumpKeyUnsubscribe = subscribeKeys(
      // selector, where we listen to key press events
      (state) => state.jump,
      // value will be true when state value key is pressed (from prev. function)
      (value) => {
        if (value) {
          jumpHandler();
        }
      }
    );

    const anyKeyUnsubscribe = subscribeKeys(
      // selector, where we listen to key press events
      () => {
        startGame();
      }
    );

    return () => {
      phaseUnsubscribe();

      jumpKeyUnsubscribe();
      anyKeyUnsubscribe();
    };
  }, []);

  function jumpHandler() {
    // adding jump effect to body and optimizing by calculating the mass
    const mass = bodyRef.current?.mass();

    const origin = bodyRef.current?.translation();
    origin.y -= 0.31; // make y close to 0

    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);
    const timeOfImpact = hit?.toi; // distance between ray toward the hit object

    if (timeOfImpact < 0.15) {
      bodyRef.current?.applyImpulse({ x: 0, y: mass * 4, z: 0 }, true);
    }
  }

  function resetBodyPosition() {
    bodyRef.current?.setTranslation({ x: 0, y: 1, z: 0 }, true); // position
    bodyRef.current?.setLinvel({ x: 0, y: 0, z: 0 }, true); // linear velocity (speed and direction)
    bodyRef.current?.setAngvel({ x: 0, y: 0, z: 0 }, true); // angular velocity (spinning speed)
  }

  return (
    <RigidBody
      ref={bodyRef}
      colliders="ball"
      canSleep={false} // rapier will make the body asleep after ~1-2sec and it won't be interactive
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};

export default Player;
