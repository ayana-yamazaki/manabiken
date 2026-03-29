import type { SlideContent } from "../../data/slides";
import SlideTextArea from "./SlideTextArea";
import NodeNetworkCanvas from "./NodeNetworkCanvas";

const joinClassNames = (...names: Array<string | undefined>) => names.filter(Boolean).join(" ");

export type NodeAnimationSlideProps = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  backgroundType?: string;
  backgroundAnimation?: string;
  content?: SlideContent;
  observeAsActive?: boolean;
  caption?: string;
};

export default function NodeAnimationSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  backgroundType,
  backgroundAnimation,
  content,
  observeAsActive,
  caption,
}: NodeAnimationSlideProps) {
  const sectionClassName = joinClassNames(className, "slide--basic", "slide--node-animation", ...(content?.modifiers ?? []));

  return (
    <section
      id={id}
      className={sectionClassName}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-bg-type={backgroundType}
      data-bg-animation={backgroundAnimation}
      data-observe-active={observeAsActive ? "true" : undefined}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <NodeNetworkCanvas className="node-network-canvas node-network-canvas--full" bgStart={bgStart} bgEnd={bgEnd} opacity={0.9} />
      {content ? (
        <div className="slide__inner slide__inner--basic">
          <SlideTextArea content={content} caption={caption} textClassName="basic__text" />
        </div>
      ) : null}
    </section>
  );
}
