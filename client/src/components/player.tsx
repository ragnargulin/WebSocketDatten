import { useEffect, useState, type ReactNode } from "react";

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

  // Lyssna på piltangenter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPosition((prev) => {
        const step = 10;
        switch (e.key) {
          case "ArrowUp":
            return { ...prev, y: prev.y - step };
          case "ArrowDown":
            return { ...prev, y: prev.y + step };
          case "ArrowLeft":
            return { ...prev, x: prev.x - step };
          case "ArrowRight":
            return { ...prev, x: prev.x + step };
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
