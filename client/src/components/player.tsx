import { useEffect, useState, type ReactNode } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export default function Player({ children, onClick }: Props) {
  const [wobble, setWobble] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleAnimationEnd = () => {
    setWobble(false);
  };

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
    setWobble(true);
  }, [children]);

  // Send position on arrow key press
  useEffect(() => {
    const step = 10;
    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition((prev) => {
        const newPos = { ...prev };
        switch (e.key) {
          case "ArrowUp":
            newPos.y -= step;
            break;
          case "ArrowDown":
            newPos.y += step;
            break;
          case "ArrowLeft":
            newPos.x -= step;
            break;
          case "ArrowRight":
            newPos.x += step;
            break;
          default:
            return prev;
        }
        socket.emit("position", newPos); // 🟢 emit new position
        return newPos;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 🟣 Update position when others move the player
  useEffect(() => {
    socket.on("playerMoved", (pos) => {
      setPosition(pos);
    });

    return () => {
      socket.off("playerMoved");
    };
  }, []);

  return (
    <div
      key={animationKey}
      onClick={onClick}
      onAnimationEnd={handleAnimationEnd}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: "absolute",
      }}
      className={`
        w-56 h-56
        flex items-center justify-center
        rounded-full
        bg-blue-600 text-white
        text-5xl font-extrabold
        cursor-pointer select-none
        shadow-2xl
        ${wobble ? "animate-wobble" : ""}
      `}
    >
      {children}
    </div>
  );
}
