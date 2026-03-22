import ClosingSlide from "./slides/ClosingSlide";
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
  markup,
}: {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  observeAsActive?: boolean;
  markup: string;
}) {
  return (
    <section
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-observe-active={observeAsActive ? "true" : undefined}
      dangerouslySetInnerHTML={{ __html: markup }}
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

  return <HtmlSlide key={slide.id} {...commonProps} markup={slide.markup} />;
};

export default function SlideDeck() {
  useSlideObserver();

  return (
    <>
      {slides.map(renderSlide)}
      <div className="progress-bar" id="progressBar"></div>
    </>
  );
}
