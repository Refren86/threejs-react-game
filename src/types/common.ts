import { MeshStandardMaterial } from "three";

export enum Controls {
  forward = "forward",
  backward = "backward",
  left = "left",
  right = "right",
  jump = "jump",
}

export type Materials = {
  floor1Material: MeshStandardMaterial;
  floor2Material: MeshStandardMaterial;
  obstacleMaterial: MeshStandardMaterial;
  wallMaterial: MeshStandardMaterial;
};
