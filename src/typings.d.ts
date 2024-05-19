// css modules
declare module "*.module.scss";

// assets
declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

// global variables
declare const __PLATFORM__: 'desktop' | 'mobile';
declare const __ENV__: 'production' | 'development';