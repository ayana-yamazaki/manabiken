import { useEffect } from "react";
import MountainVizSvg from "./MountainVizSvg";

type MountainVizSlideProps = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  observeAsActive?: boolean;
};

export default function MountainVizSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  observeAsActive,
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
      data-observe-active={observeAsActive ? "true" : undefined}
    >
      <MountainVizSvg />

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
