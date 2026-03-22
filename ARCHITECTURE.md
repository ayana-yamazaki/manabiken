# Project Architecture Summary

## Stack
- **Framework:** Astro
- **UI Library:** React
- **Language:** TypeScript

## Key Files & Directories
- `src/components/`: 全てのReactコンポーネント。
- `src/data/slides.ts`: スライドの内容（テキスト、画像パス等）を保持するSingle Source of Truth。
- `src/pages/index.astro`: メインのエントリーポイント。

## Implementation Note
- スライドの追加や変更は、コンポーネントを触る前に `src/data/slides.ts` の型とデータを更新するフローを推奨。
- 原則として `src/components/` と `src/data/slides.ts` を優先して編集し、必要な場合のみ `src/types/`・`src/pages/`・スタイル層を最小範囲で修正する。
- 共通型の正本は `src/types/` または `src/data/` に集約し、コンポーネント内で重複定義しない。