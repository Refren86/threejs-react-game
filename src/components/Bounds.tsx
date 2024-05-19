import { BufferGeometry, MeshStandardMaterial } from "three";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

type BoundsProps = {
  length?: number;
  geometry: BufferGeometry;
  material: MeshStandardMaterial;
};

const Bounds = ({ length = 1, geometry, material }: BoundsProps) => {
  return (
    <RigidBody type="fixed" restitution={0.2} friction={0}>
      {/* Left wall */}
      <mesh
        position={[-2.15, 0.75, -(length * 2) + 2]}
        geometry={geometry}
        material={material}
        scale={[0.3, 1.5, 4 * length]}
        receiveShadow
      />

      {/* Right wall */}
      <mesh
        position={[2.15, 0.75, -(length * 2) + 2]}
        geometry={geometry}
        material={material}
        scale={[0.3, 1.5, 4 * length]}
        castShadow
      />

      {/* End wall */}
      <mesh
        position={[0, 0.75, -(length * 4) + 1.85]}
        geometry={geometry}
        material={material}
        scale={[4.6, 1.5, 0.3]}
        receiveShadow
      />

      <CuboidCollider
        args={[2, 0.1, 2 * length]}
        position={[0, -0.1, (length - 1) * -2]}
        restitution={0.2}
        friction={1}
      />
    </RigidBody>

    // For testing
    // <RigidBody type="fixed">
    //   {/* Left bound */}
    //   <CuboidCollider
    //     args={[0.3, 1.5, 2 * length]}
    //     position={[-2.3, 1.3, (length - 1) * -2]}
    //   />
    //   {/* Right bound */}
    //   <CuboidCollider
    //     args={[0.3, 1.5, 2 * length]}
    //     position={[2.3, 1.3, (length - 1) * -2]}
    //   />
    // </RigidBody>
  );
};

export default Bounds;
