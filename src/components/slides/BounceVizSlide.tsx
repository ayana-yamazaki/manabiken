import { useEffect, useRef } from "react";
import type { SlideContent } from "../../data/slides";
import SlideTextArea from "./SlideTextArea";

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
  content?: SlideContent;
};

const VB_W = 1280;
const VB_H = 720;
const MID_Y        = VB_H / 2;  // 360
const BASE_RATE    = 0.30;
const SPEED_BOUNCE = 0.54;   // 全体共通の一定速度
const ROT_BOUNCE   = 180;    // 一定回転速度 deg/sec

// 物理ベースのイージング: 重力に従い高いほど遅く・着地直前に加速
// 上ゾーン: √(1 - height_ratio) で放物線的速度変調
function physicsEase(y: number): number {
  if (y < MID_Y) {
    const t = (MID_Y - y) / MID_Y;          // 0(境界付近)〜1(最上部)
    return Math.max(0.12, Math.sqrt(1 - t * 0.90));
  }
  return 0.30; // 下ゾーンはゆっくり這いずり
}

// 上ゾーン→下ゾーン→上ゾーンの3部構成バウンスパスを生成
// 二次ベジェ（放物線）を三次変換: CP1=(x+w/3, peak*2/3), CP2=(x1-w/3, peak*2/3)
function generateBouncePath(peakScale: number = 1.0, extraDip: boolean = false): string {
  const peakH0   = Math.round(280 * peakScale);  // Y幅をスケール
  const bounceW0 = 190;   // X幅は共通
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
      // 着地点の低い方からrawH上をピークに（アーク形状を保ちつつ高さに変動）
      const rawH  = Math.round(h * (0.5 + Math.random() * 0.7));  // hの50〜120%でランダム
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

  // 下ゾーン: 急降下→底這い角張りバンプ→急上昇
  const addBottomZone = (width: number): void => {
    const groundY  = Math.min(VB_H - 20, midY + Math.round(240 * peakScale));
    const x0       = x;
    const dropX    = x0 + Math.round(30 + Math.random() * 50);  // 30〜80
    const riseX    = x0 + width - Math.round(30 + Math.random() * 50);  // 可変
    const xEnd     = x0 + width;
    cmds.push(`C ${x0 + 15},${midY + Math.round(120 * peakScale)} ${dropX - 10},${groundY} ${dropX},${groundY}`);

    // 這いずり: 着地点はbaseY付近でランダムにずれ、非対称CPで有機的うねり
    const numSegs = 4 + Math.floor(Math.random() * 4);  // 4〜7セグ
    let cx = dropX;
    let cy = groundY;

    for (let i = 0; i < numSegs; i++) {
      const isLast = i === numSegs - 1;
      const nextX  = isLast ? riseX : Math.round(dropX + (riseX - dropX) * (i + 1) / numSegs);
      const nextY  = isLast ? cy    : groundY + Math.round((Math.random() - 0.5) * 30);

      // CP1・CP2を非対称なX/Y位置に: S字・不規則アーチを生む
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
    addBounces(2);       // 上ゾーン 1: 2回バウンス
    addBottomZone(220);  // 下ゾーン 1
    addBounces(2);       // 上ゾーン 2: 2回バウンス
    addBottomZone(220);  // 下ゾーン 2
  } else {
    addBounces(3);       // 上ゾーン 1: 3回バウンス
    addBottomZone(320);  // 下ゾーン
    addBounces(3);       // 上ゾーン 2: 3回バウンス
  }

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
  content,
}: BounceVizSlideProps) {
  const trailRef1   = useRef<SVGPathElement>(null);
  const moverRef1   = useRef<SVGGElement>(null);
  const spinnerRef1 = useRef<SVGGElement>(null);
  const squareRef1  = useRef<SVGRectElement>(null);
  const trailRef2   = useRef<SVGPathElement>(null);
  const moverRef2   = useRef<SVGGElement>(null);
  const spinnerRef2 = useRef<SVGGElement>(null);
  const squareRef2  = useRef<SVGRectElement>(null);
  const trailRef3   = useRef<SVGPathElement>(null);
  const moverRef3   = useRef<SVGGElement>(null);
  const spinnerRef3 = useRef<SVGGElement>(null);
  const squareRef3  = useRef<SVGRectElement>(null);

  useEffect(() => {
    const tracks = [
      { trail: trailRef1.current, mover: moverRef1.current, spinner: spinnerRef1.current, square: squareRef1.current },
      { trail: trailRef2.current, mover: moverRef2.current, spinner: spinnerRef2.current, square: squareRef2.current },
      { trail: trailRef3.current, mover: moverRef3.current, spinner: spinnerRef3.current, square: squareRef3.current },
    ];
    if (tracks.some(t => !t.trail || !t.mover || !t.spinner || !t.square)) return;

    const hiddenSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    hiddenSvg.setAttribute("style", "position:absolute;visibility:hidden;width:0;height:0;overflow:hidden;");
    document.body.appendChild(hiddenSvg);

    // トラックごとのY幅スケールと起動ディレイ
    const TRACK_CONFIGS = [
      { peakScale: 1.0,  delay: 0,    extraDip: false },   // オレンジ
      { peakScale: 0.3, delay: 500,  extraDip: false },   // 青緑: Y小さく
      { peakScale: 1.5,  delay: 1000, extraDip: true  },   // イエロー: Y大きく、上下上下
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
            if (!prevTime) {
              prevTime = timestamp;
              rafIds[idx] = requestAnimationFrame(animate);
              return;
            }
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

            if (pathParam < 1.0) {
              rafIds[idx] = requestAnimationFrame(animate);
            }
          }
          rafIds[idx] = requestAnimationFrame(animate);
        }, delay);
      });
    }

    const section = document.getElementById(id);
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          startAll();
        }
      },
      { threshold: 0.4 }
    );

    if (section) observer.observe(section);

    return () => {
      rafIds.forEach(rid => { if (rid) cancelAnimationFrame(rid); });
      timeoutIds.forEach(tid => { if (tid) clearTimeout(tid); });
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
        preserveAspectRatio="none"
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

        {/* 軌跡パス 1: オレンジ */}
        <path ref={trailRef1} d="" fill="none" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
        {/* 軌跡パス 2: 青緑 */}
        <path ref={trailRef2} d="" fill="none" stroke="#5a9e94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
        {/* 軌跡パス 3: イエロー */}
        <path ref={trailRef3} d="" fill="none" stroke="#c9b84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />

        {/* mover 1: オレンジ */}
        <g ref={moverRef1}>
          <g ref={spinnerRef1}>
            <rect ref={squareRef1} x="-16" y="-16" width="32" height="32" rx="2" fill="#ff6b35" />
            <rect x="-16" y="-16" width="32" height="10" rx="2" fill="rgba(255,255,255,0.28)" />
          </g>
        </g>
        {/* mover 2: 青緑 */}
        <g ref={moverRef2}>
          <g ref={spinnerRef2}>
            <rect ref={squareRef2} x="-16" y="-16" width="32" height="32" rx="2" fill="#5a9e94" />
            <rect x="-16" y="-16" width="32" height="10" rx="2" fill="rgba(255,255,255,0.28)" />
          </g>
        </g>
        {/* mover 3: イエロー */}
        <g ref={moverRef3}>
          <g ref={spinnerRef3}>
            <rect ref={squareRef3} x="-16" y="-16" width="32" height="32" rx="2" fill="#c9b84c" />
            <rect x="-16" y="-16" width="32" height="10" rx="2" fill="rgba(255,255,255,0.28)" />
          </g>
        </g>
      </svg>

      {content && (content.heading || content.body) && (
        <div className="slide__inner" style={{ position: "relative", zIndex: 1 }}>
          <SlideTextArea content={content} caption={caption} />
        </div>
      )}
      {!content && caption && (
        <p className="slide__caption" style={{ position: "relative", zIndex: 1 }}>
          {caption}
        </p>
      )}
    </section>
  );
}
