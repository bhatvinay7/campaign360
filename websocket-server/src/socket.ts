import  { createServer } from "http"
import  { WebSocketServer } from "ws"
const clients = new Map;

const server = createServer();
const wss = new WebSocketServer({ server });
export {wss,clients,server}