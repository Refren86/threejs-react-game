import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Lights() {
  const lightRef = useRef();

  useFrame(({ camera }) => {
    lightRef.current.position.z = camera.position.z + 1 - 4; 
    lightRef.current.target.position.z = camera.position.z - 4;
    lightRef.current.target.updateMatrixWorld(); // general matrix for the object
  })

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        position={[4, 4, 1]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={15}
        shadow-camera-top={15}
        shadow-camera-right={15}
        shadow-camera-bottom={-15}
        shadow-camera-left={-15}
      />
      <ambientLight intensity={1.5} />
    </>
  );
}
