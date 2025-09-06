import { getArgs } from "./utils.js";
import startBackendServer from "./server-backend.js";

const SERVER_MODES = {
    PRODUCTION: 1,
    DEVELOPMENT: 2,
};

const args = getArgs();

// Default to production mode
if (typeof args.mode === "undefined") {
    args.mode = "production";
}

if (args.mode !== "production" && args.mode !== "development") {
    throw new Error("--mode can only be 'development' or 'production'");
}

const server_mode = args.mode === "production" ? SERVER_MODES.PRODUCTION : SERVER_MODES.DEVELOPMENT;

const port = process.env.PORT || 8080;

if (server_mode === SERVER_MODES.DEVELOPMENT) {
    const { startFrontendDevServer } = await import("./server-frontend-dev.js");
    console.info("Starting server in development mode.");
    startFrontendDevServer(8080, () => startBackendServer(3000));
} else {
    console.info(`Starting server in production mode on port ${port}.`);
    startBackendServer(port);
}
