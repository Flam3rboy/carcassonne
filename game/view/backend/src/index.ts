import { Server } from "./Server";

const server = new Server({ port: 8000 });
server.start().catch(console.error);

// @ts-ignore
global.server = server;
