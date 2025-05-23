import { useConnection } from "../hooks/use-connection";

export default function ConnectLabel() {
  const isConnected = useConnection();

  return (
    <span className="fixed left-2 bottom-2 text-2xl text-blue-950">
      {isConnected ? "⚡️ Connected" : "🚫 Not Connected"}
    </span>
  );
}
