export type SlideData = {
  id: string;
  className: string;
  bgStart: string;
  bgEnd: string;
  backgroundType?: string;
  backgroundAnimation?: string;
  content?: SlideContent;
  caption?: string;
  observeAsActive?: boolean;
};

export type SlideContentLayout =
  | "title"
  | "basic"
  | "text"
  | "image-text"
  | "basic"
  | "split-river"
  | "split-plain"
  | "drift"
  | "intro"
  | "message"
  | "mountain-viz"
  | "node-animation"
  | "bounce-viz"
  | "closing";

export type SlideContent = {
  layout: SlideContentLayout;
  modifiers?: string[];
  textColor?: string;
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
  imageClassName?: string;
  leftLabel?: string;
  leftHeading?: string;
  rightBody?: string;
  rightCanvas?: string;
};


export const slides: SlideData[] = [


 {
    id: "slide-01",
    className: "slide slide--title slide--light",
    bgStart: "#f5f0eb",
    bgEnd: "#f0ebe5",
    content: {
      layout: "title",
      heading: "問いを立てる力は\nどこで育つのか",
      headingClassName: "slide__heading--hero",
      sub: "デザインの現場から見た美術教育",
      author: "山崎 文菜 プロダクトデザイナー",
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
      body: "金沢美術工芸大学 プロダクトデザイン学部卒。\n日立製作所研究開発グループで新幹線の運行システムのUI/UXデザインに携わる。\nその後スタートアップで農業・医療・製造業・運送業など\n現場で使われるサービス、アプリの設計をしてきた。\n\n美術の先生ではなく、\n美術の授業を受けた側の人間です。",
      imageSrc: "/images/profile.jpg",
      imageAlt: "山崎文菜",
    },
    observeAsActive: true,
  },
  {
    id: "slide-04",
    className: "slide slide--light slide--luminous",
    bgStart: "#eae5df",
    bgEnd: "#e5dfd8",
    content: {
      layout: "basic",
      heading: "2025年まで、\n私はアプリの画面を\n描いていた",
      body: "美しいブランドカラーや余白、直感的な画面構成、データベースとの整合性…\n10年以上かけて積み上げたスキル。1画面を仕上げるのに何日もかかることも",
      imageSrc: "/images/figma-vs-code.png",
      imageAlt: "2025年までに制作していたアプリ画面のデザイン",
    },
  },
    {
    id: "slide-05",
    className: "slide slide--has-image slide--dark .basic__text",
    bgStart: "#1a1a2e",
    bgEnd: "#0f3460",
    observeAsActive: true,
    content: {
      layout: "basic",
      textColor: "#faf8f5",
      heading: "2026年現在、\nコードを生成している",
      body: "もう画面をかいていない。AIに言葉で伝えるだけで実際に動く画面が目の前に現れる。\n丸一日かかっていた作業が、数十分で終わる。デザイナーの仕事はエンジニア領域に染み出し、非デザイナーでもハイクオリティなものを生成できるようになった。\n技術の進歩は凄まじく、今の1週間は、去年の3ヶ月ほどのスピード感がある。\n知能が民主化し、人間のできることがどんどん広がっている。",
      imageSrc: "/images/figma-vs-code2.png",
      imageAlt: "コードを書いている様子",
    },
  },

  {
    id: "slide-03",
    className: "slide slide--light slide--message",
    bgStart: "#f0ebe5",
    bgEnd: "#f0ebe5",
    content: {
      layout: "message",
      heading: "AI時代に必要とされる力は、\n美術の授業が育てる",
      lead: "自分の実体験と、テクノロジーとビジネスの観点を踏まえて、今日は3つの観点からお話しします。",
    },
    observeAsActive: true,
  },
  {
    id: "slide-06",
    className: "slide slide--subtitle slide--light", // 👈 darkをlightに変更
    bgStart: "#faf8f5",
    bgEnd: "#ffffff",
    content: {
      layout: "title",
      heading: "1. 「感じる」ことを教わった",
      sub: "美術の授業の力",
    },
  },

   {
    id: "slide-node-anim",
    className: "slide slide--light slide--luminous",
    bgStart: "#ffffff",
    bgEnd: "#ffffff",
    content: {
      layout: "node-animation",      
      heading: "対話による鑑賞",
      body: "誰かが「ここの色合いが好き」と言う。\n誰かが「僕はちょっと怖い」と言う。\nそんな感じ方があるのか、と驚く。\n\n自分では気づかなかった色や形が、他人の言葉を通じて見えてくる。\n自分とは違う感じ方があることを観察する。",
    },
    observeAsActive: true,
  },

  {
    id: "slide-07",
    className: "slide slide--light slide--luminous",
    bgStart: "#e5dfd8",
    bgEnd: "#dfd8d0",
    content: {
      layout: "basic",
      heading: "レポサク\nグッドデザイン賞\n金賞 (TOP20)",
      body: "北海道の農家さん向けWebアプリ。\nGPS端末をUSBに挿すだけで、\n数十台の車両の位置と軌跡がスマホで見える。\n何が評価されたのか？",
      imageSrc: "/images/reposaku_main.jpg",
      imageAlt: "レポサク — グッドデザイン金賞",
    },
  },

  {
    id: "slide-09",
    className: "slide slide--has-image",
    bgStart: "#1a1a2e",
    bgEnd: "#0f3460",
    observeAsActive: true,
    content: {
      layout: "basic",
      modifiers: ["basic--text-left", "basic--surface-clear"],
      textColor: "#faf8f5",
      heading: "「俺らはIT無理だから」",
      body: "農家さんの多くは60代以上で、あまりスマホに慣れていない。\n開発当初は、農家さんと大きな断絶があった。\n\n「難しい。面倒臭い。わかんない」\n「俺らはバカじゃない！」\n\n「なぜこんなに拒絶するの？」それが最初の問いだった。",
      rightCanvas: "two-node",
    },
  },
{
    id: "slide-10",
    className: "slide slide--has-image slide--dark .basic__text",
    bgStart: "#0f3460",
    bgEnd: "#2a4a48",
    content: {
      layout: "basic", 
      textColor: "#faf8f5",
      modifiers: ["basic--text-left", "basic--surface-clear"], 
      heading: "2年間、畑を借り土を耕し、作物を育てた。\nシニアスマホ教室に通って、お年寄りを観察した。",
      body: "自分で畑に立つと、日光でスマホの画面が見えない。\n手袋をつけるので、操作そのものが難しい。\n\nシニアスマホ教室では、お年寄りの感情を感じ取ろうとした。\n数年前までバリバリ第一線で働いてたのに、マップアプリで現在地を開く方法が何度聞いてもわからない。\nバカにされていると感じる。\n徐々に「私は頭が悪いから…」と、\nプライドは粉々、自己効力感も奪われる。\nアプリを開発するデザイナーとして、責任を感じた。",
      imageSrc: "/images/farming.jpg",
      imageAlt: "畑を借りて土を耕した",
    },
  },

  {
    id: "slide-12",
    className: "slide slide--has-image slide--dark",
    bgStart: "#0f3460",
    bgEnd: "#2a4a48",
    content: {
      layout: "basic", 
      textColor: "#faf8f5",
      modifiers: ["basic--text-center", "basic--surface-clear"], 
      nodeAccent: {
        enabled: true,
      },
      heading: "問いの再設計\n「彼らが誇りを持って\n楽しく使える体験とは？」",
      body: "思い切って、操作そのものを無くす設計に。\n彼らが聞き慣れないIT用語は隠す。\n画面に描画される畑は、ただの地図ではない。彼らが大切に大切に育てた土だ。だから、画面の畑には、無遠慮に余計なものは被せない。\n\n「感じる」ことが、設計の方角を変えた。",
    },
  },

    {
    id: "slide-13",
    className: "slide slide--light slide--luminous",
    bgStart: "#e5dfd8",
    bgEnd: "#dfd8d0",
    content: {
      layout: "basic",
      heading: "「これ知ってる？\nかっこいいだろ。」",
      body: "農家さんとの「対話による鑑賞」から問いを再設計し、彼らが誇りを持って楽しく使えるWebアプリが開発できた。\n\n農家さんの口コミによってどんどん広がり、今では全国200社以上で導入。誰でも使えるカンタンさが話題になり、除雪やごみ収集、猟師さんにも使われている。\n\nこの取り組みが評価され、グッドデザイン賞金賞を受賞した。\n「対話による鑑賞」がビジネスの成果になった瞬間だった。",
      imageSrc: "/images/top_ver2.jpg",
      imageAlt: "レポサク — グッドデザイン金賞",
    },
  },


  {
    id: "slide-14",
    className: "slide slide--subtitle slide--light",
    bgStart: "#f5f0eb",
    bgEnd: "#f0ebe5",
    content: {
      layout: "node-animation",
      modifiers: ["basic--text-center", "basic--surface-clear"],
      textColor: "#1a1a2e",
      heading: "感じる力が、\n問いを立てる力になる",
      body: "\nデザイナーの「感じる力」は、他者の感情を丁寧に観察し、彼らの本質的な課題を掴み、それを形にし、ビジネスに還元する能力だ。\n\n「世界をどう見るか」というインプットと、\n「つくる・描く」というアウトプットの間に生じる\n言葉にならない違和感をそのまま扱う場は、\n美術をおいて他にほとんどないのではないか。 \n\n学校というシステムの中に、そうした「余白」が存在し続けていること自体に、決定的な意味がある。",
    }
  },

    {
    id: "slide-15",
    className: "slide slide--subtitle slide--light", // 👈 darkをlightに変更
    bgStart: "#f5f0eb", // 👈 明るいベージュを維持
    bgEnd: "#f0ebe5",
    content: {
      layout: "title",
      heading: "2. 正解がないまま \n小さく試し続けことを体で学んだ",
      sub: "美術の授業の力",
    },
  },

  {
    id: "slide-aa",
    className: "slide slide--river-source",
    bgStart: "#6b4423",
    bgEnd: "#5c3d2e",
    observeAsActive: true,
    content: {
      layout: "split-plain",
      modifiers: ["basic--surface-clear"],
      leftHeading: "設計図型の生き方は難しくなっている",
      rightBody: "かつては、正解を決めてから歩む「設計図型」の生き方が当たり前だった。\n良い大学に行き、良い会社に入り、家を買い、子供を持ち…設計図どおりに進めば幸せが保証された。\n\n今はその設計図が1年後に通用する保証はどこにもない。デザイナーが絵を描かずにコードを書くなんて、一年前には未来の話だった。\n私がフリーランスで受けていた仕事は、すでに3割がAIに代替された。まさかこんなに急速に技術が発展するなんて。",
    },
  },

  {
    id: "slide-18",
    className: "slide slide--river-source",
    bgStart: "#6b4423",
    bgEnd: "#5c3d2e",
    observeAsActive: true,
    content: {
      layout: "split-river",
      modifiers: ["basic--surface-clear"],
      leftHeading: "不確実な世界を生きるということ",
      rightBody: "不確実性は高いのに、AIに話しかければ、それらしい答えがすぐに得られる。\n「正解は一回で出る」という感覚が加速する。\n\n膨大な選択肢の中から自分の生き方を選ぶのが怖くなってくる。",
    },
  },
  {
    id: "slide-18_2",
    className: "slide slide--has-image slide--drift",
    bgStart: "#1e8a9a",
    bgEnd: "#1a7f8e",
    observeAsActive: true,
    content: {
      layout: "drift",
      heading: "今必要なのは、\n正解のない中、小さく試し続けること",
      body: "設計図型ではなく、「プロトタイプ型」の生き方だ。\n到達点が決まっていないまま動き始め、感覚に従いながらゆるやかに操舵していく。小さく試す。外す。感じて方角を修正する。\n\n到達点は最初から決まっていない。",
      imageSrc: "/images/boat.png",
      imageAlt: "上から見たヨット",
    },
  },

  /* {
    id: "slide-16",
    className: "slide slide--has-image",
    bgStart: "#4a3530",
    bgEnd: "#5c3d2e",
    observeAsActive: true,
    content: {
      layout: "basic",
      heading: "美術の授業は、)(漂流) する」練習だ。",
      body: "粘土をこね、色を塗り、\n「なんか違う」と壊してやり直す。\n\nあの感覚が、社会に出てからの生き方になった。\n美術の授業は「プロトタイプ型の生き方」を\n教えている。",
      imageSrc: "/images/blueprint-vs-prototype.png",
      imageAlt: "設計図型 vs プロトタイプ型",
    },
  },*/

  {
    id: "slide-17",
    className: "slide slide--light slide--luminous",
    bgStart: "#5c3d2e",
    bgEnd: "#8b3a3a",
    observeAsActive: true,
    content: {
      layout: "basic",
      heading: "「正解がないまま手を動かす」感覚が、仕事の進め方になった",
      body: "美術大学での椅子制作では、スケッチを何百枚と描いて、その中から1枚を選び、実寸プロトタイプを作って座る。\n「なんか違う」を何度も繰り返していく。\n最初から設計図を引くと、失敗が怖くなってしまう。小さく試すことは、レジリエンス高く生きるスキルだ。",
      imageSrc: "/images/craft_chair.jpg",
      imageAlt: "椅子制作のプロセス",
    },
  },


  {
    id: "slide-18",
    className: "slide slide--subtitle slide--light",
    bgStart: "#f5f0eb",
    bgEnd: "#f0ebe5",
    content: {
      layout: "basic",
      modifiers: ["basic--text-center", "basic--surface-clear"],
      textColor: "#1a1a2e",
      heading: "美術は、正解のない中で\n小さく試し続ける力を\n育てている",
      body: "正解のない時代だからこそ、\n失敗してドリフト (漂流) しよう。\n美術の授業は、その力を育てている。",
    }
  },

      {
    id: "slide-19",
    className: "slide slide--subtitle slide--light", // 👈 darkをlightに変更
    bgStart: "#f5f0eb", // 👈 明るいベージュを維持
    bgEnd: "#f0ebe5",
    content: {
      layout: "title",
      heading: "3. 美術の授業で、自分の凸凹が見えた",
      sub: "美術の授業の力",
    },
  },



  {
    id: "slide-bounce",
    className: "slide slide--light slide--mountain-viz",
    bgStart: "#ffffff",
    bgEnd: "#faf8f5",
    content: {
      layout: "bounce-viz",
      heading: "テストの答案ではなく、\n思考の過程を見てくれる",
      body: "人にはそれぞれ凸凹がある。苦手なことと、得意なこと。没頭の仕方。やり直しの仕方。\n手の動かし方。色の選び方。\n\nその子の関心と思考の癖が、\n作品ではなくプロセスに滲む。\nそれを大人やクラスメイトが観察してくれる場が、美術の教室だ。算数の時間は\nずっと下を向いていたのに、\n美術の時間になると\n手が止まらなくなる子。\n先生方なら、そんな子の顔が\nすぐに思い浮かぶのではないでしょうか。",
    },
    observeAsActive: true,
  },

  {
    id: "slide-mountain",
    className: "slide slide--light slide--mountain-viz",
    bgStart: "#ffffff",
    bgEnd: "#faf8f5",
    content: {
      layout: "mountain-viz",
      label: "山と谷",
      heading: "谷が埋まった後に顔をだすのは、\nその人の山だ。",
      body: "AIの時代、苦手な領域はAIが補ってくれる。\n谷が埋まる。\nその後に残る「山」──その子だけの力に\n最初に気づけるのは、先生方かもしれない。",
    },
    observeAsActive: true,
  },

    /*
  {
    id: "slide-25",
    className: "slide slide--light slide--luminous",
    bgStart: "#fffaf5",
    bgEnd: "#fff8f2",
    content: {
      layout: "text",
      heading: "テストは最下位と上位が\n同居していた。",
      body: "遅刻。忘れ物。バイトはクビ。\nでも、凹があるから\n農家さんの痛みがわかった。\n\n凹は弱さではなく、共鳴装置だった。",
    },
  },  */

  {
    id: "slide-26",
    className: "slide slide--light slide--luminous",
    bgStart: "#4facd1",
    bgEnd: "#4facd1",
    content: {
      layout: "text",
      heading: "この発表自体が、\nAIとの共著だ。",
      body: "論理的にまとめるのが苦手な私の凹を、\nAIが埋めてくれた。\n\n残ったのは、私の山だけ。",
    },
  },

  /*
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
    id: "slide-24",
    className: "slide slide--light slide--luminous",
    bgStart: "#ffffff",
    bgEnd: "#fffaf5",
    content: {
      layout: "basic",
      label: "結論",
      heading: "美術の授業が育てる、\n3つの力。",
      body: "① 感じる力 ── 問いを立てる力になる\n② プロトタイプ型 ── 正解のない時代の生き方になる\n③ 観察の場 ── その子だけの山が見える",
    },
  },*/

  {
    id: "slide-29",
    className: "slide slide--closing slide--luminous",
    bgStart: "#ffffff",
    bgEnd: "#ffffff",
    observeAsActive: true,
    content: {
      layout: "closing",
      heading: "先生方の教室から\n飛び立つ子どもたちと、\nいつか一緒に\n仕事がしたい",
      body: "山崎 文菜\nプロダクトデザイナー",
    },
  },
];
