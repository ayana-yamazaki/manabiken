import { useEffect, useRef } from "react";

type BounceVizSlideProps = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  backgroundType?: string;
  backgroundAnimation?: string;
  observeAsActive?: boolean;
  caption?: string;
};

const PATH_D = [
  "M 0,360",
  "C 60,360  160,80  240,80",
  "C 320,80  380,620 480,620",
  "C 580,620 600,60  680,60",
  "C 760,60  800,640 880,640",
  "C 960,640 1200,360 1280,360",
].join(" ");

const MID_Y        = 360;
const BASE_RATE    = 0.115;
const SPEED_TOP    = 2.4;
const SPEED_BOTTOM = 0.38;
const ROT_TOP      = 380;
const ROT_BOTTOM   = 18;

function jitter(t: number): number {
  return 0.7 + 0.3 * Math.abs(Math.sin(t * 18.0));
}

export default function BounceVizSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  backgroundType,
  backgroundAnimation,
  observeAsActive,
  caption,
}: BounceVizSlideProps) {
  const trailRef   = useRef<SVGPathElement>(null);
  const moverRef   = useRef<SVGGElement>(null);
  const spinnerRef = useRef<SVGGElement>(null);
  const squareRef  = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!trailRef.current || !moverRef.current || !spinnerRef.current || !squareRef.current) return;

    const trail   = trailRef.current;
    const mover   = moverRef.current;
    const spinner = spinnerRef.current;
    const square  = squareRef.current;

    const hiddenSvg  = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const calcPath   = document.createElementNS("http://www.w3.org/2000/svg", "path");
    hiddenSvg.setAttribute("style", "position:absolute;visibility:hidden;width:0;height:0;overflow:hidden;");
    calcPath.setAttribute("d", PATH_D);
    hiddenSvg.appendChild(calcPath);
    document.body.appendChild(hiddenSvg);

    const totalLength = calcPath.getTotalLength();
    trail.style.strokeDasharray  = String(totalLength);
    trail.style.strokeDashoffset = String(totalLength);

    let pathParam = 0;
    let rotation  = 0;
    let prevTime: number | null = null;
    let rafId: number | null = null;
    let lastInTop: boolean | null = null;

    function updateSquareVisual(inTop: boolean) {
      if (!square || !spinner || inTop === lastInTop) return;
      lastInTop = inTop;
      if (inTop) {
        square.style.fill   = "#ff6b35";
        square.style.filter = "url(#bv-glow)";
        spinner.style.filter = "";
      } else {
        square.style.fill   = "#c04a1a";
        square.style.filter = "";
        spinner.style.filter = "url(#bv-shadow)";
      }
    }

    function animate(timestamp: number) {
      if (!prevTime) {
        prevTime = timestamp;
        rafId = requestAnimationFrame(animate);
        return;
      }

      const delta = Math.min((timestamp - prevTime) / 1000, 0.05);
      prevTime = timestamp;

      const pt     = calcPath.getPointAtLength(pathParam * totalLength);
      const inTop  = pt.y < MID_Y;
      const speed  = inTop ? SPEED_TOP : SPEED_BOTTOM;
      const rotSpd = inTop ? ROT_TOP   : ROT_BOTTOM;

      const effectiveSpeed = inTop ? speed : speed * jitter(pathParam);
      pathParam = Math.min(pathParam + delta * BASE_RATE * effectiveSpeed, 1.0);

      const newPt   = calcPath.getPointAtLength(pathParam * totalLength);
      const newInTop = newPt.y < MID_Y;

      rotation += delta * rotSpd;

      mover.setAttribute("transform", `translate(${newPt.x}, ${newPt.y})`);
      spinner.setAttribute("transform", `rotate(${rotation})`);
      trail.style.strokeDashoffset = String(totalLength * (1 - pathParam));

      updateSquareVisual(newInTop);

      if (pathParam < 1.0) {
        rafId = requestAnimationFrame(animate);
      }
    }

    function startAnimation() {
      if (rafId) cancelAnimationFrame(rafId);
      pathParam = 0;
      rotation  = 0;
      prevTime  = null;
      lastInTop = null;

      mover.setAttribute("transform", "translate(0, 360)");
      spinner.setAttribute("transform", "rotate(0)");
      square.style.fill   = "#ff6b35";
      square.style.filter = "";
      spinner.style.filter = "";
      trail.style.strokeDashoffset = String(totalLength);

      rafId = requestAnimationFrame(animate);
    }

    const section = document.getElementById(id);
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          startAnimation();
        }
      },
      { threshold: 0.4 }
    );

    if (section) observer.observe(section);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      document.body.removeChild(hiddenSvg);
    };
  }, [id]);

  return (
    <section
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-bg-type={backgroundType}
      data-bg-animation={backgroundAnimation}
      data-observe-active={observeAsActive ? "true" : undefined}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 上ゾーン */}
        <div
          style={{
            flex: 1,
            /*background: "linear-gradient(180deg, #edf8ff 0%, #f2f9fb 0%, #dceef8 0%, #d8eefa 0%)",*/
          }}
          aria-hidden="true"
        />
        {/* 下ゾーン */}
        <div
          style={{
            flex: 1,
            /*background: "linear-gradient(180deg, #ececec 0%, #61686c 0%, #0d0803 0%)",*/
          }}
          aria-hidden="true"
        />
      </div>

      {/* 境界線 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          width: "100%",
          height: "1px",
          top: "50%",
          transform: "translateY(-50%)",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 15%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.25) 85%, transparent 100%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ゾーンラベル */}
      <span
        style={{
          position: "absolute",
          top: 18,
          left: 28,
          fontSize: "clamp(11px, 1.2vw, 15px)",
          fontWeight: 600,
          letterSpacing: "0.08em",
          opacity: 0.55,
          /*color: "#1a3d5c",*/
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 18,
          left: 28,
          fontSize: "clamp(11px, 1.2vw, 15px)",
          fontWeight: 600,
          letterSpacing: "0.08em",
          opacity: 0.55,
          color: "#c8a06a",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
      </span>

      {/* SVGキャンバス */}
      <svg
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter id="bv-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bv-shadow" x="-20%" y="-40%" width="140%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* 軌跡パス */}
        <path
          ref={trailRef}
          d={PATH_D}
          fill="none"
          stroke="#d6d2a1"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.45"
        />

        {/* mover: 位置追従 / spinner: 自転 */}
        <g ref={moverRef}>
          <g ref={spinnerRef}>
            <rect
              ref={squareRef}
              x="-16"
              y="-16"
              width="32"
              height="32"
              rx="2"
              fill="#ff6b35"
            />
            <rect
              x="-16"
              y="-16"
              width="32"
              height="10"
              rx="2"
              fill="rgba(255,255,255,0.28)"
            />
          </g>
        </g>
      </svg>

      {caption && (
        <p className="slide__caption" style={{ position: "relative", zIndex: 1 }}>
          {caption}
        </p>
      )}
    </section>
  );
}
