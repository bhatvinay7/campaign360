// components/ScratchCard.tsx
import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  width: number;
  height: number;
  children: React.ReactNode;
  onComplete?: () => void;
  coverColor?: string;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ width, height, children, onComplete, coverColor = '#3d53ff' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = coverColor;
      ctx.fillRect(0, 0, width, height);
    }

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!canvas || !ctx || isCompleted) return;

      const rect = canvas.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as MouseEvent).clientX - rect.left;
      const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as MouseEvent).clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.fill();

      checkReveal();
    };

    const checkReveal = () => {
      const imageData = ctx?.getImageData(0, 0, width, height);
      const pixels = imageData?.data ? imageData?.data :[];
      let cleared = 0;

      for (let i = 3; i < pixels?.length ; i += 4) {
        if (pixels[i] < 128) cleared++;
      }

      const percent = (cleared / (pixels.length / 4)) * 100;
      if (percent > 70 && !isCompleted) {
        setIsCompleted(true);
        onComplete?.();
      }
    };

    canvas?.addEventListener('mousemove', scratch);
    canvas?.addEventListener('touchmove', scratch);

    return () => {
      canvas?.removeEventListener('mousemove', scratch);
      canvas?.removeEventListener('touchmove', scratch);
    };
  }, [isCompleted, width, height, onComplete, coverColor]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width, height }}
      className="rounded-xl border-2  border-green-950/45 bg-slate-800 overflow-hidden shadow-lg"
    >
      <div  style={{ width, height, position: 'absolute', zIndex: 1 }}>
        {children}
      </div>
      {!isCompleted && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 2,
            cursor: 'crosshair',
           
          }}
        />
      )}
    </div>
  );
};

export default ScratchCard;
