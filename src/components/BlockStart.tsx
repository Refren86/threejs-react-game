import { Materials } from "@/types/common";
import { Float, Text } from "@react-three/drei";
import { BufferGeometry, Vector3Tuple } from "three";

type BlockStartProps = {
  position?: Vector3Tuple;
  geometry: BufferGeometry;
  materials: Materials;
};

const BlockStart = ({
  position = [0, 0, 0],
  geometry,
  materials,
}: BlockStartProps) => {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.5}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
        >
          Bounce Game
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </Float>
      <mesh
        geometry={geometry}
        material={materials.floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
};

export default BlockStart;
