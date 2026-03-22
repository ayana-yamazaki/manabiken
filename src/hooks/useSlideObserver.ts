import { useEffect } from "react";
import { interpolateColor } from "../utils/colorUtils";

export const useSlideObserver = () => {
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

      if (slide.dataset.observeActive === "true") {
        imageObserver.observe(slide);
      }
    });

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

        if (!textEl || !textEl.classList.contains("is-visible") || !isScrollingDown) {
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

    return () => {
      textObserver.disconnect();
      imageObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
};
