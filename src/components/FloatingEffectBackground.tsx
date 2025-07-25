import { useEffect, useRef } from "react";

function getShuffledImages() {
  const arr = Array(16).fill(0).map((_, i) => `/effect/${i + 1}.png`);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const FloatingEffectBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (containerRef.current) {
        Array.from(containerRef.current.children).forEach((el, idx) => {
          const speed = (idx % 5 + 1) * 2.5;
          (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {(() => {
        // 격자 기반 골고루 분포 좌표 생성
        const gridRows = 4;
        const gridCols = 4;
        const usedCoords: { left: number; top: number }[] = [];
        const images = getShuffledImages();
        return images.map((src, idx) => {
          const size = getRandom(100, 180);
          // 격자 위치 계산
          const row = Math.floor(idx / gridCols);
          const col = idx % gridCols;
          let left = Math.round((col + 0.2) * (100 / gridCols) + getRandom(-6, 6)) + 5;
          let top = Math.round((row + 0.5) * (100 / gridRows) + getRandom(-6, 6));
          left = Math.max(5, Math.min(left, 95));
          top = Math.max(0, Math.min(top, 90));
          // 이미 사용된 좌표와 너무 가까우면 살짝 이동
          while (usedCoords.some(c => Math.abs(c.left - left) < 8 && Math.abs(c.top - top) < 8)) {
            left = Math.max(0, Math.min(left + getRandom(-8, 8), 95));
            top = Math.max(0, Math.min(top + getRandom(-8, 8), 90));
          }
          usedCoords.push({ left, top });
          const duration = getRandom(8, 18);
          const effects = [
            `float${idx}`,
            `floatRotate${idx}`,
            `floatScale${idx}`,
            `floatX${idx}`,
          ];
          const effectType = effects[Math.floor(getRandom(0, effects.length))];
          return (
            <img
              key={idx}
              src={src}
              alt="effect"
              style={{
                position: "absolute",
                left: `${left}%`,
                top: `${top}%`,
                width: size,
                height: size,
                opacity: 0.7,
                animation: `${effectType} ${duration}s ease-in-out infinite alternate`,
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.12))",
                transition: "transform 0.3s",
              }}
            />
          );
        });
      })()}
      <style>{`
        ${Array(16).fill(0).map((_, idx) => `
          @keyframes float${idx} {
            0% { transform: translateY(0px) scale(1); }
            100% { transform: translateY(-80px) scale(1.15); }
          }
          @keyframes floatRotate${idx} {
            0% { transform: translateY(0px) rotate(45deg); }
            100% { transform: translateY(-80px) rotate(60deg); }
          }
          @keyframes floatScale${idx} {
            0% { transform: scale(1) translateY(0px) rotate(-75deg); }
            100% { transform: scale(1.35) translateY(-60px); }
          }
          @keyframes floatX${idx} {
            0% { transform: translateX(0px) translateY(0px); }
            100% { transform: translateX(80px) translateY(-40px) rotate(-40deg); }
          }
        `).join("")}
      `}</style>
    </div>
  );
};

export default FloatingEffectBackground;
