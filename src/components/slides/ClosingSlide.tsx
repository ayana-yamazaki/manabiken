type ClosingSlideProps = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  observeAsActive?: boolean;
};

export default function ClosingSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  observeAsActive,
}: ClosingSlideProps) {
  return (
    <section
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-observe-active={observeAsActive ? "true" : undefined}
    >
      <div className="slide__inner slide__inner--closing">
        <div className="closing__main">
          <h2 className="slide__heading">
            先生方の教室から<br />飛び立つ子どもたちと、<br />
            いつか一緒に<br />仕事がしたい。
          </h2>
          <p className="slide__author-end">
            山崎 文菜
            <br />
            <span>プロダクトデザイナー ── CADDi</span>
          </p>
        </div>
        <div className="closing__qr">
          <div className="closing__qr-box" />
          <p className="closing__qr-label">スライドはこちら</p>
        </div>
      </div>
    </section>
  );
}
