import { useEffect } from "react";

type MountainVizSlideProps = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
};

export default function MountainVizSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
}: MountainVizSlideProps) {
  useEffect(() => {
    const waterLevel = document.getElementById("waterLevel");
    const waveFront = document.getElementById("waveFront");
    const waveBack = document.getElementById("waveBack");
    const waveShimmer = document.getElementById("waveShimmer");
    const mountainSlide = document.getElementById(id);

    if (!waterLevel || !mountainSlide) {
      return;
    }

    const yStart = 600;
    const yEnd = 270;
    const dur = 2;
    let t0 = 0;
    let active = false;

    const timer = window.setInterval(() => {
      const now = Date.now() / 1000;
      const fx = -100 + 100 * Math.cos((2 * Math.PI * now) / 14);
      const bx = -100 + 100 * Math.cos((2 * Math.PI * now) / 18);

      if (waveFront) waveFront.setAttribute("transform", `translate(${fx},0)`);
      if (waveBack) waveBack.setAttribute("transform", `translate(${bx},0)`);
      if (waveShimmer) waveShimmer.setAttribute("transform", `translate(${fx},0)`);

      if (!mountainSlide.classList.contains("is-active")) {
        return;
      }

      if (!active) {
        active = true;
        t0 = now;
      }

      const e = now - t0;
      const t = Math.min(e / dur, 1);
      const p = 1 - Math.pow(1 - t, 3);
      waterLevel.setAttribute("y", String(yStart - (yStart - yEnd) * p));

      if (waveShimmer && e > 3.5) {
        const sp = Math.min((e - 3.5) / 0.8, 1);
        waveShimmer.setAttribute("opacity", String(sp));
      }
    }, 50);

    return () => {
      window.clearInterval(timer);
    };
  }, [id]);

  return (
    <section
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
    >
      <div className="mountain-viz">
        <svg className="mountain-viz__svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a8b0d0" />
              <stop offset="25%" stopColor="#b8b8d8" />
              <stop offset="45%" stopColor="#d0c8e0" />
              <stop offset="60%" stopColor="#c8d0e8" />
              <stop offset="80%" stopColor="#90c0d8" />
              <stop offset="100%" stopColor="#70b0c8" />
            </linearGradient>
            <linearGradient id="mtnFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8868b0" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#7058a8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#405078" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="wtrFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#50c8e0" stopOpacity="0.85" />
              <stop offset="30%" stopColor="#38b0d8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2078a8" stopOpacity="0.92" />
            </linearGradient>
            <linearGradient id="wtrFill2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78e0f0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#48a8d0" stopOpacity="0.4" />
            </linearGradient>
            <clipPath id="waterClip">
              <rect id="waterLevel" x="-500" y="600" width="2200" height="1000" />
            </clipPath>
          </defs>
          <rect x="0" y="0" width="1200" height="600" fill="url(#skyGrad)" />
          <path
            className="mtn-fill"
            d="M0,440 C80,430 150,380 220,320 C290,260 340,180 400,140 C460,100 500,200 560,300 C620,380 660,420 720,430 C780,440 820,380 880,280 C940,180 980,100 1040,80 C1100,60 1140,150 1200,280 L1200,600 L0,600 Z"
            fill="url(#mtnFill)"
            visibility="hidden"
          />
          <path
            className="mtn-line"
            d="M0,440 C80,430 150,380 220,320 C290,260 340,180 400,140 C460,100 500,200 560,300 C620,380 660,420 720,430 C780,440 820,380 880,280 C940,180 980,100 1040,80 C1100,60 1140,150 1200,280"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            visibility="hidden"
          />
          <g clipPath="url(#waterClip)">
            <path
              id="waveBack"
              d="M-400,305 C-333,290 -266,320 -200,305 C-133,290 -66,320 0,305 C66,290 133,320 200,305 C266,290 333,320 400,305 C466,290 533,320 600,305 C666,290 733,320 800,305 C866,290 933,320 1000,305 C1066,290 1133,320 1200,305 C1266,290 1333,320 1400,305 C1466,290 1533,320 1600,305 L1600,900 L-400,900 Z"
              fill="url(#wtrFill2)"
            />
            <path
              id="waveFront"
              d="M-400,300 C-333,286 -266,314 -200,300 C-133,286 -66,314 0,300 C66,286 133,314 200,300 C266,286 333,314 400,300 C466,286 533,314 600,300 C666,286 733,314 800,300 C866,286 933,314 1000,300 C1066,286 1133,314 1200,300 C1266,286 1333,314 1400,300 C1466,286 1533,314 1600,300 L1600,900 L-400,900 Z"
              fill="url(#wtrFill)"
            />
            <path
              id="waveShimmer"
              d="M-400,300 C-333,286 -266,314 -200,300 C-133,286 -66,314 0,300 C66,286 133,314 200,300 C266,286 333,314 400,300 C466,286 533,314 600,300 C666,286 733,314 800,300 C866,286 933,314 1000,300 C1066,286 1133,314 1200,300 C1266,286 1333,314 1400,300 C1466,286 1533,314 1600,300"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="2.5"
              opacity="0"
            />
          </g>
        </svg>
      </div>

      <div className="slide__inner">
        <div className="slide__text">
          <p className="slide__label">山と谷</p>
          <h2 className="slide__heading">
            谷が埋まった後に<br />残るのは、<br />その人だけの山だ。
          </h2>
          <p className="slide__body">
            AIの時代、苦手な領域はAIが補ってくれる。<br />
            谷が埋まる。<br />
            その後に残る「山」──その子だけの力に<br />
            最初に気づけるのは、先生方かもしれない。
          </p>
        </div>
      </div>
    </section>
  );
}
