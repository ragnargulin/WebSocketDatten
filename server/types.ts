export interface ServerToClientEvents {
  like: () => void;
  position: (pos: { x: number; y: number }) => void;
  playerMoved: (pos: { x: number; y: number }) => void;

}

export interface ClientToServerEvents {
  like: () => void;
  position: (pos: { x: number; y: number }) => void;
  playerMoved: (pos: { x: number; y: number }) => void;

}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
}
