import { useEffect, useState } from "react";
import { socket } from "../socket";

export function useLikes() {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const onLike = () => setLikes((likes) => likes + 1);

    socket.on("like", onLike);

    return () => {
      socket.off("like", onLike);
    };
  }, []);

  return likes;
}
