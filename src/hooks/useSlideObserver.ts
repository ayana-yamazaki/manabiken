import { useEffect } from "react";
import { interpolateColor } from "../utils/colorUtils";

export const useSlideObserver = () => {
  useEffect(() => {
    const scrollContainer = document.getElementById("slideDeck") as HTMLElement | null;
    const progressBar = document.getElementById("progressBar") as HTMLElement | null;

    if (!scrollContainer) {
      return;
    }

    const slideNodes = scrollContainer.querySelectorAll<HTMLElement>(".slide");

    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
    scrollContainer.scrollTop = 0;

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
      const scrollTop = scrollContainer.scrollTop;
      const docHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
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

        if (!textEl || !textEl.classList.contains("is-visible")) {
          return;
        }

        const viewportCenter = scrollContainer.clientHeight / 2;
        const slideCenter = rect.top + rect.height / 2;
        const distanceFromCenter = slideCenter - viewportCenter;
        const activeBand = scrollContainer.clientHeight * 0.55;

        if (Math.abs(distanceFromCenter) > activeBand) {
          textEl.style.transform = "translateY(0px)";
          return;
        }

        const parallaxY = Math.max(-36, Math.min(36, distanceFromCenter * 0.08));
        textEl.style.transform = `translateY(${parallaxY}px)`;
      });
    };

    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      textObserver.disconnect();
      imageObserver.disconnect();
      scrollContainer.removeEventListener("scroll", onScroll);
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);
};
