import { useEffect, useRef } from "react";

type Sq = {
  x: number;
  y: number;
  base: string;
  trans: { hitColor: string; t0: number; dur: number } | null;
  nextAt: number;
};

type Arc = { a: number; b: number; cpx: number; cpy: number };
type Traveler = { arcIdx: number; dir: 1 | -1; t: number; dur: number; color: string; t0: number };
type Ripple = { x: number; y: number; t0: number };

const PAL = [
  "#e07b54", "#d4a853", "#7bb87f", "#5b9bd5", "#9b6bb5",
  "#d45c5c", "#5cb8b2", "#c4875e", "#6b8e5e", "#8e6b9b",
  "#c47a7a", "#7a9eb5", "#b5a06b", "#7ab58e", "#b56b8e",
  "#5e7ab5", "#b58e5e", "#8eb55e", "#5eaab5", "#a87e5b",
];

export type NodeNetworkCanvasProps = {
  className?: string;
  bgStart?: string;
  bgEnd?: string;
  drawBackground?: boolean;
  nodeCount?: number;
  squareSize?: number;
  circleRadius?: number;
  gap?: number;
  connectionDistance?: number;
  maxConnections?: number;
  colorDurationMs?: number;
  opacity?: number;
};

function h2r(h: string): [number, number, number] {
  if (h.startsWith("rgb")) {
    const m = h.match(/\d+/g);
    if (m) return [parseInt(m[0], 10), parseInt(m[1], 10), parseInt(m[2], 10)];
  }
  const v = parseInt(h.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function lerpColor(a: string, b: string, t: number): string {
  const ra = h2r(a);
  const rb = h2r(b);
  return `rgb(${Math.round(ra[0] + (rb[0] - ra[0]) * t)},${Math.round(ra[1] + (rb[1] - ra[1]) * t)},${Math.round(ra[2] + (rb[2] - ra[2]) * t)})`;
}

function easeIn(t: number) {
  return t * t;
}

function easeOut(t: number) {
  return 1 - (1 - t) * (1 - t) * (1 - t);
}

function bPt(ax: number, ay: number, cx: number, cy: number, bx: number, by: number, t: number) {
  const u = 1 - t;
  return { x: u * u * ax + 2 * u * t * cx + t * t * bx, y: u * u * ay + 2 * u * t * cy + t * t * by };
}

function filterIsolated(sq: Sq[], arcs: Arc[]): { sq: Sq[]; arcs: Arc[] } {
  const connected = new Set<number>();
  arcs.forEach((arc) => {
    connected.add(arc.a);
    connected.add(arc.b);
  });

  const remap: number[] = new Array(sq.length).fill(-1);
  let next = 0;
  sq.forEach((_, i) => {
    if (connected.has(i)) remap[i] = next++;
  });

  return {
    sq: sq.filter((_, i) => connected.has(i)),
    arcs: arcs.map((arc) => ({ a: remap[arc.a], b: remap[arc.b], cpx: arc.cpx, cpy: arc.cpy })),
  };
}

function makeSqs(w: number, h: number, count: number, squareSize: number, gap: number): Sq[] {
  const pad = squareSize + 20;
  const res: Sq[] = [];
  let tries = 0;

  while (res.length < count && tries < 4000) {
    tries++;
    const x = pad + Math.random() * (w - pad * 2);
    const y = pad + Math.random() * (h - pad * 2);

    if (res.every((s) => Math.hypot(s.x - x, s.y - y) >= gap)) {
      res.push({
        x,
        y,
        base: PAL[res.length % PAL.length],
        trans: null,
        nextAt: Date.now() + 1500 + Math.random() * 2500,
      });
    }
  }

  return res;
}

function makeArcs(sq: Sq[], connectionDistance: number, maxConnections: number): Arc[] {
  const cnt = new Array(sq.length).fill(0);
  const res: Arc[] = [];

  for (let a = 0; a < sq.length; a++) {
    for (let b = a + 1; b < sq.length; b++) {
      if (Math.hypot(sq[a].x - sq[b].x, sq[a].y - sq[b].y) > connectionDistance) continue;
      if (cnt[a] >= maxConnections || cnt[b] >= maxConnections) continue;

      const mx = (sq[a].x + sq[b].x) / 2;
      const my = (sq[a].y + sq[b].y) / 2;
      const dx = sq[b].x - sq[a].x;
      const dy = sq[b].y - sq[a].y;
      const len = Math.hypot(dx, dy);
      const off = 25 + Math.random() * 35;

      res.push({
        a,
        b,
        cpx: mx + (-dy / len) * off,
        cpy: my + (dx / len) * off,
      });

      cnt[a]++;
      cnt[b]++;
    }
  }

  return res;
}

export default function NodeNetworkCanvas({
  className,
  bgStart = "#f5f0eb",
  bgEnd = "#ffffff",
  drawBackground = true,
  nodeCount = 26,
  squareSize = 24,
  circleRadius = 6,
  gap = 90,
  connectionDistance = 240,
  maxConnections = 4,
  colorDurationMs = 200,
  opacity = 1,
}: NodeNetworkCanvasProps) {
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
    let sq: Sq[] = [];
    let arcs: Arc[] = [];
    const travelers: Traveler[] = [];
    const ripples: Ripple[] = [];

    const resize = () => {
      const dpr = Math.ceil(window.devicePixelRatio || 1);
      lw = host.clientWidth;
      lh = host.clientHeight;
      canvas.width = lw * dpr;
      canvas.height = lh * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const rawSq = makeSqs(lw, lh, nodeCount, squareSize, gap);
      ({ sq, arcs } = filterIsolated(rawSq, makeArcs(rawSq, connectionDistance, maxConnections)));
      travelers.length = 0;
      ripples.length = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const tick = () => {
      if (!visible) {
        rafId = 0;
        return;
      }

      rafId = requestAnimationFrame(tick);
      const now = Date.now();

      sq.forEach((s, i) => {
        if (now < s.nextAt) return;
        s.nextAt = now + 1500 + Math.random() * 2500;

        const opts = arcs
          .map((arc, idx) => (arc.a === i ? { idx, dir: 1 as const } : arc.b === i ? { idx, dir: -1 as const } : null))
          .filter((x): x is { idx: number; dir: 1 | -1 } => x !== null);

        if (!opts.length) return;
        const { idx, dir } = opts[Math.floor(Math.random() * opts.length)];
        travelers.push({ arcIdx: idx, dir, t: 0, dur: 1200 + Math.random() * 600, color: s.base, t0: now });
      });

      for (let i = travelers.length - 1; i >= 0; i--) {
        const tr = travelers[i];
        tr.t = Math.min((now - tr.t0) / tr.dur, 1);
        if (tr.t >= 1) {
          const arc = arcs[tr.arcIdx];
          const di = tr.dir === 1 ? arc.b : arc.a;
          const dst = sq[di];
          ripples.push({ x: dst.x, y: dst.y, t0: now });
          dst.trans = { hitColor: tr.color, t0: now, dur: colorDurationMs };
          travelers.splice(i, 1);
        }
      }

      if (drawBackground) {
        const g = ctx.createLinearGradient(0, 0, 0, lh);
        g.addColorStop(0, bgStart);
        g.addColorStop(1, bgEnd);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, lw, lh);
      } else {
        ctx.clearRect(0, 0, lw, lh);
      }

      ctx.strokeStyle = `rgba(160,155,148,${0.4 * opacity})`;
      ctx.lineWidth = 1;
      arcs.forEach((arc) => {
        const a = sq[arc.a];
        const b = sq[arc.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(arc.cpx, arc.cpy, b.x, b.y);
        ctx.stroke();
      });

      const cols = sq.map((s) => {
        if (!s.trans) return s.base;
        const p = (now - s.trans.t0) / s.trans.dur;
        if (p >= 1) {
          s.trans = null;
          return s.base;
        }
        return lerpColor(s.trans.hitColor, s.base, easeIn(p));
      });

      sq.forEach((s, i) => {
        ctx.fillStyle = cols[i];
        ctx.globalAlpha = opacity;
        ctx.fillRect(s.x - squareSize / 2, s.y - squareSize / 2, squareSize, squareSize);
      });

      travelers.forEach((tr) => {
        const arc = arcs[tr.arcIdx];
        const a = sq[arc.a];
        const b = sq[arc.b];
        const tt = tr.dir === 1 ? easeOut(tr.t) : 1 - easeOut(tr.t);
        const p = bPt(a.x, a.y, arc.cpx, arc.cpy, b.x, b.y, tt);
        ctx.beginPath();
        ctx.arc(p.x, p.y, circleRadius, 0, Math.PI * 2);
        ctx.fillStyle = tr.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
      });

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const elapsed = now - rp.t0;
        if (elapsed > 700 * 1.45) {
          ripples.splice(i, 1);
          continue;
        }

        for (let ring = 0; ring < 3; ring++) {
          const e = elapsed - ring * 150;
          if (e < 0) continue;
          const t = Math.min(e / 700, 1);
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, t * 38, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(160,155,148,${(1 - t) * 0.6 * opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
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
  }, [bgStart, bgEnd, circleRadius, colorDurationMs, connectionDistance, drawBackground, gap, maxConnections, nodeCount, opacity, squareSize]);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <canvas style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} ref={canvasRef} />
    </div>
  );
}
