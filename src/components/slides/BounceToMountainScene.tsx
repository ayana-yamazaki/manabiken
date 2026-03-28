import { useEffect, useRef } from "react";
import type { SlideData } from "../../data/slides";
import SlideTextArea from "./SlideTextArea";
import MountainVizSvg from "./MountainVizSvg";

// ── BounceViz constants ───────────────────────────────────────────────────────
const VB_H        = 720;
const MID_Y       = VB_H / 2;
const BASE_RATE   = 0.30;
const SPEED_BOUNCE = 0.54;
const ROT_BOUNCE  = 180;

function physicsEase(y: number): number {
  if (y < MID_Y) {
    const t = (MID_Y - y) / MID_Y;
    return Math.max(0.12, Math.sqrt(1 - t * 0.90));
  }
  return 0.30;
}

function generateBouncePath(peakScale: number = 1.0, extraDip: boolean = false): string {
  const peakH0   = Math.round(280 * peakScale);
  const bounceW0 = 190;
  const decay    = 0.78;
  const midY     = MID_Y;
  const cmds: string[] = [];
  let x = 0;
  let y = midY;
  cmds.push(`M ${x},${y}`);

  const addBounces = (n: number): void => {
    for (let i = 0; i < n; i++) {
      const w  = Math.round(bounceW0 * Math.pow(decay, i));
      const h  = Math.round(peakH0  * Math.pow(decay, i));
      const x1 = x + w;
      const y1 = (i < n - 1) ? midY - Math.round(Math.random() * 190 + 30) : midY;
      const rawH  = Math.round(h * (0.5 + Math.random() * 0.7));
      const peakY = Math.max(10, Math.min(y, y1) - rawH);
      const cp1x  = Math.round(x  + (x1 - x) / 3);
      const cp1y  = Math.round(y  + (peakY - y)  * 2 / 3);
      const cp2x  = Math.round(x1 - (x1 - x) / 3);
      const cp2y  = Math.round(y1 + (peakY - y1) * 2 / 3);
      cmds.push(`C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`);
      x = x1;
      y = y1;
    }
  };

  const addBottomZone = (width: number): void => {
    const groundY  = Math.min(VB_H - 20, midY + Math.round(240 * peakScale));
    const x0       = x;
    const dropX    = x0 + Math.round(30 + Math.random() * 50);
    const riseX    = x0 + width - Math.round(30 + Math.random() * 50);
    const xEnd     = x0 + width;
    cmds.push(`C ${x0 + 15},${midY + Math.round(120 * peakScale)} ${dropX - 10},${groundY} ${dropX},${groundY}`);
    const numSegs = 4 + Math.floor(Math.random() * 4);
    let cx = dropX;
    let cy = groundY;
    for (let i = 0; i < numSegs; i++) {
      const isLast = i === numSegs - 1;
      const nextX  = isLast ? riseX : Math.round(dropX + (riseX - dropX) * (i + 1) / numSegs);
      const nextY  = isLast ? cy    : groundY + Math.round((Math.random() - 0.5) * 30);
      const bumpH1 = Math.round(Math.random() * 45 * peakScale);
      const bumpH2 = Math.round(Math.random() * 45 * peakScale);
      const cp1x   = Math.round(cx + (nextX - cx) * (0.15 + Math.random() * 0.35));
      const cp1y   = cy - bumpH1;
      const cp2x   = Math.round(cx + (nextX - cx) * (0.50 + Math.random() * 0.35));
      const cp2y   = nextY - bumpH2;
      cmds.push(`C ${cp1x},${cp1y} ${cp2x},${cp2y} ${nextX},${nextY}`);
      cx = nextX;
      cy = nextY;
    }
    cmds.push(`C ${cx + 10},${cy} ${xEnd - 15},${midY + Math.round(80 * peakScale)} ${xEnd},${midY}`);
    x = xEnd;
    y = midY;
  };

  if (extraDip) {
    addBounces(2); addBottomZone(220); addBounces(2); addBottomZone(220);
  } else {
    addBounces(3); addBottomZone(320); addBounces(3);
  }
  cmds.push(`C ${x + 30},${midY} 1270,${midY} 1280,${midY}`);
  return cmds.join(' ');
}

// ── Component ─────────────────────────────────────────────────────────────────
type Props = {
  bounceSlide: SlideData;
  mountainSlide: SlideData;
  bounceIndex: number;
  mountainIndex: number;
};

export default function BounceToMountainScene({ bounceSlide, mountainSlide, bounceIndex, mountainIndex }: Props) {
  const trailRef1   = useRef<SVGPathElement>(null);
  const moverRef1   = useRef<SVGGElement>(null);
  const spinnerRef1 = useRef<SVGGElement>(null);
  const trailRef2   = useRef<SVGPathElement>(null);
  const moverRef2   = useRef<SVGGElement>(null);
  const spinnerRef2 = useRef<SVGGElement>(null);
  const trailRef3   = useRef<SVGPathElement>(null);
  const moverRef3   = useRef<SVGGElement>(null);
  const spinnerRef3 = useRef<SVGGElement>(null);
  const mountainOverlayRef = useRef<HTMLDivElement>(null);

  // ── BounceViz animation ──────────────────────────────────────────────────
  useEffect(() => {
    const tracks = [
      { trail: trailRef1.current, mover: moverRef1.current, spinner: spinnerRef1.current },
      { trail: trailRef2.current, mover: moverRef2.current, spinner: spinnerRef2.current },
      { trail: trailRef3.current, mover: moverRef3.current, spinner: spinnerRef3.current },
    ];
    if (tracks.some(t => !t.trail || !t.mover || !t.spinner)) return;

    const hiddenSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    hiddenSvg.setAttribute("style", "position:absolute;visibility:hidden;width:0;height:0;overflow:hidden;");
    document.body.appendChild(hiddenSvg);

    const TRACK_CONFIGS = [
      { peakScale: 1.0,  delay: 0,    extraDip: false },
      { peakScale: 0.3,  delay: 500,  extraDip: false },
      { peakScale: 1.5,  delay: 1000, extraDip: true  },
    ];

    const instances = tracks.map(({ trail, mover, spinner }, i) => {
      const calcPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const generatedPath = generateBouncePath(TRACK_CONFIGS[i].peakScale, TRACK_CONFIGS[i].extraDip);
      calcPath.setAttribute("d", generatedPath);
      trail!.setAttribute("d", generatedPath);
      hiddenSvg.appendChild(calcPath);
      const totalLength = calcPath.getTotalLength();
      trail!.style.strokeDasharray  = String(totalLength);
      trail!.style.strokeDashoffset = String(totalLength);
      return { trail: trail!, mover: mover!, spinner: spinner!, calcPath, totalLength, delay: TRACK_CONFIGS[i].delay };
    });

    const rafIds: (number | null)[] = [null, null, null];
    const timeoutIds: (ReturnType<typeof setTimeout> | null)[] = [null, null, null];

    function startAll() {
      instances.forEach(({ trail, mover, spinner, calcPath, totalLength, delay }, idx) => {
        if (rafIds[idx]) cancelAnimationFrame(rafIds[idx]!);
        if (timeoutIds[idx]) clearTimeout(timeoutIds[idx]!);
        mover.setAttribute("transform", "translate(0, 360)");
        spinner.setAttribute("transform", "rotate(0)");
        trail.style.strokeDashoffset = String(totalLength);
        timeoutIds[idx] = setTimeout(() => {
          let pathParam = 0;
          let rotation  = 0;
          let prevTime: number | null = null;
          function animate(timestamp: number) {
            if (!prevTime) { prevTime = timestamp; rafIds[idx] = requestAnimationFrame(animate); return; }
            const delta = Math.min((timestamp - prevTime) / 1000, 0.05);
            prevTime = timestamp;
            const curPt = calcPath.getPointAtLength(pathParam * totalLength);
            const ease  = physicsEase(curPt.y);
            pathParam = Math.min(pathParam + delta * BASE_RATE * SPEED_BOUNCE * ease, 1.0);
            const newPt = calcPath.getPointAtLength(pathParam * totalLength);
            rotation += delta * ROT_BOUNCE * ease;
            mover.setAttribute("transform", `translate(${newPt.x}, ${newPt.y})`);
            spinner.setAttribute("transform", `rotate(${rotation})`);
            trail.style.strokeDashoffset = String(totalLength * (1 - pathParam));
            if (pathParam < 1.0) rafIds[idx] = requestAnimationFrame(animate);
          }
          rafIds[idx] = requestAnimationFrame(animate);
        }, delay);
      });
    }

    const section = document.getElementById(bounceSlide.id);
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          startAll();
          section?.querySelector<HTMLElement>(".slide__text")?.classList.add("is-visible");
        }
      },
      { threshold: 0.3 }
    );
    if (section) observer.observe(section);

    return () => {
      rafIds.forEach(rid => { if (rid) cancelAnimationFrame(rid); });
      timeoutIds.forEach(tid => { if (tid) clearTimeout(tid); });
      observer.disconnect();
      document.body.removeChild(hiddenSvg);
    };
  }, [bounceSlide.id]);

  // ── MountainViz animation + overlay reveal ───────────────────────────────
  useEffect(() => {
    const waterLevel  = document.getElementById("waterLevel");
    const waveFront   = document.getElementById("waveFront");
    const waveBack    = document.getElementById("waveBack");
    const waveShimmer = document.getElementById("waveShimmer");
    const mtnSection  = document.getElementById(mountainSlide.id);
    if (!waterLevel || !mtnSection) return;

    const yStart = 600, yEnd = 270, dur = 2;
    let t0 = 0, active = false;

    const timer = window.setInterval(() => {
      const now = Date.now() / 1000;
      if (waveFront) waveFront.setAttribute("transform", `translate(${-100 + 100 * Math.cos((2 * Math.PI * now) / 14)},0)`);
      if (waveBack)  waveBack.setAttribute("transform",  `translate(${-100 + 100 * Math.cos((2 * Math.PI * now) / 18)},0)`);
      if (waveShimmer) waveShimmer.setAttribute("transform", `translate(${-100 + 100 * Math.cos((2 * Math.PI * now) / 14)},0)`);
      if (!mtnSection.classList.contains("is-active")) return;
      if (!active) { active = true; t0 = now; }
      const e = now - t0;
      const p = 1 - Math.pow(1 - Math.min(e / dur, 1), 3);
      waterLevel.setAttribute("y", String(yStart - (yStart - yEnd) * p));
      if (waveShimmer && e > 3.5) waveShimmer.setAttribute("opacity", String(Math.min((e - 3.5) / 0.8, 1)));
    }, 50);

    const mtnObserver = new IntersectionObserver(
      (entries) => {
        const intersecting = entries[0].isIntersecting;
        if (intersecting) {
          mtnSection.classList.add("is-active");
          mtnSection.querySelector<HTMLElement>(".slide__text")?.classList.add("is-visible");
        }
        if (mountainOverlayRef.current) {
          mountainOverlayRef.current.style.opacity = intersecting ? "1" : "0";
          mountainOverlayRef.current.style.transform = intersecting ? "translateY(0)" : "translateY(100%)";
        }
      },
      { threshold: 0.15 }
    );
    mtnObserver.observe(mtnSection);

    return () => {
      window.clearInterval(timer);
      mtnObserver.disconnect();
    };
  }, [mountainSlide.id]);

  return (
    <div style={{ position: "relative", height: "200vh" }}>

      {/* ── STICKY BACKGROUND LAYER ─────────────────────────────────────── */}
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Zone background divs */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }} aria-hidden="true">
          <div style={{ flex: 1 }} />
          <div style={{ flex: 1 }} />
        </div>

        {/* Boundary line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", left: 0, width: "100%", height: "1px", top: "50%",
            transform: "translateY(-50%)",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 15%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.25) 85%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* BounceViz SVG */}
        <svg
          viewBox="0 0 1280 720"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <defs>
            <filter id="bv-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <path ref={trailRef1} d="" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          <path ref={trailRef2} d="" fill="none" stroke="#5a9e94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          <path ref={trailRef3} d="" fill="none" stroke="#c9b84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
          <g ref={moverRef1}><g ref={spinnerRef1}><rect x="-16" y="-16" width="32" height="32" rx="2" fill="#ff6b35" /><rect x="-16" y="-16" width="32" height="10" rx="2" fill="rgba(255,255,255,0.28)" /></g></g>
          <g ref={moverRef2}><g ref={spinnerRef2}><rect x="-16" y="-16" width="32" height="32" rx="2" fill="#5a9e94" /><rect x="-16" y="-16" width="32" height="10" rx="2" fill="rgba(255,255,255,0.28)" /></g></g>
          <g ref={moverRef3}><g ref={spinnerRef3}><rect x="-16" y="-16" width="32" height="32" rx="2" fill="#c9b84c" /><rect x="-16" y="-16" width="32" height="10" rx="2" fill="rgba(255,255,255,0.28)" /></g></g>
        </svg>

        {/* Mountain overlay (fades in when mountain section intersects) */}
        <div
          ref={mountainOverlayRef}
          style={{ position: "absolute", inset: 0, opacity: 0, transform: "translateY(100%)", transition: "opacity 1.5s ease, transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)", pointerEvents: "none" }}
        >
          <MountainVizSvg />
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT LAYER ────────────────────────────────────── */}
      <div style={{ position: "relative", marginTop: "-100vh", zIndex: 1 }}>

        {/* Section 1: slide-bounce text */}
        <section
          id={bounceSlide.id}
          data-slide-number={bounceIndex + 1}
          data-bg-start={bounceSlide.bgStart}
          data-bg-end={bounceSlide.bgEnd}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            position: "relative",
            color: "#1a1a2e",
          }}
        >
          {bounceSlide.content && (
            <div className="slide__inner" style={{ position: "relative", zIndex: 2 }}>
              <SlideTextArea content={bounceSlide.content} />
            </div>
          )}
        </section>

        {/* Section 2: mountain-viz text */}
        <section
          id={mountainSlide.id}
          data-slide-number={mountainIndex + 1}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            position: "relative",
            color: "#1a1a2e",
          }}
        >
          {mountainSlide.content && <SlideTextArea content={mountainSlide.content} textClassName="slide__text--float" />}
        </section>

      </div>
    </div>
  );
}
