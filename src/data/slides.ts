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
    id: "slide-03b",
    className: "slide slide--light slide--work-ui",
    bgStart: "#e5dfd8",
    bgEnd: "#dfd8d0",
    content: {
      layout: "work-ui",
      modifiers: ["work-ui--text-right", "work-ui--panel-none", "work-ui--text-plain", "work-ui--text-dark", "work-ui--caption-plain"],
      heading: "2025年まで、私はアプリの画面を描いていた",
      body: "美しいブランドカラーや余白、直感的な画面構成、\nデータベースとの整合性…\n10年以上かけて積み上げたスキル",
      imageSrc: "/images/figma-vs-code.png",
      imageAlt: "2025年までに制作していたアプリ画面のデザイン",
    },
    caption: "1画面を仕上げるのに何日もかかることも",
  },
  {
    id: "slide-04",
    className: "slide slide--has-image slide--light",
    bgStart: "#e5dfd8",
    bgEnd: "#dfd8d0",
    observeAsActive: true,
    content: {
      layout: "image-text",
      label: "私の仕事",
      heading: "レポサク",
      body: "北海道の農家さんと共同開発した車両管理アプリ。\nGPS端末をUSBに挿すだけで、\n数十台の車両の位置と軌跡がスマホで見える。\n\n全国200社以上、農協24組合に導入。\n2025年 グッドデザイン賞 金賞（TOP 20）受賞。",
      imageSrc: "/images/reposaku.png",
      imageAlt: "レポサク — グッドデザイン金賞",
    },
  },
  {
    id: "slide-05",
    className: "slide slide--has-image slide--light",
    bgStart: "#dfd8d0",
    bgEnd: "#d0c8c0",
    observeAsActive: true,
    content: {
      layout: "image-text",
      label: "背景",
      heading: "丸一日かけて\n1画面を描いていた。",
      body: "2026年、AIに言葉で伝えるだけで\n実際に動く画面が目の前に現れる。\n丸一日かかっていた作業が、数十分で終わる。",
      imageSrc: "/images/figma-vs-code.png",
      imageAlt: "2026年以前はFigma、2026年以降はコード",
    },
  },
  {
    id: "slide-06",
    className: "slide slide--light",
    bgStart: "#d0c8c0",
    bgEnd: "#8a7e72",
    content: {
      layout: "text",
      label: "告白",
      heading: "「デザイナー」と\n名乗っていいのか、\nわからなくなっている。",
      body: "納品物は「絵」からコードに変わった。\n手で描く技術は、もう求められていないのかもしれない。\n\n自分の肩書きへの戸惑い。\nこれは、私だけの問題ではないはずだ。",
    },
  },
  {
    id: "slide-07",
    className: "slide",
    bgStart: "#8a7e72",
    bgEnd: "#1a1a2e",
    content: {
      layout: "text",
      label: "転換点",
      heading: "AIは「答え」を出すのが\n圧倒的に速い。",
      body: "しかし、「問い」を立てること──\n何を作るべきか、誰のために作るべきか、\nその方角を定めるのは、\n現実に触れて何かを感じた人間の仕事だ。\n\nその力を育てうるのが、美術教育ではないか。",
      bodyClassName: "slide__body--accent",
    },
  },
  {
    id: "slide-08",
    className: "slide slide--has-image",
    bgStart: "#1a1a2e",
    bgEnd: "#0f3460",
    observeAsActive: true,
    content: {
      layout: "image-text",
      label: "理由① ── 感じる力",
      heading: "「俺らにはIT無理だから。」",
      headingClassName: "slide__heading--quote",
      body: "レポサク開発の最初の壁。\n農家さんに拒絶された。\n怒ってスマホを机に叩きつけた人もいた。\n\nデータには表れない、アンケートにも書かれない。\nしかし確かにそこにある感情。",
      imageSrc: "/images/farm-smartphone.png",
      imageAlt: "農業の現場と手袋越しのスマホ操作",
    },
  },
  {
    id: "slide-09",
    className: "slide",
    bgStart: "#0f3460",
    bgEnd: "#2a4a48",
    content: {
      layout: "text",
      label: "現場",
      heading: "畑を借りて、\n2年間通った。",
      body: "日光でスマホの画面が見えない。\n泥だらけの手袋では操作できない。\n自分で育てた作物は、ほとんど枯れた。\n\nシニアスマホ教室にも通い始めた。\n「マップアプリが何度聞いてもわからない。」\n言葉にならない切なさと、プライド。\n\n「わからない」と言えない空気の中で、\nその人たちの感情を、感じ取ろうとした。",
    },
  },
  {
    id: "slide-10",
    className: "slide",
    bgStart: "#2a4a48",
    bgEnd: "#3a4038",
    content: {
      layout: "text",
      label: "問いの転換",
      heading: "「使いやすいアプリ」ではなく、\n「誇りを持って使える体験」へ。",
      body: "操作そのものを無くす設計。\nIT用語を隠す。\n畑の上に余計なものを被せない。\n\n「感じる」ことが、設計の方角を変えた。",
    },
  },
  {
    id: "slide-11",
    className: "slide",
    bgStart: "#3a4038",
    bgEnd: "#4a3728",
    content: {
      layout: "text",
      label: "成果",
      heading: "「これ知ってる？\nかっこいいだろ。」",
      headingClassName: "slide__heading--quote",
      body: "農家さんが、自分から周りに勧めてくれた。\n口コミだけで全国200社以上に広がった。\n\n営業トークではなく、誇り。\n「感じる力」がビジネスの成果になった瞬間だった。",
    },
  },
  {
    id: "slide-12",
    className: "slide",
    bgStart: "#4a3728",
    bgEnd: "#5c3d2e",
    content: {
      layout: "text",
      label: "美術教育との接続",
      heading: "このプロセスを\n最初に体験したのは、\n対話による鑑賞の授業だった。",
      body: "否定しない場で、他者の見方に触れる。\n自分の見え方が変わる。問いが生まれる。\n\nあの授業で身につけた「感じる力」が、\nグッドデザイン賞金賞につながっている。",
    },
  },
  {
    id: "slide-node-anim",
    className: "slide slide--light slide--luminous",
    bgStart: "#faf8f5",
    bgEnd: "#ffffff",
    content: {
      layout: "node-animation",
    },
    observeAsActive: true,
  },
  {
    id: "slide-13",
    className: "slide",
    bgStart: "#5c3d2e",
    bgEnd: "#4a3530",
    content: {
      layout: "text",
      label: "まとめ①",
      heading: "感じる力 →\n問いを立てる力 →\n価値を生む力。",
      headingClassName: "slide__heading--warm",
      body: "美術の授業が育てている「感じる力」は、\n社会で「問いを立てる力」になり、\nやがて「価値を生む力」へと変わる。",
    }
  },
  {
    id: "slide-14",
    className: "slide slide--has-image",
    bgStart: "#4a3530",
    bgEnd: "#5c3d2e",
    observeAsActive: true,
    content: {
      layout: "image-text",
      label: "理由② ── プロトタイプ型",
      heading: "正解がわからないまま、\n小さく試す。\n小さく外す。",
      body: "設計図型：正解を決めてから動く。\nプロトタイプ型：小さく試す。外す。感じて方角を修正する。\n\n到達点は最初から決まっていない。\n動きながら見つけていく。",
      imageSrc: "/images/blueprint-vs-prototype.png",
      imageAlt: "設計図型 vs プロトタイプ型",
    },
  },
  {
    id: "slide-15",
    className: "slide slide--has-image",
    bgStart: "#5c3d2e",
    bgEnd: "#8b3a3a",
    observeAsActive: true,
    content: {
      layout: "image-text",
      label: "原体験",
      heading: "手を動かしながら、\n座りながら、感じながら、\n形を探っていった。",
      body: "美術大学での椅子制作。\nスケッチを何十枚も描き、実寸モデルを作って座る。\n「なんか違う」を何度も繰り返す。\n設計図通りに作ったのではない。",
      imageSrc: "/images/chair-process.png",
      imageAlt: "椅子制作のプロセス",
    },
  },
  {
    id: "slide-16",
    className: "slide",
    bgStart: "#8b3a3a",
    bgEnd: "#6b4423",
    content: {
      layout: "text",
      label: "ある友人の話",
      heading: "選択肢が多すぎるのではなく、\n「これがいい」と\n感じる力が弱っている。",
      body: "優秀な公務員の友人が、転職できずにいる。\n情報は十分すぎるほどある。条件も整っている。\n\nでも、「これだ」と感じて飛び込む力が、\nどこかで鈍っていた。",
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
