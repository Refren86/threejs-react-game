import { Physics } from "@react-three/rapier";

import Lights from "./Lights";
import Level from "./Level";
import Player from "./Player";
import useGame from "../stores/useGame";

export default function Experience() {
  const trapsCount = useGame((state) => state.trapsCount);
  const trapsSeed = useGame((state) => state.trapsSeed);

  return (
    <>
    <color args={[ '#bd3dfc' ]} attach="background" />
      <Physics debug={false}>
        <Lights />
        <Level trapsCount={trapsCount} trapsSeed={trapsSeed} />
        <Player />
      </Physics>
    </>
  );
}
