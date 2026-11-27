import { useEffect, useRef } from 'react';

interface SilkWaveBackgroundProps {
  className?: string;
}

export default function SilkWaveBackground({ className = '' }: SilkWaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId = 0;
    let isVisible = true;
    const startTime = performance.now();

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (now: number) => {
      if (width <= 0 || height <= 0) {
        updateSize();
      }

      const t = (now - startTime) * 0.001;

      // Deep obsidian base
      ctx.fillStyle = '#0b0c10';
      ctx.fillRect(0, 0, width, height);

      // Soft ambient backdrop glow along the diagonal sweep
      const bgGlow = ctx.createRadialGradient(
        width * 0.42,
        height * 0.48,
        10,
        width * 0.42,
        height * 0.48,
        width * 0.58
      );
      bgGlow.addColorStop(0, 'rgba(170, 178, 195, 0.09)');
      bgGlow.addColorStop(0.5, 'rgba(197, 160, 89, 0.045)');
      bgGlow.addColorStop(1, 'rgba(11, 12, 16, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      const layers = 18;
      const steps = 96;
      const amplitudeScale = Math.min(Math.max(height / 420, 0.85), 1.65);

      for (let l = 0; l < layers; l++) {
        const normL = l / (layers - 1);
        const pointsTop: { x: number; y: number }[] = [];
        const pointsBottom: { x: number; y: number }[] = [];

        for (let i = 0; i <= steps; i++) {
          const u = i / steps;
          const x = u * width;

          // Diagonal baseline sweeping from lower-left (0.68*h) to upper-right (0.34*h)
          const baseDiagonal = height * (0.68 - 0.34 * u + 0.06 * Math.sin(u * Math.PI));

          // Flowing organic wave harmonics
          const wave1 =
            Math.sin(u * 4.2 - t * 0.9 + normL * 2.6) *
            (26 + 18 * Math.sin(normL * Math.PI)) *
            amplitudeScale;
          const wave2 =
            Math.cos(u * 7.5 + t * 0.55 - normL * 3.4) * 14 * (1 - 0.4 * u) * amplitudeScale;
          const wave3 = Math.sin(u * 2.8 - t * 0.4 + l * 0.45) * 18 * amplitudeScale;

          // Satin fold pinch / twist
          const pinch = 0.45 + 0.55 * Math.sin(u * Math.PI * 1.15 + 0.2);
          const spread = (normL - 0.5) * 95 * amplitudeScale * pinch;

          const yTop = baseDiagonal + spread + (wave1 + wave2 + wave3) * pinch;
          const ribbonThickness =
            (22 + 28 * Math.sin(normL * Math.PI)) * amplitudeScale * (1.15 - 0.55 * u);
          const yBottom = yTop + ribbonThickness;

          pointsTop.push({ x, y: yTop });
          pointsBottom.push({ x, y: yBottom });
        }

        // Volumetric 3D satin ribbon fold
        ctx.beginPath();
        ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
        for (let i = 1; i <= steps; i++) {
          ctx.lineTo(pointsTop[i].x, pointsTop[i].y);
        }
        for (let i = steps; i >= 0; i--) {
          ctx.lineTo(pointsBottom[i].x, pointsBottom[i].y);
        }
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, height * 0.65, width, height * 0.35);
        const specIntensity = Math.pow(Math.sin(normL * Math.PI), 1.8);

        grad.addColorStop(0, `rgba(200, 206, 218, ${0.03 + specIntensity * 0.14})`);
        grad.addColorStop(0.22, `rgba(235, 240, 248, ${0.05 + specIntensity * 0.22})`);
        grad.addColorStop(0.48, `rgba(197, 160, 89, ${0.02 + specIntensity * 0.1})`);
        grad.addColorStop(0.75, `rgba(180, 188, 202, ${0.02 + specIntensity * 0.11})`);
        grad.addColorStop(1, 'rgba(11, 12, 16, 0)');

        ctx.fillStyle = grad;
        ctx.fill();

        // Specular ridge highlights along key folds
        if (l % 3 === 1) {
          ctx.beginPath();
          ctx.moveTo(pointsTop[0].x, pointsTop[0].y);
          for (let i = 1; i <= steps; i++) {
            ctx.lineTo(pointsTop[i].x, pointsTop[i].y);
          }

          const ridgeGrad = ctx.createLinearGradient(0, 0, width, 0);
          const ridgeAlpha = 0.12 + specIntensity * 0.38;
          ridgeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
          ridgeGrad.addColorStop(0.2, `rgba(245, 247, 252, ${ridgeAlpha})`);
          ridgeGrad.addColorStop(0.45, `rgba(212, 182, 124, ${ridgeAlpha * 0.85})`);
          ridgeGrad.addColorStop(0.75, `rgba(220, 226, 236, ${ridgeAlpha * 0.5})`);
          ridgeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.strokeStyle = ridgeGrad;
          ctx.lineWidth = l === 7 || l === 10 ? 1.8 : 1.0;
          ctx.stroke();
        }
      }

      // Soft vignette overlay for optimal typography contrast
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        width * 0.15,
        width * 0.5,
        height * 0.5,
        width * 0.75
      );
      vignette.addColorStop(0, 'rgba(11, 12, 16, 0.15)');
      vignette.addColorStop(1, 'rgba(11, 12, 16, 0.65)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const tick = (now: number) => {
      if (!isVisible) return;
      drawFrame(now);
      animationFrameId = window.requestAnimationFrame(tick);
    };

    updateSize();
    drawFrame(performance.now());
    animationFrameId = window.requestAnimationFrame(tick);

    let resizeRafId = 0;
    const resizeObserver = new ResizeObserver(() => {
      if (resizeRafId) window.cancelAnimationFrame(resizeRafId);
      resizeRafId = window.requestAnimationFrame(() => {
        updateSize();
        drawFrame(performance.now());
      });
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', updateSize, { passive: true });

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible) {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = window.requestAnimationFrame(tick);
          } else if (!isVisible) {
            window.cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { rootMargin: '200px' }
    );
    intersectionObserver.observe(container);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      if (resizeRafId) window.cancelAnimationFrame(resizeRafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block transform-gpu" />
    </div>
  );
}
