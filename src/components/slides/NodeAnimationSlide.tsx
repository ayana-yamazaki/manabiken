import { useEffect, useRef } from "react";

type Sq = {
  x: number; y: number;
  base: string;
  trans: { startColor: string; hitColor: string; t0: number; dur: number } | null;
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

const SQ = 28, CR = 10, GAP = 90, CDIST = 240, MCONN = 4;
const SPAWN_LO = 1500, SPAWN_HI = 4000;
const TRAV_LO = 1200, TRAV_HI = 1800;
const RDUR = 700, CDUR = 2000;

function h2r(h: string): [number, number, number] {
  if (h.startsWith("rgb")) {
    const m = h.match(/\d+/g);
    if (m) return [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])];
  }
  const v = parseInt(h.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}
function lerpColor(a: string, b: string, t: number): string {
  const ra = h2r(a), rb = h2r(b);
  return `rgb(${Math.round(ra[0] + (rb[0] - ra[0]) * t)},${Math.round(ra[1] + (rb[1] - ra[1]) * t)},${Math.round(ra[2] + (rb[2] - ra[2]) * t)})`;
}
function easeIn(t: number) { return t * t; }
function easeOut(t: number) { return 1 - (1 - t) * (1 - t) * (1 - t); }
function getColor(s: Sq, now: number): string {
  if (!s.trans) return s.base;
  const p = (now - s.trans.t0) / s.trans.dur;
  if (p >= 1) return s.base;
  if (p < 0.5) return lerpColor(s.trans.startColor, s.trans.hitColor, easeIn(p * 2));
  return lerpColor(s.trans.hitColor, s.base, easeIn((p - 0.5) * 2));
}
function bPt(ax: number, ay: number, cx: number, cy: number, bx: number, by: number, t: number) {
  const u = 1 - t;
  return { x: u * u * ax + 2 * u * t * cx + t * t * bx, y: u * u * ay + 2 * u * t * cy + t * t * by };
}

function makeSqs(w: number, h: number): Sq[] {
  const pad = SQ + 20;
  const res: Sq[] = [];
  let tries = 0;
  while (res.length < 20 && tries < 4000) {
    tries++;
    const x = pad + Math.random() * (w - pad * 2);
    const y = pad + Math.random() * (h - pad * 2);
    if (res.every(s => Math.hypot(s.x - x, s.y - y) >= GAP)) {
      res.push({
        x, y,
        base: PAL[res.length],
        trans: null,
        nextAt: Date.now() + SPAWN_LO + Math.random() * (SPAWN_HI - SPAWN_LO),
      });
    }
  }
  return res;
}

function makeArcs(sq: Sq[]): Arc[] {
  const cnt = new Array(sq.length).fill(0);
  const res: Arc[] = [];
  for (let a = 0; a < sq.length; a++) {
    for (let b = a + 1; b < sq.length; b++) {
      if (Math.hypot(sq[a].x - sq[b].x, sq[a].y - sq[b].y) > CDIST) continue;
      if (cnt[a] >= MCONN || cnt[b] >= MCONN) continue;
      const mx = (sq[a].x + sq[b].x) / 2, my = (sq[a].y + sq[b].y) / 2;
      const dx = sq[b].x - sq[a].x, dy = sq[b].y - sq[a].y;
      const len = Math.hypot(dx, dy);
      const off = 25 + Math.random() * 35;
      res.push({ a, b, cpx: mx + (-dy / len) * off, cpy: my + (dx / len) * off });
      cnt[a]++; cnt[b]++;
    }
  }
  return res;
}

type Props = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  observeAsActive?: boolean;
};

export default function NodeAnimationSlide({ id, slideNumber, className, bgStart, bgEnd, observeAsActive }: Props) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const sec = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = cvs.current, section = sec.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0, visible = false, lw = 0, lh = 0;
    let sq: Sq[] = [], arcs: Arc[] = [];
    const travelers: Traveler[] = [], ripples: Ripple[] = [];

    const resize = () => {
      const dpr = Math.ceil(window.devicePixelRatio || 1);
      lw = section.clientWidth;
      lh = section.clientHeight;
      canvas.width = lw * dpr;
      canvas.height = lh * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sq = makeSqs(lw, lh);
      arcs = makeArcs(sq);
      travelers.length = 0;
      ripples.length = 0;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(section);
    resize();

    const tick = () => {
      if (!visible) { rafId = 0; return; }
      rafId = requestAnimationFrame(tick);
      const now = Date.now();

      sq.forEach((s, i) => {
        if (now < s.nextAt) return;
        s.nextAt = now + SPAWN_LO + Math.random() * (SPAWN_HI - SPAWN_LO);
        const opts = arcs
          .map((arc, idx) => arc.a === i ? { idx, dir: 1 as const } : arc.b === i ? { idx, dir: -1 as const } : null)
          .filter((x): x is { idx: number; dir: 1 | -1 } => x !== null);
        if (!opts.length) return;
        const { idx, dir } = opts[Math.floor(Math.random() * opts.length)];
        travelers.push({ arcIdx: idx, dir, t: 0, dur: TRAV_LO + Math.random() * (TRAV_HI - TRAV_LO), color: s.base, t0: now });
      });

      for (let i = travelers.length - 1; i >= 0; i--) {
        const tr = travelers[i];
        tr.t = Math.min((now - tr.t0) / tr.dur, 1);
        if (tr.t >= 1) {
          const arc = arcs[tr.arcIdx];
          const di = tr.dir === 1 ? arc.b : arc.a;
          const dst = sq[di];
          ripples.push({ x: dst.x, y: dst.y, t0: now });
          dst.trans = { startColor: getColor(dst, now), hitColor: tr.color, t0: now, dur: CDUR };
          travelers.splice(i, 1);
        }
      }

      const g = ctx.createLinearGradient(0, 0, 0, lh);
      g.addColorStop(0, bgStart);
      g.addColorStop(1, bgEnd);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, lw, lh);

      ctx.strokeStyle = "rgba(160,155,148,0.4)";
      ctx.lineWidth = 1;
      arcs.forEach(arc => {
        const a = sq[arc.a], b = sq[arc.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(arc.cpx, arc.cpy, b.x, b.y);
        ctx.stroke();
      });

      const cols = sq.map(s => {
        if (!s.trans) return s.base;
        const p = (now - s.trans.t0) / s.trans.dur;
        if (p >= 1) { s.trans = null; return s.base; }
        if (p < 0.5) return lerpColor(s.trans.startColor, s.trans.hitColor, easeIn(p * 2));
        return lerpColor(s.trans.hitColor, s.base, easeIn((p - 0.5) * 2));
      });

      sq.forEach((s, i) => {
        ctx.fillStyle = cols[i];
        ctx.fillRect(s.x - SQ / 2, s.y - SQ / 2, SQ, SQ);
      });

      travelers.forEach(tr => {
        const arc = arcs[tr.arcIdx];
        const a = sq[arc.a], b = sq[arc.b];
        const tt = tr.dir === 1 ? easeOut(tr.t) : 1 - easeOut(tr.t);
        const p = bPt(a.x, a.y, arc.cpx, arc.cpy, b.x, b.y, tt);
        ctx.beginPath();
        ctx.arc(p.x, p.y, CR, 0, Math.PI * 2);
        ctx.fillStyle = tr.color;
        ctx.fill();
      });

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        const el = now - rp.t0;
        if (el > RDUR * 1.45) { ripples.splice(i, 1); continue; }
        for (let ring = 0; ring < 3; ring++) {
          const e = el - ring * 150;
          if (e < 0) continue;
          const t = Math.min(e / RDUR, 1);
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, t * 38, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(160,155,148,${(1 - t) * 0.6})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !rafId) tick();
    }, { threshold: 0.1 });
    io.observe(section);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [bgStart, bgEnd]);

  return (
    <section
      ref={sec}
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-observe-active={observeAsActive ? "true" : undefined}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <canvas
        ref={cvs}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />
    </section>
  );
}
