import { io, Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "../../server/types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
