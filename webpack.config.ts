import path from "path";
import webpack from "webpack";

import { buildWebpack } from "./config/build/buildWebpack";
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from "./config/build/types/types";

type EnvVariables = {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3000,
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  });

  return config;
};