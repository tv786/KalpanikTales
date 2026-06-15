import { useEffect, useRef } from "react";

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      opacitySpeed: number;
      color: string;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 6000); // Adjust density
      
      for (let i = 0; i < numStars; i++) {
        const isGold = Math.random() > 0.5;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.2, // Tiny stars
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          opacity: Math.random(),
          opacitySpeed: (Math.random() * 0.01) + 0.002,
          color: isGold ? "200, 150, 12" : "255, 255, 255" // Gold or white
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((star) => {
        // move
        star.x += star.vx;
        star.y -= Math.abs(star.vy); // slowly drift up
        
        // wrap around
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // twinkle
        star.opacity += star.opacitySpeed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.opacitySpeed = -star.opacitySpeed;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        
        // Subtly glow based on opacity
        ctx.fillStyle = `rgba(${star.color}, ${Math.max(0, star.opacity * 0.6)})`;
        ctx.fill();
        
        // Add a slight blur/glow effect for larger stars
        if (star.radius > 1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${Math.max(0, star.opacity * 0.15)})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen dark:opacity-100 transition-opacity duration-1000"
      />
      {/* Subtle mystical gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[rgba(200,150,12,0.03)] to-transparent dark:via-[rgba(200,150,12,0.05)] mix-blend-overlay"></div>
    </div>
  );
}
