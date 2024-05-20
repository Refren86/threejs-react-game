import { Text, useGLTF } from "@react-three/drei";
import { BufferGeometry, Vector3Tuple } from "three";

import { Materials } from "@/types/common";

import FinishMaterial from "@/assets/finish.glb";
import BebasFont from "@/assets/bebas-neue-v9-latin-regular.woff";

type BlockEndProps = {
  position?: Vector3Tuple;
  geometry: BufferGeometry;
  materials: Materials;
};

const BlockEnd = ({
  position = [0, 0, 0],
  geometry,
  materials,
}: BlockEndProps) => {
  const finish = useGLTF(FinishMaterial);

  finish.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <Text
        font={BebasFont}
        scale={1}
        position={[0, 2.5, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      <mesh
        geometry={geometry}
        material={materials.floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0, 4]}
        receiveShadow
      />

      <primitive
        object={finish.scene}
        position={[0, 1.1, 2.05]}
        scale={[0.3, 0.3, 0.2]}
      />
    </group>
  );
};

export default BlockEnd;
