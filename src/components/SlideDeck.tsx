import NodeAnimationSlide from "./slides/NodeAnimationSlide";
import MountainVizSlide from "./slides/MountainVizSlide";
import NodeNetworkCanvas from "./slides/NodeNetworkCanvas";
import SlideTextArea from "./slides/SlideTextArea";
import { slides, type SlideData } from "../data/slides";
import { useSlideObserver } from "../hooks/useSlideObserver";
import "../styles/base.css";
import "../styles/layouts.css";
import "../styles/animations.css";
import "./SlideDeck.css";

const withBreaks = (value?: string) => {
  if (!value) {
    return null;
  }

  const lines = value.split("\n");

  return lines.map((line, index) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
};

const joinClassNames = (...names: Array<string | undefined>) => names.filter(Boolean).join(" ");

function ContentSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  observeAsActive,
  content,
  caption,
}: {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  observeAsActive?: boolean;
  content?: SlideData["content"];
  caption?: string;
}) {
  if (!content) {
    return null;
  }

  const hasNodeAccent = Boolean(content.nodeAccent?.enabled);
  const contentClassName = joinClassNames(
    className,
    `slide--${content.layout}`,
    hasNodeAccent ? "slide--node-accent" : undefined,
    ...(content.modifiers ?? []),
  );

  const renderStandardText = () => (
    <div className="slide__inner">
      <SlideTextArea content={content} caption={caption} />
    </div>
  );

  const renderSlideBody = () => {
    if (content.layout === "title") {
      return (
        <>
          {renderStandardText()}
          <div className="scroll-hint">
            <span className="scroll-hint__arrow"></span>
          </div>
        </>
      );
    }

    if (content.layout === "text") {
      return renderStandardText();
    }

    if (content.layout === "image-text") {
      return (
        <>
          {content.imageSrc ? (
            <div className="slide__image">
              <img src={content.imageSrc} alt={content.imageAlt ?? ""} />
            </div>
          ) : null}
          {renderStandardText()}
        </>
      );
    }

    if (content.layout === "basic" || content.layout === "basic") {
      return (
        <div className="slide__inner slide__inner--basic">
          {content.imageSrc ? (
            <div className="basic__image-wrap">
              <img className="basic__image" src={content.imageSrc} alt={content.imageAlt ?? ""} />
            </div>
          ) : null}
          {hasNodeAccent ? (
            <div className="slide__node-accent">
              <NodeNetworkCanvas
                className="node-network-canvas node-network-canvas--accent"
                drawBackground={false}
                nodeCount={6}
                squareSize={24}
                circleRadius={6}
                gap={60}
                connectionDistance={100}
                maxConnections={6}
                opacity={1}
              />
            </div>
          ) : null}
          <SlideTextArea content={content} caption={caption} textClassName="basic__text" />
        </div>
      );
    }

    if (content.layout === "intro") {
      return (
        <div className="slide__inner slide__inner--intro">
          <div className="intro__photo">
            <img src={content.imageSrc ?? "/images/profile.jpg"} alt={content.imageAlt ?? "山崎文菜"} className="intro__photo-img" />
          </div>
          <SlideTextArea content={content} caption={caption} textClassName="intro__text" />
        </div>
      );
    }

    if (content.layout === "message") {
      return (
        <div className="slide__inner slide__inner--message">
          <SlideTextArea content={content} caption={caption}>
            <div className="message-pillars">
              <div className="message-pillar">
                <span className="message-pillar__num">1</span>
                <div className="message-pillar__circle" />
                <p className="message-pillar__heading">感じる力</p>
              </div>
              <div className="message-pillar">
                <span className="message-pillar__num">2</span>
                <div className="message-pillar__circle" />
                <p className="message-pillar__heading">プロトタイプ型</p>
              </div>
              <div className="message-pillar">
                <span className="message-pillar__num">3</span>
                <div className="message-pillar__circle" />
                <p className="message-pillar__heading">観察の場</p>
              </div>
            </div>
          </SlideTextArea>
        </div>
      );
    }

    if (content.layout === "closing") {
      return (
        <div className="slide__inner slide__inner--closing">
          <SlideTextArea content={content} caption={caption} textClassName="closing__main" />
          <div className="closing__qr">
            <div className="closing__qr-box" />
            <p className="closing__qr-label">スライドはこちら</p>
          </div>
        </div>
      );
    }

    if (content.layout === "mountain-viz") {
      return null;
    }

    if (content.layout === "node-animation") {
      return null;
    }

    if (content.layout === "split-river") {
      return (
        <>
          <div className="river-origin" aria-hidden="true"></div>
          <div className="slide__inner slide__inner--split">
            <div className="split__left">
              <SlideTextArea 
                content={{
                  ...content,
                  heading: content.leftHeading,
                  label: content.leftLabel
                }} 
                containerClassName="split__left-content"
                textClassName="split__left-text"
              />
            </div>
            <div className="split__right">
              <SlideTextArea 
                content={{
                  ...content,
                  body: content.rightBody
                }} 
                caption={caption}
                containerClassName="split__right-content"
                textClassName="split__right-text"
              />
            </div>
          </div>
          <div className="slide__river-start">
            <svg viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="riverReveal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#65636a" />
                  <stop offset="30%" stopColor="#3a7a84" />
                  <stop offset="60%" stopColor="#1e8a9a" />
                  <stop offset="100%" stopColor="#1e8a9a" />
                </linearGradient>
              </defs>
              <rect width="1440" height="600" fill="url(#riverReveal)" />
              <g className="river-shimmer">
                <ellipse className="river-shimmer__bar river-shimmer__bar--1" cx="720" cy="160" rx="500" ry="30" fill="rgba(255,255,255,0.03)" transform="rotate(-1.5 720 160)" />
                <ellipse className="river-shimmer__bar river-shimmer__bar--2" cx="720" cy="360" rx="600" ry="35" fill="rgba(255,255,255,0.025)" transform="rotate(1 720 360)" />
                <ellipse className="river-shimmer__bar river-shimmer__bar--3" cx="720" cy="510" rx="700" ry="40" fill="rgba(255,255,255,0.02)" transform="rotate(-0.8 720 510)" />
              </g>
              <path d="M0,0 L660,0 C656,40 648,80 640,120 C630,165 624,200 612,240 C596,290 575,330 545,375 C508,425 460,468 400,505 C330,545 245,572 155,590 C80,600 35,605 0,600 L0,0 Z" fill="#48454a" />
              <path d="M1440,0 L780,0 C784,40 792,80 800,120 C810,165 816,200 828,240 C844,290 865,330 895,375 C932,425 980,468 1040,505 C1110,545 1195,572 1285,590 C1360,600 1405,605 1440,600 L1440,0 Z" fill="#48454a" />
            </svg>
          </div>
        </>
      );
    }

    if (content.layout === "drift") {
      return (
        <>
          <div className="water-surface" aria-hidden="true">
            <div className="water-surface__orbit water-surface__orbit-x--2">
              <div className="water-surface__orbit water-surface__orbit-y--2">
                <div className="water-surface__layer water-surface__layer--2"></div>
              </div>
            </div>
            <div className="water-surface__orbit water-surface__orbit-x--1">
              <div className="water-surface__orbit water-surface__orbit-y--1">
                <div className="water-surface__layer water-surface__layer--1"></div>
              </div>
            </div>
          </div>
          {content.imageSrc ? (
            <div className="slide__image">
              <img src={content.imageSrc} alt={content.imageAlt ?? ""} />
            </div>
          ) : null}
          <SlideTextArea content={content} caption={caption} textClassName="slide__text--float" />
        </>
      );
    }

    return null;
  };

  return (
    <section
      id={id}
      className={contentClassName}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-observe-active={observeAsActive ? "true" : undefined}
    >
      {renderSlideBody()}
    </section>
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

  if (slide.content?.layout === "mountain-viz") {
    return <MountainVizSlide key={slide.id} {...commonProps} />;
  }

  if (slide.content?.layout === "node-animation") {
    return <NodeAnimationSlide key={slide.id} {...commonProps} content={slide.content} />;
  }

  return <ContentSlide key={slide.id} {...commonProps} content={slide.content} />;
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
