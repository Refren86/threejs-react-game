import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { BoxGeometry, Vector3Tuple } from "three";

import { Materials } from "@/types/common";

type SidewayTrapBlockProps = {
  position?: Vector3Tuple;
  boxGeometry: BoxGeometry;
  materials: Materials;
};

const SidewayTrapBlock = ({
  position = [0, 0, 0],
  boxGeometry,
  materials,
}: SidewayTrapBlockProps) => {
  const sidewayTrapRef = useRef<RapierRigidBody>();

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    // adjusted to all HZ monitor frame-rates
    const elapsedTime = clock.elapsedTime;

    const xAxisTransition = Math.sin(elapsedTime + timeOffset);

    sidewayTrapRef?.current?.setNextKinematicTranslation({
      x: position[0] + xAxisTransition,
      y: position[1],
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
        ref={sidewayTrapRef}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={materials.obstacleMaterial}
          scale={[2, 2, 0.6]}
          position-y={1}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default SidewayTrapBlock;
