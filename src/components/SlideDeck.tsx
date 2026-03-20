import { useEffect } from "react";
import { slides } from "../data/slides";
import "./slide-deck.css";

function Slide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  markup,
}: {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  markup: string;
}) {
  return (
    <section
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}

export default function SlideDeck() {
  useEffect(() => {
    const slideNodes = document.querySelectorAll<HTMLElement>(".slide");
    const progressBar = document.getElementById("progressBar") as HTMLElement | null;
    let lastScrollY = window.scrollY;

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const textEl = entry.target.querySelector(".slide__text") as HTMLElement | null;
          if (!textEl) return;
          if (entry.isIntersecting) {
            textEl.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
          }
        });
      },
      { threshold: 0.15 }
    );

    slideNodes.forEach((slide) => {
      textObserver.observe(slide);
      if (
        slide.classList.contains("slide--has-image") ||
        slide.classList.contains("slide--intro") ||
        slide.classList.contains("slide--mountain-viz") ||
        slide.classList.contains("slide--message") ||
        slide.classList.contains("slide--river-source")
      ) {
        imageObserver.observe(slide);
      }
    });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const hexToRgb = (hex: string): [number, number, number] => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : [0, 0, 0];
    };

    const interpolateColor = (color1: string, color2: string, t: number) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      const r = Math.round(lerp(rgb1[0], rgb2[0], t));
      const g = Math.round(lerp(rgb1[1], rgb2[1], t));
      const b = Math.round(lerp(rgb1[2], rgb2[2], t));
      return `rgb(${r}, ${g}, ${b})`;
    };

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const isScrollingDown = scrollTop >= lastScrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      if (progressBar) {
        progressBar.style.width = `${progress * 100}%`;
      }

      slideNodes.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const slideTop = rect.top;
        const slideHeight = rect.height;
        const viewportHeight = window.innerHeight;

        if (slideTop < viewportHeight && slideTop + slideHeight > 0) {
          const t = Math.max(0, Math.min(1, -slideTop / slideHeight));
          const bgStart = slide.dataset.bgStart || "#1a1a2e";
          const bgEnd = slide.dataset.bgEnd || "#1a1a2e";
          slide.style.backgroundColor = interpolateColor(bgStart, bgEnd, t);
        }
      });

      slideNodes.forEach((slide) => {
        const rect = slide.getBoundingClientRect();
        const textEl = slide.querySelector(".slide__text") as HTMLElement | null;
        if (!textEl || !textEl.classList.contains("is-visible")) return;

        if (!isScrollingDown) {
          return;
        }

        const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const parallaxY = centerOffset * 0.08;
        textEl.style.transform = `translateY(${parallaxY}px)`;
      });

      lastScrollY = scrollTop;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const waterLevel = document.getElementById("waterLevel");
    const waveFront = document.getElementById("waveFront");
    const waveBack = document.getElementById("waveBack");
    const waveShimmer = document.getElementById("waveShimmer");
    const mountainSlide = document.querySelector<HTMLElement>(".slide--mountain-viz");

    let timer: number | undefined;
    if (waterLevel && mountainSlide) {
      const yStart = 600;
      const yEnd = 270;
      const dur = 2;
      let t0 = 0;
      let active = false;

      timer = window.setInterval(() => {
        const now = Date.now() / 1000;
        const fx = -100 + 100 * Math.cos((2 * Math.PI * now) / 14);
        const bx = -100 + 100 * Math.cos((2 * Math.PI * now) / 18);
        if (waveFront) waveFront.setAttribute("transform", `translate(${fx},0)`);
        if (waveBack) waveBack.setAttribute("transform", `translate(${bx},0)`);
        if (waveShimmer) waveShimmer.setAttribute("transform", `translate(${fx},0)`);

        if (mountainSlide.classList.contains("is-active")) {
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
        }
      }, 50);
    }

    return () => {
      textObserver.disconnect();
      imageObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, []);

  return (
    <>
      {slides.map((slide, index) => (
        <Slide
          key={slide.id}
          id={slide.id}
          slideNumber={index + 1}
          className={slide.className}
          bgStart={slide.bgStart}
          bgEnd={slide.bgEnd}
          markup={slide.markup}
        />
      ))}
      <div className="progress-bar" id="progressBar"></div>
    </>
  );
}
