import * as THREE from "three";
import { Suspense, useMemo } from "react";

import BlockStart from "./BlockStart";
import SpinningTrapBlock from "./SpinningTrapBlock";
import ElevatorTrapBlock from "./ElevatorTrapBlock";
import SidewayTrapBlock from "./SidewayTrapBlock";
import BlockEnd from "./BlockEnd";
import Bounds from "./Bounds";

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const materials = {
  floor1Material: new THREE.MeshStandardMaterial({ color: "limegreen" }),
  floor2Material: new THREE.MeshStandardMaterial({ color: "greenyellow" }),
  obstacleMaterial: new THREE.MeshStandardMaterial({ color: "orangered" }),
  wallMaterial: new THREE.MeshStandardMaterial({ color: "slategrey" }),
};

type LevelProps = {
  trapsCount?: number;
  types?: any[];
  trapsSeed?: number;
};

const Level = ({
  trapsCount = 5,
  types = [SpinningTrapBlock, ElevatorTrapBlock, SidewayTrapBlock],
  trapsSeed = 0,
}: LevelProps) => {
  const blocks = useMemo(() => {
    return Array.from({ length: trapsCount }).map(
      () => types[Math.floor(Math.random() * types.length)]
    );
  }, [trapsCount, types, trapsSeed]);

  return (
    <>
      <BlockStart geometry={boxGeometry} materials={materials} />
      {blocks.map((BlockComponent, index) => (
        <BlockComponent
          key={index}
          position={[0, 0, (index + 1) * -4]}
          geometry={boxGeometry}
          boxGeometry={boxGeometry}
          materials={materials}
        />
      ))}
      <Suspense fallback={null}>
        <BlockEnd
          position={[0, 0, (trapsCount + 1) * -4]}
          geometry={boxGeometry}
          materials={materials}
        />
      </Suspense>

      <Bounds
        length={trapsCount + 2}
        geometry={boxGeometry}
        material={materials.wallMaterial}
      />
    </>
  );
};

export default Level;
