type MessageSlideProps = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  observeAsActive?: boolean;
};

export default function MessageSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  observeAsActive,
}: MessageSlideProps) {
  return (
    <section
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-observe-active={observeAsActive ? "true" : undefined}
    >
      <div className="slide__inner slide__inner--message">
        <p className="slide__label">本日のメッセージ</p>
        <h2 className="slide__heading">
          AI時代に最も必要とされる力は、<br />美術の授業が育てうる力だ。
        </h2>
        <p className="message__lead">今日は3つの観点からお話しします。</p>
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
      </div>
    </section>
  );
}
