import ConnectLabel from "./components/connect-label";
import Player from "./components/player";
import { useLikes } from "./hooks/use-likes";
import { socket } from "./socket";

export default function App() {
  const likes = useLikes();

  const handleClick = () => socket.emit("like");

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-500">
      <ConnectLabel />
      <Player onClick={handleClick}>{likes}</Player>
    </div>
  );
}
