import { useEffect, useState, type ReactNode } from "react";

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export default function Droplet({ children, onClick }: Props) {
  const [wobble, setWobble] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleAnimationEnd = () => {
    setWobble(false);
  };

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
    setWobble(true);
  }, [children]);

  return (
    <div
      key={animationKey}
      onClick={onClick}
      onAnimationEnd={handleAnimationEnd}
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
