import path from "path";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration, DefinePlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

import { BuildOptions } from "./types/types";

export function buildPlugins({
  mode,
  paths,
  analyzer,
  platform,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html, // webpack will add the js files to this html file (scripts)
      favicon: path.resolve(paths.public, "favicon.ico"),
    }),
    // global variables: https://webpack.js.org/plugins/define-plugin/
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin()); // will show % of build progress (remove to speed up build)
    plugins.push(new ForkTsCheckerWebpackPlugin()); // will run type checking in a separate process
    plugins.push(new ReactRefreshWebpackPlugin()); // hot module reload plugin for react
  }

  if (isProd) {
    // will create a separate css chunk file
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}