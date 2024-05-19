import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { BoxGeometry, Vector3Tuple, Euler, Quaternion } from "three";
import { Materials } from "@/types/common";

type SpinningTrapBlockProps = {
  position?: Vector3Tuple;
  boxGeometry: BoxGeometry;
  materials: Materials;
};

const SpinningTrapBlock = ({
  position = [0, 0, 0],
  boxGeometry,
  materials,
}: SpinningTrapBlockProps) => {
  const spinnerRef = useRef<RapierRigidBody>();

  // -1.5 to 1.5
  const [speed] = useState(
    () => (Math.random() + 0.5) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame(({ clock }) => {
    // adjusted to all HZ monitor frame-rates
    const elapsedTime = clock.elapsedTime;

    // transforming euler to quaternion for kinematic physics
    const eulerRotation = new Euler(0, elapsedTime * speed, 0);
    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(eulerRotation);

    // adding rotation to kinematic body
    spinnerRef?.current?.setNextKinematicRotation(quaternionRotation);
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

      {/* Spinning obstacle, restitution = bounciness, friction = rubbing */}
      <RigidBody
        ref={spinnerRef}
        type="kinematicPosition"
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={materials.obstacleMaterial}
          scale={[3.5, 0.4, 0.6]}
          position-y={0.3}
          castShadow
          receiveShadow
        />
      </RigidBody>
    </group>
  );
};

export default SpinningTrapBlock;
