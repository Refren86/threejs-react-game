import { Configuration } from "webpack";

import { BuildOptions } from "./types/types";

export function buildResolvers({paths}: BuildOptions): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"], // to resolve imports without extensions
    alias: {
      "@": paths.src,
    },
  };
}