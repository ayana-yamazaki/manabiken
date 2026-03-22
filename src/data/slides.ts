export type SlideData = {
  id: string;
  className: string;
  bgStart: string;
  bgEnd: string;
  markup: string;
  caption?: string;
  observeAsActive?: boolean;
  variant?: "default" | "intro" | "message" | "mountain-viz" | "closing" | "node-animation";
};

export const slides: SlideData[] = [
  {
    id: "slide-01",
    className: "slide slide--title slide--light",
    bgStart: "#f5f0eb",
    bgEnd: "#f0ebe5",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <h1 class="slide__heading slide__heading--hero">
            問いを立てる力は、<br />どこで育つのか。
          </h1>
          <p class="slide__sub">デザインの現場から見た美術教育</p>
          <p class="slide__author">山崎 文菜 ── プロダクトデザイナー</p>
        </div>
      </div>
      <div class="scroll-hint">
        <span class="scroll-hint__arrow"></span>
      </div>`,
  },
  {
    id: "slide-02",
    className: "slide slide--intro slide--light",
    bgStart: "#f0ebe5",
    bgEnd: "#eae5df",
    markup: "",
    observeAsActive: true,
    variant: "intro",
  },
  {
    id: "slide-03",
    className: "slide slide--light slide--message",
    bgStart: "#eae5df",
    bgEnd: "#e5dfd8",
    markup: "",
    observeAsActive: true,
    variant: "message",
  },
  {
    id: "slide-03b",
    className: "slide slide--light slide--work-ui work-ui--text-right work-ui--panel-none work-ui--text-plain work-ui--text-dark work-ui--caption-plain",
    bgStart: "#e5dfd8",
    bgEnd: "#dfd8d0",
    markup: `<div class="slide__inner slide__inner--work-ui">
        <div class="work-ui__image-wrap">
          <img class="work-ui__image" src="/images/figma-vs-code.png" alt="2025年までに制作していたアプリ画面のデザイン" />
        </div>
        <div class="work-ui__text-column">
          <div class="slide__text work-ui__text">
            <h2 class="slide__heading">
              2025年まで、私はアプリの画面を描いていた
            </h2>
            <p class="slide__body">
              美しいブランドカラーや余白、直感的な画面構成、
              データベースとの整合性…
              10年以上かけて積み上げたスキル
            </p>
          </div>
        </div>
      </div>`,
    caption: "1画面を仕上げるのに何日もかかることも",
  },
  {
    id: "slide-04",
    className: "slide slide--has-image slide--light",
    bgStart: "#e5dfd8",
    bgEnd: "#dfd8d0",
    observeAsActive: true,
    markup: `<div class="slide__image">
        <img src="/images/reposaku.png" alt="レポサク — グッドデザイン金賞" />
      </div>
      <div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">私の仕事</p>
          <h2 class="slide__heading">
            レポサク
          </h2>
          <p class="slide__body">
            北海道の農家さんと共同開発した車両管理アプリ。<br />
            GPS端末をUSBに挿すだけで、<br />
            数十台の車両の位置と軌跡がスマホで見える。<br /><br />
            全国200社以上、農協24組合に導入。<br />
            2025年 グッドデザイン賞 金賞（TOP 20）受賞。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-05",
    className: "slide slide--has-image slide--light",
    bgStart: "#dfd8d0",
    bgEnd: "#d0c8c0",
    observeAsActive: true,
    markup: `<div class="slide__image">
        <img src="/images/figma-vs-code.png" alt="2026年以前はFigma、2026年以降はコード" />
      </div>
      <div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">背景</p>
          <h2 class="slide__heading">
            丸一日かけて<br />1画面を描いていた。
          </h2>
          <p class="slide__body">
            2026年、AIに言葉で伝えるだけで<br />
            実際に動く画面が目の前に現れる。<br />
            丸一日かかっていた作業が、数十分で終わる。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-06",
    className: "slide slide--light",
    bgStart: "#d0c8c0",
    bgEnd: "#8a7e72",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">告白</p>
          <h2 class="slide__heading">
            「デザイナー」と<br />名乗っていいのか、<br />わからなくなっている。
          </h2>
          <p class="slide__body">
            納品物は「絵」からコードに変わった。<br />
            手で描く技術は、もう求められていないのかもしれない。<br /><br />
            自分の肩書きへの戸惑い。<br />
            これは、私だけの問題ではないはずだ。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-07",
    className: "slide",
    bgStart: "#8a7e72",
    bgEnd: "#1a1a2e",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">転換点</p>
          <h2 class="slide__heading">
            AIは「答え」を出すのが<br />圧倒的に速い。
          </h2>
          <p class="slide__body slide__body--accent">
            しかし、「問い」を立てること──<br />
            何を作るべきか、誰のために作るべきか、<br />
            その方角を定めるのは、<br />
            現実に触れて何かを感じた人間の仕事だ。<br /><br />
            その力を育てうるのが、美術教育ではないか。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-08",
    className: "slide slide--has-image",
    bgStart: "#1a1a2e",
    bgEnd: "#0f3460",
    observeAsActive: true,
    markup: `<div class="slide__image">
        <img src="/images/farm-smartphone.png" alt="農業の現場と手袋越しのスマホ操作" />
      </div>
      <div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">理由① ── 感じる力</p>
          <h2 class="slide__heading slide__heading--quote">
            「俺らにはIT無理だから。」
          </h2>
          <p class="slide__body">
            レポサク開発の最初の壁。<br />
            農家さんに拒絶された。<br />
            怒ってスマホを机に叩きつけた人もいた。<br /><br />
            データには表れない、アンケートにも書かれない。<br />
            しかし確かにそこにある感情。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-09",
    className: "slide",
    bgStart: "#0f3460",
    bgEnd: "#2a4a48",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">現場</p>
          <h2 class="slide__heading">
            畑を借りて、<br />2年間通った。
          </h2>
          <p class="slide__body">
            日光でスマホの画面が見えない。<br />
            泥だらけの手袋では操作できない。<br />
            自分で育てた作物は、ほとんど枯れた。<br /><br />
            シニアスマホ教室にも通い始めた。<br />
            「マップアプリが何度聞いてもわからない。」<br />
            言葉にならない切なさと、プライド。<br /><br />
            「わからない」と言えない空気の中で、<br />
            その人たちの感情を、感じ取ろうとした。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-10",
    className: "slide",
    bgStart: "#2a4a48",
    bgEnd: "#3a4038",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">問いの転換</p>
          <h2 class="slide__heading">
            「使いやすいアプリ」ではなく、<br />「誇りを持って使える体験」へ。
          </h2>
          <p class="slide__body">
            操作そのものを無くす設計。<br />
            IT用語を隠す。<br />
            畑の上に余計なものを被せない。<br /><br />
            「感じる」ことが、設計の方角を変えた。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-11",
    className: "slide",
    bgStart: "#3a4038",
    bgEnd: "#4a3728",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">成果</p>
          <h2 class="slide__heading slide__heading--quote">
            「これ知ってる？<br />かっこいいだろ。」
          </h2>
          <p class="slide__body">
            農家さんが、自分から周りに勧めてくれた。<br />
            口コミだけで全国200社以上に広がった。<br /><br />
            営業トークではなく、誇り。<br />
            「感じる力」がビジネスの成果になった瞬間だった。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-12",
    className: "slide",
    bgStart: "#4a3728",
    bgEnd: "#5c3d2e",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">美術教育との接続</p>
          <h2 class="slide__heading">
            このプロセスを<br />最初に体験したのは、<br />対話による鑑賞の授業だった。
          </h2>
          <p class="slide__body">
            否定しない場で、他者の見方に触れる。<br />
            自分の見え方が変わる。問いが生まれる。<br /><br />
            あの授業で身につけた「感じる力」が、<br />
            グッドデザイン賞金賞につながっている。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-node-anim",
    className: "slide slide--light slide--luminous",
    bgStart: "#faf8f5",
    bgEnd: "#ffffff",
    markup: "",
    observeAsActive: true,
    variant: "node-animation",
  },
  {
    id: "slide-13",
    className: "slide",
    bgStart: "#5c3d2e",
    bgEnd: "#4a3530",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">まとめ①</p>
          <h2 class="slide__heading slide__heading--warm">
            感じる力 →<br />問いを立てる力 →<br />価値を生む力。
          </h2>
          <p class="slide__body">
            美術の授業が育てている「感じる力」は、<br />
            社会で「問いを立てる力」になり、<br />
            やがて「価値を生む力」へと変わる。
          </p>
        </div>
      </div>`
  },
  {
    id: "slide-14",
    className: "slide slide--has-image",
    bgStart: "#4a3530",
    bgEnd: "#5c3d2e",
    observeAsActive: true,
    markup: `<div class="slide__image">
        <img src="/images/blueprint-vs-prototype.png" alt="設計図型 vs プロトタイプ型" />
      </div>
      <div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">理由② ── プロトタイプ型</p>
          <h2 class="slide__heading">
            正解がわからないまま、<br />小さく試す。<br />小さく外す。
          </h2>
          <p class="slide__body">
            設計図型：正解を決めてから動く。<br />
            プロトタイプ型：小さく試す。外す。感じて方角を修正する。<br /><br />
            到達点は最初から決まっていない。<br />
            動きながら見つけていく。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-15",
    className: "slide slide--has-image",
    bgStart: "#5c3d2e",
    bgEnd: "#8b3a3a",
    observeAsActive: true,
    markup: `<div class="slide__image">
        <img src="/images/chair-process.png" alt="椅子制作のプロセス" />
      </div>
      <div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">原体験</p>
          <h2 class="slide__heading">
            手を動かしながら、<br />座りながら、感じながら、<br />形を探っていった。
          </h2>
          <p class="slide__body">
            美術大学での椅子制作。<br />
            スケッチを何十枚も描き、実寸モデルを作って座る。<br />
            「なんか違う」を何度も繰り返す。<br />
            設計図通りに作ったのではない。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-16",
    className: "slide",
    bgStart: "#8b3a3a",
    bgEnd: "#6b4423",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">ある友人の話</p>
          <h2 class="slide__heading">
            選択肢が多すぎるのではなく、<br />「これがいい」と<br />感じる力が弱っている。
          </h2>
          <p class="slide__body">
            優秀な公務員の友人が、転職できずにいる。<br />
            情報は十分すぎるほどある。条件も整っている。<br /><br />
            でも、「これだ」と感じて飛び込む力が、<br />
            どこかで鈍っていた。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-17",
    className: "slide slide--river-source",
    bgStart: "#6b4423",
    bgEnd: "#5c3d2e",
    observeAsActive: true,
    markup: `<div class="river-origin" aria-hidden="true"></div>
      <div class="slide__inner slide__inner--split">
        <div class="split__left">
          <p class="slide__label">AI時代の落とし穴</p>
          <h2 class="slide__heading">
            AIの自信に満ちた即答が、<br />「正解は一回で出るもの」<br />という思い込みを強める。
          </h2>
        </div>
        <div class="split__right">
          <p class="slide__body">
            AIは迷わない。常に一つの答えを返す。<br />
            その速さと確信に触れ続けると、<br />
            「試行錯誤は非効率だ」と感じ始める。<br /><br />
            設計図型の生き方が、加速していく。
          </p>
        </div>
      </div>
      <div class="slide__river-start">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="riverReveal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#65636a"/>
              <stop offset="30%" stop-color="#3a7a84"/>
              <stop offset="60%" stop-color="#1e8a9a"/>
              <stop offset="100%" stop-color="#1e8a9a"/>
            </linearGradient>
          </defs>
          <rect width="1440" height="600" fill="url(#riverReveal)"/>
          <g class="river-shimmer">
            <ellipse class="river-shimmer__bar river-shimmer__bar--1" cx="720" cy="160" rx="500" ry="30" fill="rgba(255,255,255,0.03)" transform="rotate(-1.5 720 160)"/>
            <ellipse class="river-shimmer__bar river-shimmer__bar--2" cx="720" cy="360" rx="600" ry="35" fill="rgba(255,255,255,0.025)" transform="rotate(1 720 360)"/>
            <ellipse class="river-shimmer__bar river-shimmer__bar--3" cx="720" cy="510" rx="700" ry="40" fill="rgba(255,255,255,0.02)" transform="rotate(-0.8 720 510)"/>
          </g>
          <path d="M0,0 L660,0 C656,40 648,80 640,120 C630,165 624,200 612,240 C596,290 575,330 545,375 C508,425 460,468 400,505 C330,545 245,572 155,590 C80,600 35,605 0,600 L0,0 Z" fill="#48454a"/>
          <path d="M1440,0 L780,0 C784,40 792,80 800,120 C810,165 816,200 828,240 C844,290 865,330 895,375 C932,425 980,468 1040,505 C1110,545 1195,572 1285,590 C1360,600 1405,605 1440,600 L1440,0 Z" fill="#48454a"/>
        </svg>
      </div>`,
  },
  {
    id: "slide-18",
    className: "slide slide--has-image slide--drift",
    bgStart: "#1e8a9a",
    bgEnd: "#1a7f8e",
    observeAsActive: true,
    markup: `<div class="water-surface" aria-hidden="true">
        <div class="water-surface__orbit water-surface__orbit-x--2">
          <div class="water-surface__orbit water-surface__orbit-y--2">
            <div class="water-surface__layer water-surface__layer--2"></div>
          </div>
        </div>
        <div class="water-surface__orbit water-surface__orbit-x--1">
          <div class="water-surface__orbit water-surface__orbit-y--1">
            <div class="water-surface__layer water-surface__layer--1"></div>
          </div>
        </div>
      </div>
      <div class="slide__image">
        <img src="/images/about-scene.jpg" alt="上から見たヨット" />
      </div>
      <div class="slide__text slide__text--float">
        <p class="slide__label">美術教育との接続</p>
        <h2 class="slide__heading">
          美術の授業は、<br />「ドリフトする」練習だ。
        </h2>
        <p class="slide__body">
          粘土をこね、色を塗り、<br />
          「なんか違う」と壊してやり直す。<br /><br />
          あの感覚が、社会に出てからの生き方になった。<br />
          美術の授業は「プロトタイプ型の生き方」を<br />
          教えている。
        </p>
      </div>`,
  },
  {
    id: "slide-19",
    className: "slide",
    bgStart: "#1a7f8e",
    bgEnd: "#2d4040",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">まとめ②</p>
          <h2 class="slide__heading slide__heading--warm">
            設計図型の限界。<br />プロトタイプ型の生存戦略。<br />美術がその練習場である。
          </h2>
          <p class="slide__body">
            正解のない時代に、<br />
            「小さく試し、感じて、方角を変える」力。<br />
            美術の授業は、その力を育てている。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-20",
    className: "slide slide--light slide--luminous",
    bgStart: "#f5f0eb",
    bgEnd: "#faf8f5",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">理由③ ── 観察の場</p>
          <h2 class="slide__heading">
            算数の時間は<br />ずっと下を向いていたのに、<br />美術の時間になると<br />手が止まらなくなる子。
          </h2>
          <p class="slide__body">
            先生方なら、そんな子の顔が<br />
            すぐに思い浮かぶのではないでしょうか。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-21",
    className: "slide slide--light slide--luminous",
    bgStart: "#faf8f5",
    bgEnd: "#ffffff",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">美術固有の構造</p>
          <h2 class="slide__heading">
            テストの答案ではなく、<br />プロセスを見られる。
          </h2>
          <p class="slide__body">
            没頭の仕方。やり直しの仕方。<br />
            手の動かし方。色の選び方。<br /><br />
            その子の関心と思考の癖が、<br />
            作品ではなくプロセスに滲む。<br />
            それを観察できる場が、美術の教室だ。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-22",
    className: "slide slide--light slide--mountain-viz",
    bgStart: "#ffffff",
    bgEnd: "#faf8f5",
    markup: "",
    observeAsActive: true,
    variant: "mountain-viz",
  },
  {
    id: "slide-23",
    className: "slide slide--light slide--luminous",
    bgStart: "#faf8f5",
    bgEnd: "#ffffff",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">まとめ③</p>
          <h2 class="slide__heading slide__heading--warm">
            美術の教室は、<br />他教科では見えない「山」が<br />顔を出す場所だ。
          </h2>
          <p class="slide__body">
            そしてその山に最初に気づけるのは、<br />
            先生方だけだ。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-24",
    className: "slide slide--light slide--luminous",
    bgStart: "#ffffff",
    bgEnd: "#fffaf5",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">結論</p>
          <h2 class="slide__heading">
            美術の授業が育てる、<br />3つの力。
          </h2>
          <p class="slide__body">
            ① 感じる力 ── 問いを立てる力になる<br />
            ② プロトタイプ型 ── 正解のない時代の生き方になる<br />
            ③ 観察の場 ── その子だけの山が見える
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-25",
    className: "slide slide--light slide--luminous",
    bgStart: "#fffaf5",
    bgEnd: "#fff8f2",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">私自身の凸凹</p>
          <h2 class="slide__heading">
            テストは最下位と上位が<br />同居していた。
          </h2>
          <p class="slide__body">
            遅刻。忘れ物。バイトはクビ。<br />
            でも、凹があるから<br />
            農家さんの痛みがわかった。<br /><br />
            凹は弱さではなく、共鳴装置だった。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-26",
    className: "slide slide--light slide--luminous",
    bgStart: "#fff8f2",
    bgEnd: "#fffaf5",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <p class="slide__label">実践</p>
          <h2 class="slide__heading">
            この原稿自体が、<br />AIとの共著だ。
          </h2>
          <p class="slide__body">
            論理的にまとめるのが苦手な私の凹を、<br />
            AIが埋めてくれた。<br /><br />
            残ったのは、私の山だけ。<br />
            それでいい。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-27",
    className: "slide slide--light slide--luminous",
    bgStart: "#fffaf5",
    bgEnd: "#ffffff",
    markup: `<div class="slide__inner">
        <div class="slide__text">
          <h2 class="slide__heading slide__heading--warm">
            もし美術の時間にだけ<br />別人のように動き出す子が<br />いたら──
          </h2>
          <p class="slide__body slide__body--accent">
            それがその子だけの力であることを、<br />
            本人に伝えてほしい。
          </p>
        </div>
      </div>`,
  },
  {
    id: "slide-28",
    className: "slide slide--closing slide--luminous",
    bgStart: "#ffffff",
    bgEnd: "#ffffff",
    markup: "",
    variant: "closing",
  },
];
