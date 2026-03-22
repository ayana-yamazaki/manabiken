export type SlideData = {
  id: string;
  className: string;
  bgStart: string;
  bgEnd: string;
  content?: SlideContent;
  caption?: string;
  observeAsActive?: boolean;
};

export type SlideContentLayout =
  | "title"
  | "basic"
  | "text"
  | "image-text"
  | "work-ui"
  | "split-river"
  | "drift"
  | "intro"
  | "message"
  | "mountain-viz"
  | "node-animation"
  | "closing";

export type SlideContent = {
  layout: SlideContentLayout;
  modifiers?: string[];
  nodeAccent?: {
    enabled?: boolean;
  };
  label?: string;
  lead?: string;
  heading?: string;
  headingClassName?: string;
  sub?: string;
  author?: string;
  nameEn?: string;
  body?: string;
  bodyClassName?: string;
  imageSrc?: string;
  imageAlt?: string;
  leftLabel?: string;
  leftHeading?: string;
  rightBody?: string;
};

export const slides: SlideData[] = [
  {
    id: "slide-01",
    className: "slide slide--title slide--light",
    bgStart: "#f5f0eb",
    bgEnd: "#f0ebe5",
    content: {
      layout: "title",
      heading: "問いを立てる力は、\nどこで育つのか。",
      headingClassName: "slide__heading--hero",
      sub: "デザインの現場から見た美術教育",
      author: "山崎 文菜 ── プロダクトデザイナー",
    },
  },
  {
    id: "slide-02",
    className: "slide slide--intro slide--light",
    bgStart: "#f0ebe5",
    bgEnd: "#eae5df",
    content: {
      layout: "intro",
      heading: "山崎 文菜",
      nameEn: "Ayana Yamazaki",
      sub: "プロダクトデザイナー",
      body: "金沢美術工芸大学 プロダクトデザイン学部卒。\n日立製作所で鉄道システムのUXデザインに携わり、\nその後スタートアップで農業・医療・SaaSなど\n現場で使われるサービスを設計してきた。\n\n美術の先生ではありません。\n美術の授業を受けた側の人間です。",
      imageSrc: "/images/profile.jpg",
      imageAlt: "山崎文菜",
    },
    observeAsActive: true,
  },
  {
    id: "slide-03",
    className: "slide slide--light slide--message",
    bgStart: "#eae5df",
    bgEnd: "#e5dfd8",
    content: {
      layout: "message",
      label: "本日のメッセージ",
      heading: "AI時代に最も必要とされる力は、\n美術の授業が育てうる力だ。",
      lead: "今日は3つの観点からお話しします。",
    },
    observeAsActive: true,
  },
  {
    id: "slide-04",
    className: "slide slide--light slide--work-ui",
    bgStart: "#eae5df",
    bgEnd: "#e5dfd8",
    content: {
      layout: "basic",
      heading: "2025年まで、\n私はアプリの画面を描いていた",
      body: "美しいブランドカラーや余白、直感的な画面構成、データベースとの整合性…\n10年以上かけて積み上げたスキル。1画面を仕上げるのに何日もかかることも",
      imageSrc: "/images/figma-vs-code.png",
      imageAlt: "2025年までに制作していたアプリ画面のデザイン",
    },
  },
    {
    id: "slide-05",
    className: "slide slide--has-image slide--light",
    bgStart: "#1a1a2e",
    bgEnd: "#0f3460",
    observeAsActive: true,
    content: {
      layout: "basic",
      label: "背景",
      heading: "2026年現在、\nコードを書いている。",
      body: "代わりにコードを書いている。AIに言葉で伝えるだけで実際に動く画面が目の前に現れる。\n丸一日かかっていた作業が、数十分で終わる。デザイナーの仕事はエンジニア領域に染み出し、非デザイナーでもハイクオリティなものを生成できる。",
      imageSrc: "/images/figma-vs-code2.png",
      imageAlt: "コードを書いている様子",
    },
  },
  {
    id: "slide-06",
    className: "slide slide--title slide--light",
    bgStart: "#f5f0eb",
    bgEnd: "#f0ebe5",
    content: {
      layout: "title",
      heading: "1. 「感じる」を教えている",
      headingClassName: "slide__heading--hero",
      sub: "美術の授業の力",
      // author: "山崎 文菜 ── プロダクトデザイナー",
    },
  },
  {
    id: "slide-07",
    className: "slide slide--has-image slide--light",
    bgStart: "#e5dfd8",
    bgEnd: "#dfd8d0",
    content: {
      layout: "basic",
      heading: "レポサク\nグッドデザイン賞\n金賞 (TOP20)",
      body: "北海道の農家さんと共同開発した「レポサク」。\nGPS端末をUSBに挿すだけで、\n数十台の車両の位置と軌跡がスマホで見える。\n\n全国200社以上、農協24組合に導入。",
      imageSrc: "/images/reposaku.png",
      imageAlt: "レポサク — グッドデザイン金賞",
    },
  },
    {
    id: "slide-node-anim",
    className: "slide slide--light slide--luminous",
    bgStart: "#faf8f5",
    bgEnd: "#ffffff",
    content: {
      layout: "node-animation",      
      heading: "対話による鑑賞",
      body: "誰かが「ここの色合いが好き」と言う。誰かが「僕はちょっと怖い」と言う。そんな感じ方があるのか、と驚く。自分では気づかなかった色や形が、他人の言葉を通じて見えてくる。自分とは違う感じ方があることを知る。",
    },
    observeAsActive: true,
  },

  {
    id: "slide-09",
    className: "slide slide--has-image",
    bgStart: "#1a1a2e",
    bgEnd: "#0f3460",
    observeAsActive: true,
    content: {
      layout: "basic",
      nodeAccent: {
        enabled: true,
      },
      heading: "「俺らにはIT無理だから。」\n最初の問い",
      headingClassName: "slide__heading--quote",
      body: "農家さん向けアプリ開発の事例。農家さんの多くが60代以上。\n当初、農家さんと大きな断絶。「俺らには無理だから」と怒ってスマホを投げる人まで。「どうしてそんなに拒絶するの？」それが最初の問い。",
    },
  },
  {
    id: "slide-10",
    className: "slide",
    bgStart: "#0f3460",
    bgEnd: "#2a4a48",
    content: {
      layout: "basic",
      nodeAccent: {
        enabled: true,
      },
      heading: "2年間、畑を借りて、\n作物を育てた。",
      body: "自分で畑に立つと、日光でスマホの画面が見えない。\n泥だらけの手袋では操作できない。\nシニアスマホ教室にも通い始めた。\n「マップアプリが何度聞いてもわからない。」\n言葉にならない切なさと、プライド。\n\n「わからない」と言えない空気の中で、\nその人たちの感情を、感じ取ろうとした。",
      imageSrc: "/images/farm-smartphone.png",
      imageAlt: "農業の現場と手袋越しのスマホ操作",
    },
  },
    {
    id: "slide-11",
    className: "slide",
    bgStart: "#0f3460",
    bgEnd: "#2a4a48",
    content: {
      layout: "basic",
      nodeAccent: {
        enabled: true,
      },
      heading: "シニアスマホ教室に通った。",
      body: "シニアスマホ教室でボランティアをした。若い頃はバリバリ第一線で働いてたのに、マップアプリで現在地を開く方法が何度聞いてもわからない。「何度も聞いてごめんなさいね、私頭が悪いから…」\n言葉にならない切なさと、プライド。\n\n「わからない」と言えない空気の中で、\nその人たちの感情を、感じ取ろうとした。",
    },
  },
  {
    id: "slide-12",
    className: "slide",
    bgStart: "#eae5df",
    bgEnd: "#e5dfd8",
    content: {
      layout: "basic",
      nodeAccent: {
        enabled: true,
      },
      heading: "問いの変換\n「彼らが持って使える体験とは？」",
      body: "操作そのものを無くす設計。\nIT用語を隠す。\n畑の上に余計なものを被せない。\n\n「感じる」ことが、設計の方角を変えた。",
    },
  },
  {
    id: "slide-13",
    className: "slide",
    bgStart: "#3a4038",
    bgEnd: "#4a3728",
    content: {
      layout: "basic",
      nodeAccent: {
        enabled: true,
      },
      heading: "「これ知ってる？\nかっこいいだろ。」",
      headingClassName: "slide__heading--quote",
      body: "農家さんが、自分から周りに勧めてくれた。\n口コミだけで全国200社以上に広がった。\n\n営業トークではなく、誇り。\n「感じる力」がビジネスの成果になった瞬間だった。",
    },
  },
  {
    id: "slide-14",
    className: "slide",
    bgStart: "#5c3d2e",
    bgEnd: "#4a3530",
    content: {
      layout: "basic",
      heading: "まとめ\n感じる力 →\n問いを立てる力 →\n価値を生む力。",
      headingClassName: "slide__heading--warm",
      body: "美術の授業が育てている「感じる力」は、\n社会で「問いを立てる力」になり、\nやがて「価値を生む力」へと変わる。",
    }
  },

  {
    id: "slide-15",
    className: "slide slide--title slide--light",
    bgStart: "#f5f0eb",
    bgEnd: "#f0ebe5",
    content: {
      layout: "title",
      heading: "2. 「正解のない中で試し続ける力」を教えている",
      headingClassName: "slide__heading--hero",
      sub: "美術の授業の力",
    },
  },
  {
    id: "slide-16",
    className: "slide slide--has-image",
    bgStart: "#4a3530",
    bgEnd: "#5c3d2e",
    observeAsActive: true,
    content: {
      layout: "basic",
      label: "設計図型と\nプロトタイプ型",
      heading: "正解がわからないまま、\n小さく試す。\n小さく外す。",
      body: "設計図型：正解を決めてから動く。\nプロトタイプ型：小さく試す。外す。感じて方角を修正する。\n\n到達点は最初から決まっていない。\n動きながら見つけていく。",
      imageSrc: "/images/blueprint-vs-prototype.png",
      imageAlt: "設計図型 vs プロトタイプ型",
    },
  },
  {
    id: "slide-17",
    className: "slide slide--has-image",
    bgStart: "#5c3d2e",
    bgEnd: "#8b3a3a",
    observeAsActive: true,
    content: {
      layout: "basic",
      label: "原体験",
      heading: "手を動かしながら、\n座りながら、感じながら、\n形を探っていった。",
      body: "美術大学での椅子制作。\nスケッチを何十枚も描き、実寸モデルを作って座る。\n「なんか違う」を何度も繰り返す。\n設計図通りに作ったのではない。",
      imageSrc: "/images/chair-process.png",
      imageAlt: "椅子制作のプロセス",
    },
  },

  {
    id: "slide-17",
    className: "slide slide--river-source",
    bgStart: "#6b4423",
    bgEnd: "#5c3d2e",
    observeAsActive: true,
    content: {
      layout: "split-river",
      leftLabel: "AI時代の落とし穴",
      leftHeading: "AIの自信に満ちた即答が、\n「正解は一回で出るもの」\nという思い込みを強める。",
      rightBody: "AIは迷わない。常に一つの答えを返す。\nその速さと確信に触れ続けると、\n「試行錯誤は非効率だ」と感じ始める。\n\n設計図型の生き方が、加速していく。",
    },
  },
  {
    id: "slide-18",
    className: "slide slide--has-image slide--drift",
    bgStart: "#1e8a9a",
    bgEnd: "#1a7f8e",
    observeAsActive: true,
    content: {
      layout: "drift",
      label: "美術教育との接続",
      heading: "美術の授業は、\n「ドリフトする」練習だ。",
      body: "粘土をこね、色を塗り、\n「なんか違う」と壊してやり直す。\n\nあの感覚が、社会に出てからの生き方になった。\n美術の授業は「プロトタイプ型の生き方」を\n教えている。",
      imageSrc: "/images/about-scene.jpg",
      imageAlt: "上から見たヨット",
    },
  },
  {
    id: "slide-19",
    className: "slide",
    bgStart: "#1a7f8e",
    bgEnd: "#2d4040",
    content: {
      layout: "text",
      label: "まとめ②",
      heading: "設計図型の限界。\nプロトタイプ型の生存戦略。\n美術がその練習場である。",
      headingClassName: "slide__heading--warm",
      body: "正解のない時代に、\n「小さく試し、感じて、方角を変える」力。\n美術の授業は、その力を育てている。",
    },
  },
  {
    id: "slide-20",
    className: "slide slide--light slide--luminous",
    bgStart: "#f5f0eb",
    bgEnd: "#faf8f5",
    content: {
      layout: "text",
      label: "理由③ ── 観察の場",
      heading: "算数の時間は\nずっと下を向いていたのに、\n美術の時間になると\n手が止まらなくなる子。",
      body: "先生方なら、そんな子の顔が\nすぐに思い浮かぶのではないでしょうか。",
    },
  },
  {
    id: "slide-21",
    className: "slide slide--light slide--luminous",
    bgStart: "#faf8f5",
    bgEnd: "#ffffff",
    content: {
      layout: "text",
      label: "美術固有の構造",
      heading: "テストの答案ではなく、\nプロセスを見られる。",
      body: "没頭の仕方。やり直しの仕方。\n手の動かし方。色の選び方。\n\nその子の関心と思考の癖が、\n作品ではなくプロセスに滲む。\nそれを観察できる場が、美術の教室だ。",
    },
  },
  {
    id: "slide-22",
    className: "slide slide--light slide--mountain-viz",
    bgStart: "#ffffff",
    bgEnd: "#faf8f5",
    content: {
      layout: "mountain-viz",
    },
    observeAsActive: true,
  },
  {
    id: "slide-23",
    className: "slide slide--light slide--luminous",
    bgStart: "#faf8f5",
    bgEnd: "#ffffff",
    content: {
      layout: "text",
      label: "まとめ③",
      heading: "美術の教室は、\n他教科では見えない「山」が\n顔を出す場所だ。",
      headingClassName: "slide__heading--warm",
      body: "そしてその山に最初に気づけるのは、\n先生方だけだ。",
    },
  },
  {
    id: "slide-24",
    className: "slide slide--light slide--luminous",
    bgStart: "#ffffff",
    bgEnd: "#fffaf5",
    content: {
      layout: "text",
      label: "結論",
      heading: "美術の授業が育てる、\n3つの力。",
      body: "① 感じる力 ── 問いを立てる力になる\n② プロトタイプ型 ── 正解のない時代の生き方になる\n③ 観察の場 ── その子だけの山が見える",
    },
  },
  {
    id: "slide-25",
    className: "slide slide--light slide--luminous",
    bgStart: "#fffaf5",
    bgEnd: "#fff8f2",
    content: {
      layout: "text",
      label: "私自身の凸凹",
      heading: "テストは最下位と上位が\n同居していた。",
      body: "遅刻。忘れ物。バイトはクビ。\nでも、凹があるから\n農家さんの痛みがわかった。\n\n凹は弱さではなく、共鳴装置だった。",
    },
  },
  {
    id: "slide-26",
    className: "slide slide--light slide--luminous",
    bgStart: "#fff8f2",
    bgEnd: "#fffaf5",
    content: {
      layout: "text",
      label: "実践",
      heading: "この原稿自体が、\nAIとの共著だ。",
      body: "論理的にまとめるのが苦手な私の凹を、\nAIが埋めてくれた。\n\n残ったのは、私の山だけ。\nそれでいい。",
    },
  },
  {
    id: "slide-27",
    className: "slide slide--light slide--luminous",
    bgStart: "#fffaf5",
    bgEnd: "#ffffff",
    content: {
      layout: "text",
      heading: "もし美術の時間にだけ\n別人のように動き出す子が\nいたら──",
      headingClassName: "slide__heading--warm",
      body: "それがその子だけの力であることを、\n本人に伝えてほしい。",
      bodyClassName: "slide__body--accent",
    },
  },
  {
    id: "slide-28",
    className: "slide slide--closing slide--luminous",
    bgStart: "#ffffff",
    bgEnd: "#ffffff",
    content: {
      layout: "closing",
      heading: "先生方の教室から\n飛び立つ子どもたちと、\nいつか一緒に\n仕事がしたい。",
      body: "山崎 文菜\nプロダクトデザイナー ── CADDi",
    },
  },
];
