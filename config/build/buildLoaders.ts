import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

import { BuildOptions } from "./types/types";

export function buildLoaders({ mode }: BuildOptions): ModuleOptions["rules"] {
  const isDev = mode === "development";

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      // modules: {
      //   localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      // },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  // TODO: DOUBLE CHECK IF NEEDED!
  // const glslLoader = {
  //   test: /\.(frag|vert|glsl)$/,
  //   exclude: /node_modules/,
  //   use: [
  //     'raw-loader',
  //     'glslify-loader'
  //   ]
  // }

  // ts-loader knows how to work with jsx/tsx
  // !!! If I do not use typescript(ts-loader), I must use babel-loader instead with jsx !!!
  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev, // will not check types, only transpile ts into js (will speed up bundling!)
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [assetsLoader, scssLoader, tsLoader, svgrLoader];
}