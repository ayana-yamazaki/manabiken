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

const VB_W = 1280;
const VB_H = 720;
const MID_Y        = VB_H / 2;  // 360
const BASE_RATE    = 0.30;
const SPEED_BOUNCE = 0.90;   // 全体共通の一定速度
const ROT_BOUNCE   = 300;    // 一定回転速度 deg/sec

// 物理ベースのイージング: 重力に従い高いほど遅く・着地直前に加速
// 上ゾーン: √(1 - height_ratio) で放物線的速度変調
function physicsEase(y: number): number {
  if (y < MID_Y) {
    const t = (MID_Y - y) / MID_Y;          // 0(境界付近)〜1(最上部)
    return Math.max(0.12, Math.sqrt(1 - t * 0.90));
  }
  return 0.45; // 下ゾーンはゆっくり這いずり
}

// 上ゾーン→下ゾーン→上ゾーンの3部構成バウンスパスを生成
// 二次ベジェ（放物線）を三次変換: CP1=(x+w/3, peak*2/3), CP2=(x1-w/3, peak*2/3)
function generateBouncePath(): string {
  const peakH0   = 280;   // 初期ピーク高さ（midYからの距離）
  const bounceW0 = 190;   // 初期バウンス幅
  const decay    = 0.78;  // 減衰率
  const midY     = MID_Y;
  const cmds: string[] = [];
  let x = 0;
  let y = midY;
  cmds.push(`M ${x},${y}`);

  // 上ゾーン: 放物線バウンスをn回追加
  // 中間の着地点Y はランダム（上ゾーン内）、最後だけmidYに戻す
  const addBounces = (n: number): void => {
    for (let i = 0; i < n; i++) {
      const w     = Math.round(bounceW0 * Math.pow(decay, i));
      const h     = Math.round(peakH0  * Math.pow(decay, i));
      const x1    = x + w;
      const y1    = (i < n - 1)
        ? midY - Math.round(Math.random() * 190 + 30)  // 上ゾーン内ランダム着地
        : midY;                                         // 最後はmidYに戻る
      const peakY = Math.min(y, y1) - h;              // 低い方からh上
      const cp1x  = Math.round(x  + (x1 - x) / 3);
      const cp1y  = Math.round(y  + (peakY - y)  * 2 / 3);
      const cp2x  = Math.round(x1 - (x1 - x) / 3);
      const cp2y  = Math.round(y1 + (peakY - y1) * 2 / 3);
      cmds.push(`C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x1},${y1}`);
      x = x1;
      y = y1;
    }
  };

  // 下ゾーン: 急降下→底這い角張りバンプ→急上昇
  const addBottomZone = (width: number): void => {
    const groundY = midY + 240;           // 底 y≈600
    const x0      = x;
    const dropX   = x0 + 50;
    const riseX   = x0 + width - 50;
    const xEnd    = x0 + width;
    cmds.push(`C ${x0 + 15},${midY + 120} ${dropX - 10},${groundY} ${dropX},${groundY}`);

    let cx = dropX;
    const bumpCount = 3;
    const unitW = Math.round((riseX - 10 - cx) / (bumpCount * 2 + 1));
    cmds.push(`C ${cx + unitW},${groundY} ${cx + unitW * 2 - 2},${groundY} ${cx + unitW * 2},${groundY}`);
    cx += unitW * 2;
    for (let i = 0; i < bumpCount; i++) {
      const bH = 20 + Math.round(Math.random() * 18);
      cmds.push(`C ${cx + 2},${groundY - bH} ${cx + unitW - 2},${groundY - bH} ${cx + unitW},${groundY - bH}`);
      cmds.push(`C ${cx + unitW + 2},${groundY - bH} ${cx + unitW * 2 - 2},${groundY} ${cx + unitW * 2},${groundY}`);
      cx += unitW * 2;
    }
    cmds.push(`C ${riseX},${groundY + 8} ${xEnd - 15},${midY + 80} ${xEnd},${midY}`);
    x = xEnd;
    y = midY;
  };

  addBounces(3);       // 上ゾーン 1: 3回バウンス → x≈454
  addBottomZone(320);  // 下ゾーン    → x≈774
  addBounces(3);       // 上ゾーン 2: 3回バウンス → x≈1228

  cmds.push(`C ${x + 30},${midY} 1270,${midY} 1280,${midY}`);
  return cmds.join(' ');
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
    const generatedPath = generateBouncePath();
    calcPath.setAttribute("d", generatedPath);
    trail.setAttribute("d", generatedPath);
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
        // square.style.fill    = "#ff8040";
        // square.style.filter  = "url(#bv-glow)";
        // spinner.style.filter = "url(#bv-glow)";
      } else {
        // square.style.fill    = "#6b2208";
        // square.style.filter  = "";
        // spinner.style.filter = "url(#bv-shadow)";
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

      const curPt = calcPath.getPointAtLength(pathParam * totalLength);
      const ease   = physicsEase(curPt.y);
      pathParam = Math.min(pathParam + delta * BASE_RATE * SPEED_BOUNCE * ease, 1.0);

      const newPt    = calcPath.getPointAtLength(pathParam * totalLength);
      const newInTop = newPt.y < MID_Y;

      rotation += delta * ROT_BOUNCE * ease;  // 速度に連動して回転も緩急

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
            /*background: "linear-gradient(180deg, #5ba3d0 0%, #87ceeb 30%, #b8dff5 70%, #d8eefa 100%)",*/
          }}
          aria-hidden="true"
        />
        {/* 下ゾーン */}
        <div
          style={{
            flex: 1,
            /*background: "linear-gradient(180deg, #2d1f0d 0%, #1c1208 50%, #0d0803 100%)",*/
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
          color: "#1a3d5c",
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
          <filter id="bv-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bv-shadow" x="-20%" y="-20%" width="140%" height="200%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* 軌跡パス */}
        <path
          ref={trailRef}
          d=""
          fill="none"
          stroke="#ff6b35"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
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
