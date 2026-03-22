type IntroSlideProps = {
  id: string;
  slideNumber: number;
  className: string;
  bgStart: string;
  bgEnd: string;
  observeAsActive?: boolean;
};

export default function IntroSlide({
  id,
  slideNumber,
  className,
  bgStart,
  bgEnd,
  observeAsActive,
}: IntroSlideProps) {
  return (
    <section
      id={id}
      className={className}
      data-slide-number={slideNumber}
      data-bg-start={bgStart}
      data-bg-end={bgEnd}
      data-observe-active={observeAsActive ? "true" : undefined}
    >
      <div className="slide__inner slide__inner--intro">
        <div className="intro__photo">
          <img src="/images/profile.jpg" alt="山崎文菜" className="intro__photo-img" />
        </div>
        <div className="intro__text">
          <h2 className="slide__heading">山崎 文菜</h2>
          <p className="intro__name-en">Ayana Yamazaki</p>
          <p className="slide__sub">プロダクトデザイナー</p>
          <p className="slide__body">
            金沢美術工芸大学 プロダクトデザイン学部卒。<br />
            日立製作所で鉄道システムのUXデザインに携わり、<br />
            その後スタートアップで農業・医療・SaaSなど<br />
            現場で使われるサービスを設計してきた。<br />
            <br />
            美術の先生ではありません。<br />
            美術の授業を受けた側の人間です。
          </p>
        </div>
      </div>
    </section>
  );
}
