import type { SlideContent } from "../../data/slides";
import SlideTextArea from "./SlideTextArea";
import NodeNetworkCanvas from "./NodeNetworkCanvas";

export type NodeAnimationSlideProps = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  content?: SlideContent;
  observeAsActive?: boolean;
  caption?: string;
};

export default function NodeAnimationSlide({ id, slideNumber, className, bgStart, bgEnd, content, observeAsActive, caption }: NodeAnimationSlideProps) {
  return (
    <section
      id={id}
      className={`${className} slide--basic slide--basic`}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-observe-active={observeAsActive ? "true" : undefined}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <NodeNetworkCanvas className="node-network-canvas node-network-canvas--full" bgStart={bgStart} bgEnd={bgEnd} />
      {content ? (
        <div className="slide__inner slide__inner--basic">
          <SlideTextArea content={content} caption={caption} textClassName="basic__text" />
        </div>
      ) : null}
    </section>
  );
}
