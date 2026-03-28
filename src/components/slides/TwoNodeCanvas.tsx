import { useEffect, useRef } from "react";

type Ripple = { nodeIdx: number; t0: number };

const SQ_COLOR_LEFT = "#9b6bb5";
const SQ_COLOR_RIGHT = "#3d8fa3";
const SQ_SIZE = 36;
const RIPPLE_MAX_RADIUS = 52;
const RIPPLE_RING_COUNT = 3;
const RIPPLE_RING_DELAY = 150;
const RIPPLE_DURATION = 700;
const RIPPLE_INTERVAL = 2000;

export type TwoNodeCanvasProps = {
  className?: string;
};

export default function TwoNodeCanvas({ className }: TwoNodeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let visible = false;
    let lw = 0;
    let lh = 0;
    const ripples: Ripple[] = [];
    const nextAt: [number, number] = [0, 0];

    const resize = () => {
      const dpr = Math.ceil(window.devicePixelRatio || 1);
      lw = host.clientWidth;
      lh = host.clientHeight;
      canvas.width = lw * dpr;
      canvas.height = lh * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const now0 = Date.now();
    nextAt[0] = now0 + 600;
    nextAt[1] = now0 + 1600;

    const tick = () => {
      if (!visible) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(tick);
      const now = Date.now();

      const sep = Math.min(300, lw * 0.55);
      const cx = lw / 2;
      const cy = lh / 2;
      const nx = [cx - sep / 2, cx + sep / 2];
      const ny = [cy, cy];

      for (let i = 0; i < 2; i++) {
        if (now >= nextAt[i]) {
          ripples.push({ nodeIdx: i, t0: now });
          nextAt[i] = now + RIPPLE_INTERVAL + (Math.random() * 400 - 200);
        }
      }

      ctx.clearRect(0, 0, lw, lh);

      const x0 = nx[0] + SQ_SIZE / 2 + 6;
      const x1 = nx[1] - SQ_SIZE / 2 - 6;
      const lineW = x1 - x0;
      const waveAmp = 10;
      const waveCount = 4;
      const steps = 120;

      const gapHalf = 18;
      const midX = x0 + lineW / 2;
      ctx.save();
      ctx.strokeStyle = "rgba(130, 210, 230, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);
      for (let seg = 0; seg < 2; seg++) {
        const segX0 = seg === 0 ? x0 : midX + gapHalf;
        const segX1 = seg === 0 ? midX - gapHalf : x1;
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const x = segX0 + t * (segX1 - segX0);
          const tFull = (x - x0) / lineW;
          const y = cy + Math.sin(tFull * Math.PI * 2 * waveCount) * waveAmp;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const elapsed = now - rp.t0;
        const maxDur = RIPPLE_DURATION + (RIPPLE_RING_COUNT - 1) * RIPPLE_RING_DELAY + 200;
        if (elapsed > maxDur) {
          ripples.splice(i, 1);
          continue;
        }
        for (let ring = 0; ring < RIPPLE_RING_COUNT; ring++) {
          const e = elapsed - ring * RIPPLE_RING_DELAY;
          if (e < 0) continue;
          const t = Math.min(e / RIPPLE_DURATION, 1);
          ctx.beginPath();
          ctx.arc(nx[rp.nodeIdx], ny[rp.nodeIdx], t * RIPPLE_MAX_RADIUS, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200, 190, 230, ${(1 - t) * 0.55})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      ctx.fillStyle = SQ_COLOR_LEFT;
      ctx.fillRect(nx[0] - SQ_SIZE / 2, ny[0] - SQ_SIZE / 2, SQ_SIZE, SQ_SIZE);
      ctx.fillStyle = SQ_COLOR_RIGHT;
      ctx.fillRect(nx[1] - SQ_SIZE / 2, ny[1] - SQ_SIZE / 2, SQ_SIZE, SQ_SIZE);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !rafId) tick();
      },
      { threshold: 0.1 },
    );
    io.observe(host);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <canvas style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} ref={canvasRef} />
    </div>
  );
}
