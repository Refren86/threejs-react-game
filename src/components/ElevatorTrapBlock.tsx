import { useRef, useState } from "react";
import { BoxGeometry, Vector3Tuple } from "three";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

import { Materials } from "@/types/common";

type ElevatorTrapBlockProps = {
  position?: Vector3Tuple;
  boxGeometry: BoxGeometry;
  materials: Materials;
};

const ElevatorTrapBlock = ({
  position = [0, 0, 0],
  boxGeometry,
  materials,
}: ElevatorTrapBlockProps) => {
  const elevatorRef = useRef<RapierRigidBody>();

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    // adjusted to all HZ monitor frame-rates
    const elapsedTime = clock.elapsedTime;

    const yAxisTransition = Math.sin(elapsedTime + timeOffset) + 1;

    elevatorRef?.current?.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + yAxisTransition,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* Floor */}
      <RigidBody type="fixed">
        <mesh
          geometry={boxGeometry}
          material={materials.floor2Material}
          position={[0, -0.1, 0]}
          scale={[4, 0.2, 4]}
          receiveShadow
        />
      </RigidBody>

      {/* Elevating obstacle, restitution = bounciness, friction = rubbing */}
      <RigidBody
        ref={elevatorRef}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={materials.obstacleMaterial}
          scale={[3.5, 0.4, 0.6]}
          position={[0, 0.3, 0]}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default ElevatorTrapBlock;
