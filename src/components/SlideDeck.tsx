import ClosingSlide from "./slides/ClosingSlide";
import NodeAnimationSlide from "./slides/NodeAnimationSlide";
import IntroSlide from "./slides/IntroSlide";
import MessageSlide from "./slides/MessageSlide";
import MountainVizSlide from "./slides/MountainVizSlide";
import { slides, type SlideData } from "../data/slides";
import { useSlideObserver } from "../hooks/useSlideObserver";
import "../styles/base.css";
import "../styles/layouts.css";
import "../styles/animations.css";
import "./SlideDeck.css";

function HtmlSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  observeAsActive,
  caption,
  markup,
}: {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  observeAsActive?: boolean;
  caption?: string;
  markup: string;
}) {
  const escapeHtml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const appendCaptionToMarkup = (rawMarkup: string, rawCaption?: string) => {
    if (!rawCaption) {
      return rawMarkup;
    }

    const captionMarkup = `<p class="slide__caption">${escapeHtml(rawCaption).replaceAll("\n", "<br />")}</p>`;
    const textBlockPattern = /(<div class="slide__text[^\"]*">[\s\S]*?)(<\/div>)/;
    const injectedMarkup = rawMarkup.replace(textBlockPattern, `$1${captionMarkup}$2`);

    if (injectedMarkup !== rawMarkup) {
      return injectedMarkup;
    }

    return `${rawMarkup}<div class="slide__inner"><div class="slide__text">${captionMarkup}</div></div>`;
  };

  return (
    <section
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-observe-active={observeAsActive ? "true" : undefined}
      dangerouslySetInnerHTML={{ __html: appendCaptionToMarkup(markup, caption) }}
    />
  );
}

const renderSlide = (slide: SlideData, index: number) => {
  const commonProps = {
    id: slide.id,
    slideNumber: index + 1,
    className: slide.className,
    bgStart: slide.bgStart,
    bgEnd: slide.bgEnd,
    observeAsActive: slide.observeAsActive,
    caption: slide.caption,
  };

  if (slide.variant === "mountain-viz") {
    return <MountainVizSlide key={slide.id} {...commonProps} />;
  }

  if (slide.variant === "intro") {
    return <IntroSlide key={slide.id} {...commonProps} />;
  }

  if (slide.variant === "message") {
    return <MessageSlide key={slide.id} {...commonProps} />;
  }

  if (slide.variant === "closing") {
    return <ClosingSlide key={slide.id} {...commonProps} />;
  }

  if (slide.variant === "node-animation") {
    return <NodeAnimationSlide key={slide.id} {...commonProps} />;
  }

  return <HtmlSlide key={slide.id} {...commonProps} markup={slide.markup} />;
};

export default function SlideDeck() {
  useSlideObserver();

  return (
    <>
      <div className="slide-deck" id="slideDeck">
        {slides.map(renderSlide)}
      </div>
      <div className="progress-bar" id="progressBar"></div>
    </>
  );
}
