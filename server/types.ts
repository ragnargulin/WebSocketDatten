export interface ServerToClientEvents {
  like: () => void;
}

export interface ClientToServerEvents {
  like: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
}
