import type { Configuration as DevSeverConfiguration } from "webpack-dev-server";

import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevSeverConfiguration {
    return {
        port: options.port,
        open: true,
        // if doing it with static files and nginx, then proxy should be used to redirect to the index.html
        historyApiFallback: true, // for react-router
        hot: true, // enables hot module replacement
    };
}